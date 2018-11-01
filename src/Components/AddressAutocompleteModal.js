import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'
import { AppModalFullScreen, FloatingLabelTextField, H2, AddressTypeahead } from './'
import { closeModal } from '../Redux/Modules/Modal'
import styles from './Styles/AddressAutocompleteModalStyles'
import S from '../StyleUtils';
import { Colors } from '../Theme';

class AddressAutocompleteModal extends Component {

    static propTypes = {
        modalKey: PropTypes.string.isRequired,
        addressObj: PropTypes.object,
        onSubmit: PropTypes.func,
    }    

    static defaultProps = {
        onSubmit: (addressArray) => {},
    }

    addressArray = []
    state = {
        address: {
            street1: '',
            street2: '',
            city: '',
            state: '',
            zipCode: '',
        },
        errors: {
            street1: false,
            street2: false,
            city: false,
            state: false,
            zipCode: false
        },
        hasError: false
    }

    componentDidMount() {
        const addr = this.props.addressObj
        if (addr) {
            this.setState({
                address: {
                    street1: (addr.street1) ? addr.street1 : '',
                    street2: (addr.street2) ? addr.street2 : '',
                    city: (addr.city) ? addr.city : '',
                    state: (addr.state) ? addr.state : '',
                    zipCode: (addr.zipCode) ? addr.zipCode : '',
                }
            });
        }
    }

    validateAddress(cb) {
        var newErrors = ['street1', 'city', 'state', 'zipCode'].reduce((accum, field)=> {
            return {
                ...accum,
                [field]: (!this.state.address[field] || !this.state.address[field].length)
            };
        }, {})
        this.setState({
            errors: {
                ...this.state.errors,
                ...newErrors
            }
        }, ()=> { cb() })
    }

    hasError() {
        return Object.keys(this.state.errors).reduce((accum, field)=> {
            return accum || this.state.errors[field];
        }, false);
    }

    onSubmit = () => {
        this.validateAddress(()=> {
            if (this.hasError()) {
                return;
            }
            this.props.onSubmit(this.state.address);
            this.props.closeModal();
        });
    }

    onSelectAddress(address) {
        this.setState({
            address: address
        });
    }

    updateAddress(field, value) {
        this.setState({
            address:{
                ...this.state.address,
                [field]: value
            }
        })
    }

    render = () => {
        return (
            <AppModalFullScreen modalKey={this.props.modalKey} type="blue" wrapperStyle={styles.wrapper}>
                <View style={{ flex: 1, alignItems:'flex-start' }}>
                    
                    <H2 style={[S.white, S.mbXl]}>Please enter your address</H2>

                    <AddressTypeahead 
                        placeholder='Address Line 1'
                        placeholderColor={ Colors.offwhite }
                        onSelect={ (address) => {
                            this.onSelectAddress(address)
                        } }
                        defaultValue={ this.state.address.street1 }
                    />

                    <FloatingLabelTextField
                        placeholder="Apartment/Suite Number"
                        placeholderColor={ Colors.offwhite }
                        inputStyle={ [S.white] }
                        hasError={this.state.errors.street2}
                        hasBlueBackground={true}
                        value={this.state.address.street2}
                        onChangeText={(value) => { this.updateAddress('street2', value) }}
                    />

                    <View style={ { width: '100%', flexDirection: 'row' } }>
                        <FloatingLabelTextField
                            placeholder="City"
                            placeholderColor={ Colors.offwhite }
                            inputStyle={ [S.white] }
                            style={ { width: '70%', marginRight: '5%' } }
                            hasError={this.state.errors.city}
                            hasBlueBackground={true}
                            value={this.state.address.city}
                            onChangeText={(value) => { this.updateAddress('city', value) }}
                        />

                        <FloatingLabelTextField
                            placeholder="State"
                            placeholderColor={ Colors.offwhite }
                            inputStyle={ [S.white] }
                            style={ { width: '25%' } }
                            hasError={this.state.errors.state}
                            hasBlueBackground={true}
                            value={this.state.address.state}
                            onChangeText={(value) => { this.updateAddress('state', value) }}
                        />
                    </View>

                    <FloatingLabelTextField
                        placeholder="Zip"
                        placeholderColor={ Colors.offwhite }
                        inputStyle={ [S.white] }
                        hasError={this.state.errors.zipCode}
                        hasBlueBackground={true}
                        value={this.state.address.zipCode}
                        onChangeText={(value) => { this.updateAddress('zipCode', value) }}
                    />

                    <View style={ [S.mbXxl] }></View>

                    <Button
                        label="Save"
                        style={ [styles.button, S.mtXl] }
                        type={"secondary"}
                        onPress={() => this.onSubmit()} />
                </View>
            </AppModalFullScreen>
        )
    }
}

const mapStateToProps = (state) => ({ })

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => {
            dispatch(closeModal())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddressAutocompleteModal)