import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, FlatList, Text, StyleSheet } from 'react-native'
import { ListItemCard, Button, ScreenWrapper, Faqs } from '../../../Components';
import { Layout, Images } from '../../../Theme';
import { asyncPersistInventoryData, asyncFetchInventoryData, setActiveRoom } from '../../../Redux/Modules/Inventory'
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import styles from './Styles/MqInventoryScreenStyles'
import { navigate } from '../../../Redux/Modules/Routing';
import { ScreenHOC } from '../../Screen';
import S from '../../../StyleUtils';

class MqInventoryScreen extends Component {

    /*static propTypes = {
        inventoryData: PropTypes.object,
        refreshData: PropTypes.func
    }*/

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.inventoryData == null) {
            this.props.refreshData()
        }
    }

    componentWillUnmount = () => {
        this.props.persistInventoryData()
    }

    gotoInventoryRoomScreen = (id) => {
        const params = { roomId: id }

        this.props.activeRoomId = id
        this.props.setActiveRoom(id)

        this.gotoScreen('MqInventoryRoom', params)
    }

    gotoScreen = (screen, params) => {
        this.props.gotoScreen(screen, params)
    }

    render() {
        let rooms = []
        let hasInventoryData = false
        let question1 = this.__('question1')

        const faq = [1, 2, 3, 4].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        if (this.props.inventoryData !== null) {
            hasInventoryData = true

            if (Object.keys(this.props.inventoryData.rooms).length) {
                const roomData = this.props.inventoryData.rooms

                for (var key in roomData) {
                    let room = roomData[key];
                    room.id = key

                    const itemData = room.items
                    let itemCount = Object.keys(itemData).reduce(function (itemSum, key) {
                        return itemSum + itemData[key];
                    }, 0);

                    room.countLabel = itemCount === 1 ?
                        this.__('itemcountsingular', itemCount) :
                        this.__('itemcount', String(itemCount))

                    rooms.push(room)
                }
            }
        }
        const cardCount = rooms.length + 1

        return (
            <ScreenWrapper
                backgroundImage={images.texture05}
                watermark={images.movingWatermark}>

                <ScrollView style={{ minHeight: "100%"}}>
                    <View style={[Layout.outerContainerAlt, S.mb6]}>
                        <H2 style={styles.screenHeader}>{this.__('title')}</H2>

                        <ScrollView contentContainerStyle={styles.roomList}>

                            <FlatList
                                data={rooms}
                                keyExtractor={item => item.id}
                                renderItem={({item, index}) => {
                                    return (
                                        <ListItemCard
                                            cardStyles={[
                                                styles.cardStyles,
                                                index === 0 ? styles.firstCard : {}
                                            ]}
                                            key={item.id}
                                            onPress={() => this.gotoInventoryRoomScreen(item.id)}>

                                            <View style={styles.cardContents}>
                                                <P style={styles.roomName}>{ item.name } </P>
                                                <P style={styles.itemCount}>{item.countLabel}</P>
                                            </View>
                                        </ListItemCard>
                                    )
                                }}
                            />
                            <ListItemCard
                                cardStyles={[ styles.lastCard, styles.cardStyles, cardCount === 1 ? styles.onlyCard : {}]}
                                actionImage={Images.iconAdd}
                                actionImageStyles={{ width: 43, height: 44, marginRight: -10}}
                                key='AddARoom'
                                onPress={() => this.gotoScreen('MqInventoryAddRoom')}>

                                <View style={styles.cardContents}>
                                    <P style={styles.roomName}>{this.__('addroom')}</P>
                                </View>
                            </ListItemCard>
                        </ScrollView>
                    </View>
                    <Faqs data={faq}/>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    const { inventory }  = state

    return {
        inventoryData: inventory.data,
        screenLanguage: getLanguageDataSelector(state, 'MqInventoryScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen, params) => {
            dispatch(navigate({ routeName: screen, params: params }));
        },
        refreshData: () => {
            dispatch(asyncFetchInventoryData());
        },
        setActiveRoom: (id) => {
            dispatch(setActiveRoom(id));
        },
        persistInventoryData: () => {
            dispatch(asyncPersistInventoryData())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(MqInventoryScreen))
