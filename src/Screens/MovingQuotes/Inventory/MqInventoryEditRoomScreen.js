import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { Layout, Images, Colors, Variables, Forms, blueHeaderNavigationOptions} from '../../../Theme';
import { Button, ScreenWrapper, AppModal, BlurredModal, H4, H2, P, ScreenCloseButton } from '../../../Components';
import { asyncEditRoom, asyncSaveRoom, asyncDeleteRoom, getRoomDetailSelector } from '../../../Redux/Modules/Inventory'
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import sectionStyles from './Styles/SectionStyles'
import styles from './Styles/MqInventoryEditRoomScreenStyles'
import { navigate, back, resetNavStack } from '../../../Redux/Modules/Routing';
import { ScreenHOC } from '../../Screen';

class MqInventoryEditRoomScreen extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        this.state = {
            roomName: '',
            hasError: false,
            isDeleting: false
        };
    }

    componentDidMount = () => {
        this.setState({
            roomName: this.props.room.name
        })
    }

    saveRoom = () => {
        if (this.state.roomName.trim().length == 0) {
            this.setState({
                hasError: true
            })
            return;
        }
        this.props.saveRoom(this.state.roomName)
        this.props.goBack()
    }

    deleteRoom = () => {
        this.props.deleteRoom()
    }

    gotoBack = () => {
        this.props.goBack()
    }

    gotoScreen = (screen, params) => {
        this.props.gotoScreen(screen, params)
    }

    render() {
        const itemsMatrix = this.props.itemsMatrix
        const hasRoomData = this.props.room
        let roomTypeName = ''

        if (hasRoomData) {
            roomTypeName = itemsMatrix ? itemsMatrix[this.props.room.room_type_id].name.toUpperCase() : ''
        }

        return (
            hasRoomData ?
            <ScreenWrapper
                backgroundImage={images.texture05}
                watermark={images.movingWatermark}>

                <View style={[Layout.innerContainerNarrowed, {flex:1}, sectionStyles.blueScreen]}>
                    <TextInput
                        style={[
                            sectionStyles.textBox,
                            this.state.hasError ? sectionStyles.inputError : {}
                        ]}

                        onChangeText={(text) => {
                            let hasError = false
                            if (text.trim().length == 0) {
                                hasError: true
                            }
                            this.setState({
                                roomName: text,
                                hasError: hasError
                            })
                        }}
                        value={this.state.roomName}
                        underlineColorAndroid='transparent'
                        placeholder={this.__('placeholder')}
                        placeholderTextColor='rgba(255,255,255,0.5)'
                    />
                    {this.state.hasError &&
                        <P style={sectionStyles.error}>{this.__('errormessage')}</P>
                    }
                    <H4 style={[sectionStyles.h4, styles.h4]}>{this.__('roomtype')}: {roomTypeName}</H4>

                    <View style={styles.buttonSet}>
                        <Button
                            label={this.__('deletebutton')}
                            style={[styles.clearButton, styles.button]}
                            onPress={() => this.setState({isDeleting: true})} />

                        <Button
                            label={this.__('savebutton')}
                            type='secondary'
                            style={[sectionStyles.whiteButton, styles.button]}
                            onPress={() => this.saveRoom()} />
                   </View>
                </View>

                {this.state.isDeleting &&
                    <BlurredModal
                        visible={true}
                        onToggle={() => this.setState({ isDeleting: false })}>

                        <ScreenCloseButton style={styles.modalClose} onPress={() => this.setState({isDeleting: false})} />
                        <View style={styles.modalInner}>

                            <H2 style={styles.modalh2}>{this.__('deletemodaltitle', this.state.roomName)}</H2>
                            <P>{this.__('deletemodalcopy', hasRoomData.countLabel)}</P>

                            <Button
                                label={this.__('deletemodalbutton')}
                                type='secondary'
                                style={[styles.clearButton, styles.button, styles.modalButton]}
                                onPress={() => this.deleteRoom()} />
                        </View>
                    </BlurredModal>
                }
            </ScreenWrapper>
            : null
        )
    }
}

const mapStateToProps = (state) => {
    return {
        room: getRoomDetailSelector(state),
        itemsMatrix: state.inventory.itemsMatrix,
        screenLanguage: getLanguageDataSelector(state, 'MqInventoryEditRoomScreen'),
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
        goBackTo:(resetAction) => {
            dispatch(resetAction);
        },
        saveRoom: (roomName) => {
            dispatch(asyncSaveRoom(roomName));
        },
        deleteRoom: () => {
            dispatch(asyncDeleteRoom());
            dispatch(resetNavStack({
                index: 2,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                    NavigationActions.navigate({ routeName: 'MqLanding' }),
                    NavigationActions.navigate({ routeName: 'MqInventoryStart' }),
                ],
            }))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(MqInventoryEditRoomScreen))
