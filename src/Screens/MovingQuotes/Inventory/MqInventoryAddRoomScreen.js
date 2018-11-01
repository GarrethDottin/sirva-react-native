import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { hideBell, showBell } from '../../../Redux/Modules/Concierge';
import { ScrollView, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { Layout, Images, Colors, Variables, Forms, blueHeaderNavigationOptions } from '../../../Theme';
import { Button, ScreenWrapper } from '../../../Components';
import { asyncAddRoom } from '../../../Redux/Modules/Inventory'
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import sectionStyles from './Styles/SectionStyles'
import styles from './Styles/MqInventoryAddRoomScreenStyles'
import { back, navigate } from '../../../Redux/Modules/Routing';
import { ScreenHOC } from '../../Screen';

class MqInventoryAddRoomScreen extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        let roomTypeId = Object.keys(this.props.itemsMatrix)[0]
        this.state = {
            selectedRoomIndex: 0,
            roomTypeId: roomTypeId,
            roomName: '',
            hasError: false
        };
    }

    componentWillMount() {
        this.props.hideConcierge();
    }

    componentWillUnmount() {
        this.props.showConcierge();
    }

    addRoom = () => {
        if (this.state.roomName.trim().length == 0) {
            this.setState({
                hasError: true
            })
            this.refs._form.scrollTo({x: 0, y: 0, animated: true})
            return;
        }
        this.props.addRoom(this.state.roomTypeId, this.state.roomName)
        this.props.goBack()
        this.props.showConcierge()
    }

    gotoBack = () => {
        this.props.goBack()
    }

    gotoScreen = (screen, params) => {
        this.props.gotoScreen(screen, params)
    }

    render() {
        const itemsMatrix = this.props.itemsMatrix
        let firstRoomTypeId = '';

        let roomTypes = Object.keys(itemsMatrix).reduce((filtered, roomKey) => {
            if (roomKey !== 'search') {
                const room = itemsMatrix[roomKey]
                const roomType = {
                    label: room.name,
                    value: roomKey
                }
                filtered.push(roomType)
            }
            return filtered
        }, [])

        return (
            <ScreenWrapper
                backgroundImage={images.texture05}
                watermark={images.movingWatermark}>
              <KeyboardAvoidingView behavior="padding" enabled>

                <ScrollView
                    ref='_form'
                    style={[Layout.innerContainerNarrowed,sectionStyles.blueScreen]}
                    contentContainerStyle={styles.radioList}
                >
                    <TextInput
                        style={[
                            //Forms.textBox,
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
                    <H4 style={[sectionStyles.h4, styles.h4]}>{this.__('roomtype')}</H4>

                    <RadioForm style={{alignItems: 'flex-start'}} animation={true}>
                        {roomTypes.map((obj, i) => {
                            return(
                                <RadioButton style={sectionStyles.radioItemStyle} labelHorizontal={true} key={i}>

                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={this.state.selectedRoomIndex === i}
                                        onPress={(value, index) => {
                                            this.setState({
                                                roomTypeId: value,
                                                selectedRoomIndex: index
                                            })
                                        }}
                                        borderWidth={2}
                                        buttonInnerColor={this.state.selectedRoomIndex === i ? Colors.white : 'transparent'}
                                        buttonOuterColor={this.state.selectedRoomIndex === i ? Colors.darkBlue : Colors.white}
                                        buttonSize={8}
                                        buttonOuterSize={22}
                                        buttonStyle={{
                                            marginRight: 10,
                                            backgroundColor: this.state.selectedRoomIndex === i ? Colors.darkBlue : 'transparent'
                                        }}
                                        buttonWrapStyle={{marginLeft: 10}}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        onPress={(value, index) => {
                                            this.setState({
                                                roomTypeId: value,
                                                selectedRoomIndex: index
                                            })
                                        }}
                                        labelStyle={sectionStyles.radioLabel}
                                    />
                                </RadioButton>
                            )
                        })}

                    </RadioForm>

                    <Button
                        label={this.__('button')}
                        type='secondary'
                        style={[sectionStyles.whiteButton]}
                        onPress={() => this.addRoom()} />

                </ScrollView>
              </KeyboardAvoidingView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    const { inventory } = state

    return {
        data: inventory.data,
        itemsMatrix: inventory.itemsMatrix,
        screenLanguage: getLanguageDataSelector(state, 'MqInventoryAddRoomScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen, params) => {
            dispatch(navigate({ routeName: screen, params: params }));
        },
        goBack:() => {
            dispatch(back())
        },
        addRoom: (roomTypeId, roomName) => {
            dispatch(asyncAddRoom(roomTypeId, roomName));
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
)(ScreenHOC(MqInventoryAddRoomScreen))
