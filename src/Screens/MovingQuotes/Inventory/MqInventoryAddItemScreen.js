import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Alert, ScrollView, View, SectionList, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native'
import { ScreenWrapper, Button, P } from '../../../Components';
import { Forms, Colors, Layout, Images, blueHeaderNavigationOptions } from '../../../Theme'
import { asyncAddItemToRoom } from '../../../Redux/Modules/Inventory'
import { handleErrorNonModal, handleSuccessNonModal, dismissMessage } from '../../../Redux/Modules/SystemMessaging'
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import sectionStyles from './Styles/SectionStyles'
import styles from './Styles/MqInventoryAddItemScreenStyles'
import { navigate, back } from '../../../Redux/Modules/Routing';
import { ScreenHOC } from '../../Screen';

class MqInventoryAddItemScreen extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        //@TODO - Move these from nav params to the inventory state
        const roomId = this.props.navigation.state.params.roomId
        const roomName = this.props.navigation.state.params.roomName
        const roomTypeId = this.props.data.rooms[roomId].room_type_id

        this.state = {
            searchText: '',
            searchResults: [],
            roomId: roomId,
            roomTypeId: roomTypeId,
            roomName: roomName,
            errorMessageDisplayed: false
        };

        this.inputs = {}
    }

    componentDidMount() {
        this.inputs['_searchForm'].focus();
    }
    componentWillUnmount() {
        this.props.dismissMessage()
    }
    addItem = (itemIdentifier, itemName) => {
        this.props.addItem(this.state.roomId, itemIdentifier)
        this.setState({
            searchText: '',
            searchResults: [],
        })

        const msg = this.__('itemaddedmessage', [itemName, this.state.roomName])
        this.props.displaySuccess(msg)
        this.refs._form.scrollTo({animated: false}, 0)
        //this.inputs['_searchForm'].focus();
    }

    gotoRoomScreen = (screen) => {
        const params = { roomId: this.state.roomId }
        this.props.goBack()
    }

    gotoScreen = (screen, params) => {
        this.props.gotoScreen(screen, params)
    }

    remapSearchResults(roomTypeId, categoryId, items) {
        let remappedItems = Object.keys(items).map(function (key, index) {
            let rItem = items[key]
            rItem.key = `${roomTypeId}_${categoryId}_${key}`

            return rItem
        })

        return remappedItems
    }

    searchItemMatrix = (term) => {
        this.setState({
            searchText: term
        })
        term = term.toLowerCase()

        const itemsMatrix = this.props.itemsMatrix
        let searchResults = []
        let roomTypeId = 'search'
        //for (let roomTypeId in itemsMatrix) { //Re-enable to search all rooms
        const room = itemsMatrix[roomTypeId]

        for (let categoryId in room.categories) {
            const category = room.categories[categoryId]
            const categoryName = category.name
            let foundItemsInCat = []

            if (categoryName.toLowerCase().indexOf(term) > -1) {
                foundItemsInCat = this.remapSearchResults(roomTypeId, categoryId, category.itemList)
            } else {
                let foundItems = {}

                for (let itemKey in category.itemList) {
                    const item = category.itemList[itemKey]
                    const itemName = item.name

                    if (itemName.toLowerCase().indexOf(term) > -1) {
                        foundItems[itemKey] = item
                    }
                }

                if (Object.keys(foundItems).length) {
                    foundItemsInCat = this.remapSearchResults(roomTypeId, categoryId, foundItems)
                }
            }

            if (foundItemsInCat.length) {
                const resultSection = {
                    title: categoryName,
                    data: foundItemsInCat
                }
                searchResults.push(resultSection)
            }
        }
        //}

        this.setState({
            searchResults: searchResults
        });

        if (!this.state.errorMessageDisplayed && searchResults.length == 0) {
            const msg = this.__('notfoundmessage')
            this.props.displayError(msg)

            this.setState({
                errorMessageDisplayed: true
            });
        } else if (searchResults.length) {
            this.props.dismissMessage()
            this.setState({
                errorMessageDisplayed: false
            });
        }
    }


    render() {
        const SectionHeader = ({ title }) => {
            return (
                <View style={styles.searchResultSection}>
                    <H4 style={styles.searchResultHeading}>{title.toUpperCase()}</H4>
                </View>
            )
        }
        const ListItem = ({ item }) => {
            return (
                <View style={styles.searchResultItem}>
                    <TouchableHighlight onPress={() => this.addItem(item.key, item.name)}>
                        <P style={styles.itemName}>{item.name}</P>
                    </TouchableHighlight>
                </View>
            )
        }

        const SectionSeparator = ({ item }) => {
            return (
                <View style={styles.searchResultSeparator} />
            )
        }

        const rooms = this.props.data.rooms
        const itemsMatrix = this.props.itemsMatrix
        const { params } = this.props.navigation.state;

        return (
            <ScreenWrapper
                backgroundImage={images.texture05}>

                <ScrollView
                    ref='_form'
                    style={[Layout.bottomSpacer, sectionStyles.blueScreen, styles.screen]}
                >
                    <View style={[Layout.innerContainerNarrowed, styles.searchForm]}>
                        <TextInput
                            style={[
                                sectionStyles.textBox,
                                styles.textBox,
                                this.state.errorMessageDisplayed ? sectionStyles.inputError : {}
                            ]}
                            onChangeText={(text) => this.searchItemMatrix(text)}
                            value={this.state.searchText}
                            underlineColorAndroid='transparent'
                            placeholder={this.__('placeholder')}
                            placeholderTextColor='rgba(255,255,255,0.5)'
                            ref={ input => {
                                this.inputs['_searchForm'] = input;
                            }}
                        />
                    </View>

                    <SectionList
                        style={[Layout.innerContainerNarrowed, styles.searchResults]}
                        renderItem={({ item }) => <ListItem item={item} />}
                        renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
                        sections={this.state.searchResults}
                        SectionSeparatorComponent={({ leadingItem }) => leadingItem ? <SectionSeparator /> : null}
                    />
                    {(this.state.searchResults == 0 && this.state.errorMessageDisplayed) &&
                        <P style={[Layout.innerContainerNarrowed, { color: Colors.lightGray }]}>{this.__('notfoundmessagewhitespace')}</P>
                    }
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    const { inventory } = state
    return {
        data: inventory.data,
        itemsMatrix: inventory.itemsMatrix,
        screenLanguage: getLanguageDataSelector(state, 'MqInventoryAddItemScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen, params) => {
            dispatch(navigate({ routeName: screen, params: params }));
        },
        goBack:() => {
            dispatch(back());
        },
        addItem: (roomId, itemIdentifier) => {
            dispatch(asyncAddItemToRoom(roomId, itemIdentifier));
        },
        displayError: (msg) => {
            dispatch(handleErrorNonModal(msg))
        },
        displaySuccess: (msg) => {
            dispatch(handleSuccessNonModal(msg))
        },
        dismissMessage: () => {
            dispatch(dismissMessage())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(MqInventoryAddItemScreen))
