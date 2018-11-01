import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Layout, Images, Colors, blueHeaderNavigationOptions } from '../../../Theme';
import { ScreenWrapper, Button, NumberField, H2, H4 } from '../../../Components';
import { asyncAdjustItemCount } from '../../../Redux/Modules/Inventory'
import { dismissMessage } from '../../../Redux/Modules/SystemMessaging'
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import { hideBell, showBell } from '../../../Redux/Modules/Concierge'
import sectionStyles from './Styles/SectionStyles'
import styles from './Styles/MqInventoryRoomScreenStyles'

import S from '../../../StyleUtils';
import { navigate } from '../../../Redux/Modules/Routing';
import { ScreenHOC } from '../../Screen';

class MqInventoryRoomScreen extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        this.state = {
            roomId: '',
            roomName: ''
        }
    }

    componentWillMount() {
        this.props.hideConcierge();
    }

    componentWillUnmount(){
        this.props.showConcierge();
    }

    componentDidMount = () => {
        this.props.dismissMessage()
    }

    setItemCount = (itemId, count) => {
        this.props.adjustItemCount(this.state.roomId, itemId, count)
    }

    gotoAddItemScreen = (screen) => {
        const params = {
            roomId: this.state.roomId,
            roomName: this.state.roomName
        }
        this.gotoScreen(screen, params)
    }

    gotoScreen = (screen, params) => {
        this.props.gotoScreen(screen, params)
    }

    render() {
        this.state.roomId = this.props.navigation.state.params.roomId

        const rooms = this.props.data.rooms
        const itemsMatrix = this.props.itemsMatrix
        const { params } = this.props.navigation.state;

        const roomData = rooms[this.state.roomId]
        const hasRoomData = typeof roomData != 'undefined'

        let roomItems = []
        let roomTypeName = ''
        if (hasRoomData) {
            this.state.roomName = rooms[this.state.roomId].name

            roomTypeName = itemsMatrix[roomData.room_type_id].name
            const items = roomData.items
            const roomTypeId = roomData.room_type_id

            for (var key in items) {
                const count = items[key]
                const matrixKeys = key.split("_");

                const itemRoomId = matrixKeys[0],
                    itemCategoryId = matrixKeys[1],
                    itemTypeId = matrixKeys[2]

                let listItem = {}
                listItem.id = key
                listItem.count = count

                room = itemsMatrix[itemRoomId]
                category = room ? room.categories[itemCategoryId] : null
                item = category ? category.itemList[itemTypeId] : null
                if (item) {
                    listItem.name = item.name
                    roomItems.push(listItem)
                }
            }
        }

        return (
            hasRoomData ?
            <ScreenWrapper
                containerStyles={ { minHeight: '100%' } }
                backgroundImage={images.texture05}
                watermark={images.movingWatermark}>

                <ScrollView
                    ref='_form'
                    style={[sectionStyles.blueScreen]}
                    contentContainerStyle={styles.radioList}>
                    <View style={[Layout.innerContainerNarrowed, styles.roomInfo]}>
                        <View style={styles.nameWrapper}>
                            <H2 style={styles.h2}>{roomData.name}</H2>
                            <TouchableOpacity activeOpacity={0.5} style={styles.editAction} onPress={() => this.gotoScreen('MqInventoryEditRoom')}>
                                <H4 style={sectionStyles.h4}>{this.__('edit')}</H4>
                                <Image source={Images.iconEdit} style={styles.editIcon} />
                            </TouchableOpacity>
                        </View>
                        <H4 style={sectionStyles.roomTypeLabel}>{this.__('roomtype')}: {roomTypeName.toUpperCase()}</H4>
                    </View>
                    <View style={ [ { paddingBottom: 35 }, S.flex1, Layout.innerContainerNarrowed] }>
                        <FlatList
                            contentContainerStyle={{ alignItems: 'stretch' }}
                            data={roomItems}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => {
                                return (
                                    <View>

                                        <NumberField
                                            text={item.name}
                                            initialValue={item.count}
                                            minValue={0}
                                            onChange={(count) => this.setItemCount(item.id, count)}
                                            styles={{
                                                labelText: styles.nfLabelText,
                                                inputText: styles.nfInputText,
                                                button: styles.nfButton,
                                                innerWrapper: styles.nfInnerWrapper
                                            }}
                                            containerStyle={styles.nfContainer}

                                        />
                                    </View>
                                )
                            }}
                        />
                        <Button
                            label={this.__('button')}
                            type='secondary'
                            style={[sectionStyles.whiteButton, styles.button, { marginBottom: 0 }]}
                            onPress={() => this.gotoAddItemScreen('MqInventoryAddItem')} />
                    </View>
                </ScrollView>
            </ScreenWrapper>
            : null
        )
    }
}

const mapStateToProps = (state) => {
    const { inventory, nav } = state

    return {
        data: inventory.data,
        itemsMatrix: inventory.itemsMatrix,
        screenLanguage: getLanguageDataSelector(state, 'MqInventoryRoomScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen, params) => {
            dispatch(navigate({ routeName: screen, params: params }));
        },
        adjustItemCount: (roomId, itemId, adjustment) => {
            dispatch(asyncAdjustItemCount(roomId, itemId, adjustment));
        },
        dismissMessage: () => {
            dispatch(dismissMessage())
        },
        hideConcierge: () => {
            dispatch(hideBell())
        },
        showConcierge: () => {
            dispatch(showBell())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(MqInventoryRoomScreen))
