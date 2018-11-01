import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import dateFormat from 'dateformat'
import { convertGooglePlacesAddress } from '../../Utils/ReactHelpers'
import { asyncFetchRelocationData, asyncSaveAddress, getOriginAddressSelector, getCompanySelector,
    getDestinationAddressSelector, getTransfereeSelector, getCounselorSelector, getCompanyAddressSelector } from '../../Redux/Modules/Relocation'
import { asyncFetchInventoryData, getRoomCountSelector, getItemCountSelector } from '../../Redux/Modules/Inventory'
import { openModalById } from '../../Redux/Modules/Modal'
import { ScreenWrapper, H1, H3, H4, P, OriginDestMarker, AddressAutocompleteModal } from '../../Components'
import { Images, Layout, Colors } from '../../Theme'
import { __, formatPhone, isValidPhone } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/ProfileScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

    }
    state = {
        origin: this.props.originAddress,
        destination:this.props.destinationAddress
    }
    componentDidMount = () => {
        if (this.props.inventoryData === null){
            this.props.refreshInventoryData()
        }
        console.log(this.state)
    }

    gotoScreen = (screen, params) => {
        this.props.gotoScreen(screen, params)
    }

    onChangeOrigin = (address) => {
        this.props.saveAddress(address, this.props.relocationData.originAddressData.id, 'origin')
        this.setState({
            origin: address
        })
    }

    onChangeDestination = (address) => {
        if (this.props.relocationData.destinationAddressData == null) {
          this.props.saveAddress(address, false, 'destination')
        } else {
          this.props.saveAddress(address, this.props.relocationData.destinationAddressData.id, 'destination')
        }

        this.setState({
            destination: address
        })
    }

    render = () => {
        //if (this.props.relocationData !== null && this.props.inventoryData !== null) {
        const relocationData = this.props.relocationData
        const transferee = this.props.transferee
        const company = this.props.company
        const companyAddress = this.props.companyAddress
        const origin = this.props.originAddress
        const destination = this.props.destinationAddress
        const destAddressToUse = destination ? destination : companyAddress

        let originStreeFormatted = origin.street1
        originStreeFormatted += origin.street2 ? `, ${origin.street2}` : ''
        const originFormatted = `${originStreeFormatted} ${origin.city}, ${origin.state}  ${origin.zipCode}`

        let destFormatted = 'Set Destination Address'
        let hasDestinationAddress = destination !== null
        if (hasDestinationAddress) {
            let destStreeFormatted = destination.street1
            destStreeFormatted += destination.street2 ? `, ${destination.street2}` : ''
            destFormatted = `${destStreeFormatted} ${destination.city}, ${destination.state}  ${destination.zipCode}`
        }
        /*const bgColor1Style = (company.brandColor1 !== null)
            ? { backgroundColor: company.brandColor1 }
            : { }

        const introTextColorStyle = (company.welcomeTextColor !== null)
            ? { color: company.welcomeTextColor }
            : { }*/

        console.log('relocation', this.props.relocationData)
        return (
            <ScreenWrapper backgroundImage={Images.texture02}>
                <ScrollView contentContainerStyle={[
                    Layout.fullHeight,
                    Layout.outerContainerAlt,
                    styles.scrollWrapper
                ]}>
                    <View style={[styles.transferee, { backgroundColor: Colors.lightBlueWithOpacity }]}>
                        <H1 style={[styles.transfereeText]}>{transferee.firstName} {transferee.lastName}</H1>
                        <H3 style={[styles.transfereeText]}>{transferee.jobTitle}</H3>
                        <P style={[styles.transfereeText, styles.email]}>{transferee.email}</P>
                        { isValidPhone(transferee.mobilePhoneNumber) &&
                            <P style={[styles.transfereeText]}>{formatPhone(transferee.mobilePhoneNumber)}</P>
                        }
                        <OriginDestMarker
                            originCity={origin.city}
                            originState={origin.state}
                            destCity={destAddressToUse.city}
                            destState={destAddressToUse.state}
                            locationMarker={Images.iconLocationSmallWhite}
                            arrow={Images.iconArrowheadSmallRightWhite}
                            styles={{ marginTop: 30, marginBottom: 0}}
                            lineStyles={{ backgroundColor: Colors.white}}
                            textStyles={{ color: Colors.white}}
                        />
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionHeaderContainer}>
                            <H4 style={styles.sectionHeader}>{this.__('worktitle')}</H4>
                        </View>

                        <View style={styles.sectionContent}>
                            <P style={styles.rowLabel}>{this.__('office')}</P>
                            <P style={styles.rowValue}>{company.name}</P>

                            <P style={styles.rowLabel}>{this.__('officeaddress')}</P>
                            <P style={styles.rowValue}>
                                {companyAddress.street1}{companyAddress.street2 ? `, ${companyAddress.street2}` : ''}
                                {"\n"}
                                {companyAddress.city}, {companyAddress.state}  {companyAddress.zipCode}

                            </P>
                            <P style={styles.rowLabel}>{this.__('startdate')}</P>
                            <P style={styles.rowValue}>
                                {dateFormat(relocationData.startDate, 'mmmm d, yyyy', true)}
                            </P>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionHeaderContainer}>
                            <H4 style={styles.sectionHeader}>{this.__('hometitle')}</H4>
                        </View>
                        <View style={styles.sectionContent}>
                            <P style={styles.rowLabel}>{this.__('homeaddress')}</P>

                            <TouchableOpacity style={[styles.rowValue, styles.editable, styles.field ]}
                                onPress={() => this.props.openModal('profile-current-address')}>

                                <P style={styles.fieldValue}>
                                    {origin.street1}{origin.street2 ? `, ${origin.street2}` : ''}
                                    {"\n"}
                                    {origin.city}, {origin.state}  {origin.zipCode}
                                </P>

                                <View style={styles.actionIcon}>
                                    <Image source={Images.iconEditBlue} style={styles.editIcon} />
                                </View>
                            </TouchableOpacity>

                            <AddressAutocompleteModal
                                modalKey={'profile-current-address'}
                                text={originFormatted}
                                addressObj={this.state.origin}
                                onSubmit={(address) => this.onChangeOrigin(address)} />

                            <P style={styles.rowLabel}>{this.__('homesize')}</P>
                            <View style={[styles.rowValue, styles.editable]}>
                                <P style={styles.fieldValue}>
                                    {this.__('homeroomcount', relocationData.currentBedroomCount)} {relocationData.currentResidenceType}
                                </P>
                                <TouchableOpacity style={[styles.edit, styles.editRowValue]}
                                    onPress={() => this.gotoScreen('Review3', { redirectTo: 'Profile'})}>

                                    <Text style={styles.editLink}>{this.__('edit')}</Text>
                                    <Image style={styles.editArrow} source={Images.iconArrowheadSmallRightBlue} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionHeaderContainer}>
                            <H4 style={styles.sectionHeader}>{this.__('inventorytitle')}</H4>
                            <TouchableOpacity style={styles.edit} onPress={() => this.gotoScreen('MqInventoryStart')}>
                                <Text style={styles.editLink}>{this.__('edit')}</Text>
                                <Image style={styles.editArrow} source={Images.iconArrowheadSmallRightBlue} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sectionContent}>
                            <P style={styles.rowValue}>
                                {this.__('inventoryrooms', [this.props.inventoryRoomCount])} {this.__('inventoryitems', [this.props.inventoryItemCount])}
                            </P>

                            <P style={styles.rowValue}>
                                {this.__('inventorynote')}
                            </P>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionHeaderContainer}>
                            <H4 style={styles.sectionHeader}>{this.__('familytitle')}</H4>
                            <TouchableOpacity style={styles.edit}
                                onPress={() => this.gotoScreen('Review2', { redirectTo: 'Profile'})}>

                                <Text style={styles.editLink}>{this.__('edit')}</Text>
                                <Image style={styles.editArrow} source={Images.iconArrowheadSmallRightBlue} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.sectionContent, styles.family]}>
                            <View style={[styles.rowValue, styles.familyColumn]}>
                                <View style={styles.familyCount}>
                                    <Image style={styles.adult} source={Images.iconAdultGray} />
                                    <H1 style={styles.count}>{relocationData.currentAdultsCount}</H1>
                                </View>
                                <H4>{this.__('adults')}</H4>
                            </View>
                            <View style={[styles.rowValue, styles.familyColumn]}>
                                <View style={styles.familyCount}>
                                    <Image style={styles.child} source={Images.iconChildGray} />
                                    <H1 style={styles.count}>{relocationData.currentKidsCount}</H1>
                                </View>
                                <H4>{this.__('children')}</H4>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionHeaderContainer}>
                            <H4 style={styles.sectionHeader}>{this.__('newhometitle')}</H4>
                        </View>

                        <View style={styles.sectionContent}>
                            <P style={styles.rowLabel}>{this.__('movedate')}</P>
                            <TouchableOpacity style={[styles.rowValue, styles.editable, styles.field, styles.dateField ]}
                                onPress={() => this.gotoScreen('ProfileMovingDate', { redirectTo: 'Profile'})}>

                                <P style={styles.fieldValue}>{dateFormat(relocationData.moveDate, 'mmmm d, yyyy', true)}</P>

                                <View style={styles.actionIcon}>
                                    <Image source={Images.iconCalendarSmallBlue} style={styles.calendarIcon} />
                                    <Image source={Images.iconArrowheadSmallRightBlue}  style={styles.calendarArrow} />
                                </View>
                            </TouchableOpacity>

                            <P style={styles.rowLabel}>{this.__('newaddress')}</P>
                            <TouchableOpacity style={[styles.rowValue, styles.editable, styles.field ]}
                                onPress={() => this.props.openModal('profile-dest-address')}>

                                {hasDestinationAddress ?
                                <P style={styles.fieldValue}>
                                    {destination.street1}{destination.street2 ? `, ${destination.street2}` : ''}
                                    {"\n"}
                                    {destination.city}, {destination.state}  {destination.zipCode}
                                </P> :
                                <P>{this.__('setdestaddresslabel')}</P>
                                }
                                <View style={styles.actionIcon}>
                                    <Image source={Images.iconEditBlue} style={styles.editIcon} />
                                </View>
                            </TouchableOpacity>

                            <AddressAutocompleteModal
                                modalKey={'profile-dest-address'}
                                addressObj={this.state.destination}
                                text={hasDestinationAddress ? destFormatted : ''}
                                onSubmit={(address) => this.onChangeDestination(address)} />

                        </View>
                    </View>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        relocationData: state.relocation.relocationData,
        originAddress: getOriginAddressSelector(state),
        destinationAddress: getDestinationAddressSelector(state),
        transferee: getTransfereeSelector(state),
        counselor: getCounselorSelector(state),
        company: getCompanySelector(state),
        companyAddress: getCompanyAddressSelector(state),
        inventoryData: state.inventory.data,
        inventoryRoomCount: getRoomCountSelector(state),
        inventoryItemCount : getItemCountSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'ProfileScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshInventoryData: () => {
            dispatch(asyncFetchInventoryData());
        },
        gotoScreen: (screen, params) => {
            dispatch(navigate({ routeName: screen, params: params }));
        },
        openModal: (key) => {
            dispatch(openModalById(key))
        },
        saveAddress: (addressData, addressId, addressType) => {
            dispatch(asyncSaveAddress(addressData, addressId, addressType))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(ProfileScreen))
