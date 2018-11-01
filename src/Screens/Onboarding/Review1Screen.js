import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { asyncFetchRelocationData, getOriginAddressSelector, getCounselorSelector,
    getCompanyAddressSelector, getStartDateSelector, getCompanySelector, asyncSaveAddress, getRelocationDataSelector } from '../../Redux/Modules/Relocation'
import { Button, H3, ActionCard, AddressAutocompleteModal } from '../../Components'
import { Images, Layout, Forms } from '../../Theme'
import { openModalById } from '../../Redux/Modules/Modal'
import { __, formatPhone, isValidPhone } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { formatAddressFromObject, formatDateFromObj, getDateObjFromString, getDaysUntil } from '../../Utils/ReactHelpers'
import styles from './Styles/Review1ScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class Review1Screen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
        this.state = {
            originAddress: this.props.originAddress
        }
    }

    componentDidMount = () => {
        if (this.props.originAddress === null) {
            this.props.refreshData()
            this.setState({
                originAddress: this.props.originAddress
            })
        }
    }

    onSubmit = () => {
        this.props.saveAddress(this.state.originAddress, this.props.relocation.originAddressData.id, 'origin')
        this.props.gotoNextPage()
    }

    onChangeOriginAddress(address) {
        this.setState({
            originAddress: address
        })

    }

    render () {
        const { company, companyAddress, startDate, counselor } = this.props

        const startDateObj = getDateObjFromString(startDate)
        const diffDays = getDaysUntil(startDateObj)
        const phoneNumber = (counselor !== null && counselor.hasOwnProperty('workPhoneNumber')) ?
            formatPhone(counselor.workPhoneNumber) : "your HR department"

        return (
            <ImageBackground style={Layout.screenWrapper} source={Images.texture03}>
                <View style={[Layout.outerContainer]}>
                    <ScrollView style={{width:'100%'}}>
                        <View style={styles.introWrapper}>
                            <H3 style={styles.title}>{this.__('title')}</H3>
                            <P style={styles.copy}>
                                {this.__('subtitle', phoneNumber)}
                            </P>
                        </View>

                        <TouchableOpacity style={styles.card} onPress={() => this.props.openModal("edit-homeAddress")}>
                            <View style={[styles.body, { backgroundColor: "rgba(255,255,255,0.8)" }]}>
                                <View style={styles.header}>
                                    <Image style={styles.image} source={Images.iconHomeBlue} />
                                    <H4 style={styles.headerCopy}>{"Current Home Address".toUpperCase()}</H4>
                                </View>
                                <View style={styles.formWrapper}>
                                    <P style={styles.addressCopy}>{formatAddressFromObject(this.state.originAddress, true)}</P>
                                    <Image style={styles.editIcon} source={Images.iconEditLightGray} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        { this.props.companyAddress ?
                            <ActionCard
                                headerIcon={Images.iconWorkBlue}
                                headerCopy={this.__('workaddress')}
                                copy={formatAddressFromObject(companyAddress, true)}
                                copyStyles={styles.addressCopy}
                                backgroundColor="rgba(255,255,255,0.8)"
                            /> :
                            <ActionCard
                                headerIcon={Images.iconWorkBlue}
                                headerCopy={this.__('company')}
                                copy={company.name}
                                copyStyles={styles.addressCopy}
                                backgroundColor="rgba(255,255,255,0.8)"
                            />
                        }
                        <ActionCard
                            headerIcon={Images.iconCalendarBlue}
                            headerCopy={this.__('startdate')}
                            backgroundColor="rgba(255,255,255,0.8)"
                        >
                            <View style={styles.dateWrapper}>
                                <P style={styles.addressCopy}>{formatDateFromObj(startDateObj)}</P>
                                <P style={styles.dateDiff}>{this.__('daycount', [diffDays])}</P>
                            </View>
                        </ActionCard>
                    </ScrollView>
                    <Button label={this.__('button')} style={styles.button} onPress={this.onSubmit} />
                </View>
                <AddressAutocompleteModal
                    modalKey={"edit-homeAddress"}
                    addressObj={this.state.originAddress}
                    onSubmit={(address) => this.onChangeOriginAddress(address)} />
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        originAddress: getOriginAddressSelector(state),
        company: getCompanySelector(state),
        companyAddress: getCompanyAddressSelector(state),
        startDate: getStartDateSelector(state),
        counselor: getCounselorSelector(state),
        relocation: getRelocationDataSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'Review1Screen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoNextPage: () => {
            dispatch(navigate({ routeName: 'Review2' }));
        },
        refreshData:  () => {
            dispatch(asyncFetchRelocationData())
        },
        openModal: (key) => {
            dispatch(openModalById(key))
        },
        saveAddress: (addressData, addressId, addressType) => {
            dispatch(asyncSaveAddress(addressData, addressId, addressType))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(Review1Screen));
