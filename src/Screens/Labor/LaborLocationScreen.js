import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import RadioForm, { RadioButton, RadioButtonLabel } from 'react-native-simple-radio-button'
import { asyncFetchRelocationData, getOriginAddressSelector, getDestinationAddressSelector } from '../../Redux/Modules/Relocation'
import { getAddress, setAddress } from '../../Redux/Modules/Labor'
import { openModalById } from '../../Redux/Modules/Modal'
import { handleError } from '../../Redux/Modules/SystemMessaging'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { ScreenWrapper, H2, P, Button, AppRadioInput, AddressAutocompleteModal } from '../../Components'
import { formatAddressFromObject } from '../../Utils/ReactHelpers'
import { Images, Layout, Colors } from '../../Theme'
import styles from './Styles/LaborLocationScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';
import { showBell, hideBell } from '../../Redux/Modules/Concierge'

class LaborLocationScreen extends Component {

    selectedAddress = null
    state = {
        selectedValue: 'current',
        otherAddress: null
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        this.addressTypes = [
            { label: this.__('currenthome'), value: 'current' },
            { label: this.__('newhome'), value: 'new' },
            { label: this.__('other'), value: 'other' },
        ]
    }

    componentDidMount = () => {

        if (this.props.laborAddress !== null) {
            selectedAddress = this.props.laborAddress
        } else if (this.props.originAddress === null) {
            this.props.refreshRelocationData()
        }

        this.props.hideConciergeBell();
    }

    componentWillUnmount() {
      this.props.showConciergeBell();
    }

    onRadioPress(value, index ) {
        this.setState({
            selectedValue: value
        })
    }

    onChangeCustomAddress(address) {
        this.setState({
            otherAddress: address,
            selectedValue: 'other'
        })
    }

    onNextPress() {
        if (this.state.selectedValue === 'current') {
            this.props.setAddress(this.props.originAddress, 'current')
            this.props.gotoScreen('LaborDateTime')
        } else if (this.state.selectedValue === 'new') {
            this.props.setAddress(this.props.destinationAddress, 'new')
            this.props.gotoScreen('LaborDateTime')
        } else if (this.state.selectedValue === 'other' && this.state.otherAddress) {
            this.props.setAddress(this.state.otherAddress, 'other');
            this.props.gotoScreen('LaborDateTime');
        } else {
            handleError("Please select an address.")
        }
    }

    render() {
        return (
            <ScreenWrapper backgroundStyles={{flex:1 }} backgroundImage={Images.texture05} watermark={Images.movingWatermark}>
                <ScrollView style={ { backgroundColor: Colors.lightBlueWithOpacity } }  contentContainerStyle={[Layout.bottomSpacer]}>
                    <View style={styles.wrapper}>
                        <H2 style={styles.title}>{this.__('title')}</H2>

                        <RadioForm style={styles.radioForm} animation={true}>
                            {this.addressTypes.map((obj, i) => {
                                const isSelected = this.state.selectedValue == obj.value

                                let addressString = this.__('newaddressplaceholder')
                                let hasAddress = false
                                let addressobj = null
                                if (obj.value === 'current' && this.props.originAddress !== null) {
                                    addressObj = this.props.originAddress
                                    addressString = formatAddressFromObject(this.props.originAddress, true)
                                    hasAddress = true
                                } else if (obj.value === 'new' && this.props.destinationAddress !== null) {
                                    addressObj = this.props.destinationAddress
                                    addressString = formatAddressFromObject(this.props.destinationAddress, true)
                                    hasAddress = true
                                } else if (obj.value === 'other' && this.state.otherAddress !== null) {
                                    addressObj = this.state.otherAddress
                                    addressString = formatAddressFromObject(addressObj, true)
                                    hasAddress = true
                                }

                                return (
                                    <RadioButton style={styles.radioButton} labelHorizontal={true} key={i}>
                                        <AppRadioInput key={i}
                                            dataObj={obj}
                                            isSelected={isSelected}
                                            onPress={(value, index) => this.onRadioPress(value, index)}
                                            index={i} />

                                        <View style={styles.radioLabelWrapper}>
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                onPress={(value, index) => this.onRadioPress(value, index)}
                                                labelWrapStyle={{width:'100%'}}
                                                labelStyle={[styles.radioLabel, (isSelected ? styles.radioLabelSelected : {})]} />

                                            <TouchableOpacity onPress={() => this.props.openModal("edit-" + obj.value)}>
                                                <P style={[styles.radioAddress, (hasAddress ? styles.radioAddressFilled : {})]}>
                                                    {addressString}
                                                </P>
                                                <Image source={Images.iconLocationSmallWhite} style={styles.radioAddressImage} />
                                            </TouchableOpacity>
                                        </View>
                                        <AddressAutocompleteModal
                                            modalKey={"edit-" + obj.value}
                                            addressObj={hasAddress ? addressObj : null }
                                            onSubmit={(address) => this.onChangeCustomAddress(address)} />
                                    </RadioButton>
                                )
                            })}
                        </RadioForm>
                        <Button label={this.__('button')} type="secondary" style={styles.button} onPress={() => this.onNextPress()} />
                    </View>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        originAddress: getOriginAddressSelector(state),
        destinationAddress: getDestinationAddressSelector(state),
        laborAddress: getAddress(state),
        screenLanguage: getLanguageDataSelector(state, 'LaborLocationScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        refreshRelocationData:  () => {
            dispatch(asyncFetchRelocationData())
        },
        openModal: (key) => {
            dispatch(openModalById(key))
        },
        setAddress: (addressObj, addressType) => {
            dispatch(setAddress(addressObj, addressType))
        },
        showConciergeBell: () => {
          dispatch(showBell())
        },
        hideConciergeBell: () => {
          dispatch(hideBell())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LaborLocationScreen));
