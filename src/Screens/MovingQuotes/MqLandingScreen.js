import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { IntroCard, ProTip, ActionCard, ScreenWrapper, H2, P, AddressAutocompleteModal } from '../../Components'
import { protipModalStyles } from '../../Components/Styles/ProTipStyles'
import images from '../../Theme/Images'
import layout from '../../Theme/Layout'
import styles from './Styles/MqLandingScreenStyles'
import sectionStyles from './Styles/SectionStyles'
import { openModalById } from '../../Redux/Modules/Modal'
import { asyncFetchRelocationData, asyncSaveAddress, getOriginAddressSelector,
    getDestinationAddressSelector, getMoveDateSelector  } from '../../Redux/Modules/Relocation'
    import { asyncFetchInventoryData } from '../../Redux/Modules/Inventory'
import { asyncFetchMovingQuoteData, asyncFetchTruckQuoteData, getMovingQuoteRange, getTruckEstimateRange  } from '../../Redux/Modules/Moving'
import { doInventoryItemsExistSelector } from '../../Redux/Modules/Inventory'
import { formatCurrencyFromString } from '../../Utils/ReactHelpers'
import { getProtipDismissedSelector, protipIdentifiers } from '../../Redux/Modules/AppState'
import { convertGooglePlacesAddress } from '../../Utils/ReactHelpers'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { showBell } from '../../Redux/Modules/Concierge'

import { navigate } from '../../Redux/Modules/Routing';
import * as fromMoving from '../../Redux/Modules/Moving';

import { ScreenHOC } from '../Screen';

class MqOptionsCard extends Component {
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    render() {
        if (!this.props.isMoveDateValid) {
            return (
                <ActionCard
                    headerIcon={images.iconDolly}
                    headerCopy={this.__('movingcardtitle')}
                    headerStyles={{ marginBottom: 5 }}
                    copy={"Move pricing requires a destination address."}
                    copyStyles={{ paddingTop: 10 }}
                    actionText={'Set Move Date'}
                    onPress={() => this.props.gotoScreen('MqMovingDate', { redirectTo: 'Profile'}) }
                    bodyStyles={ { paddingTop: 20, alignContent:'flex-start', flexDirection: 'row', justifyContent: 'space-between' } }>
                    {<View />}
                </ActionCard>
            )
        } else if (!this.props.destinationAddress) {
            return (
                <ActionCard
                    headerIcon={images.iconDolly}
                    headerCopy={this.__('movingcardtitle')}
                    headerStyles={{ marginBottom: 5 }}
                    copy={"Move pricing requires a destination address."}
                    copyStyles={{ paddingTop: 10 }}
                    actionText={'Set address'}
                    onPress={() => this.props.openModal('moving-dest-address') }
                    bodyStyles={ { paddingTop: 20, alignContent:'flex-start', flexDirection: 'row', justifyContent: 'space-between' } }>
                    {<View />}
                </ActionCard>
            )
        } else {
            return (
                <ActionCard headerIcon={images.iconDolly} headerCopy={this.__('movingcardtitle')} headerStyles={{ marginBottom: 5 }}>
                    {<View />}
                </ActionCard>
            )
        }
    }
}


class MqLandingScreen extends Component {
    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        this.dateFormat = require('dateformat');
    }


    componentDidMount = () => {
        if (this.props.inventoryData === null) {
            this.props.refreshData()
        }
    }

    gotoScreen = (screen) => {
        this.props.gotoScreen(screen)
    }


    onChangeDestination = (addressData) => {
        const addressId = this.props.destinationAddress !== null ? this.props.destinationAddress.id : null
        this.props.saveAddress(addressData, addressId)
    }

    isMoveDateValid() {
        if (!this.props.moveDate) return false;

        const moveDate = moment(this.props.moveDate);
        const tomorrow = moment().add(1, 'day');

        return moveDate >= tomorrow;
    }

    render() {
        const moveDate = this.props.moveDate ? this.props.moveDate : ''
        const hasData = this.props.originAddress != null
        const hasDestinationAddress = this.props.destinationAddress !== null
        const destinationLabel = hasDestinationAddress ? this.props.destinationAddress.city : 'Set destination'

        let destFormatted = 'Set Destination'
        if (hasDestinationAddress) {
            const destination = this.props.destinationAddress

            let destStreeFormatted = destination.street1
            destStreeFormatted += destination.street2 ? `, ${destination.street2}` : ''
            destFormatted = `${destStreeFormatted} ${destination.city}, ${destination.state}  ${destination.zipCode}`
        }

        const protip = <ProTip
            copy={this.__('protiptext')}
            copyLines={3}
            backgroundImage={images.textureGray02}
            helpActionCopy={this.__('protipmodalprompt')}
            identifier={protipIdentifiers.MqLandingScreen}
            showDismissLink={!this.props.protipDismissed}
            dismissLinkText={this.__('protipdismiss')}
        >
            <P style={ protipModalStyles.p }>
                {this.__('protipmodaltext')}
            </P>
        </ProTip>

        console.log('this.props.hasInventory', this.props.hasInventory)
        return (
            <ScreenWrapper
                backgroundImage={images.texture05}
                watermark={images.movingWatermark}>

                <ScrollView contentContainerStyle={layout.bottomSpacer}>
                    <IntroCard>
                        <View style={styles.locationWrapper}>
                            <View style={styles.locationStart}>
                                <Image source={images.iconLocationSmallWhite} style={styles.locationMarker} />
                                <Text style={styles.location}>{this.props.originAddress.city}</Text>
                            </View>
                            <Image source={images.iconRightArrow} style={styles.locationArrow} />

                            <TouchableOpacity style={styles.locationDest} onPress={() => this.props.openModal('moving-dest-address')}>
                                <Image source={images.iconLocationSmallWhite} style={styles.locationMarker} />
                                <Text style={styles.location}>{destinationLabel}</Text>
                            </TouchableOpacity>

                            <AddressAutocompleteModal
                                modalKey={'moving-dest-address'}
                                text={hasDestinationAddress ? destFormatted : ''}
                                onSubmit={(addressData) => this.onChangeDestination(addressData)} />
                        </View>
                        <View style={styles.dateWrapper}>
                            <Text style={styles.intro}>{this.__('pickmovedate')}</Text>
                            <TouchableOpacity style={styles.date} onPress={() => this.gotoScreen('MqMovingDate')}>
                                <Text style={styles.selectedDate}>
                                    {this.dateFormat(moveDate, 'mmm d, yyyy', true)}
                                </Text>
                                <Image source={images.iconCalendarSmallWhite} style={styles.calendarIcon} />
                                <Image source={images.iconArrowheadSmallRightWhite}  style={styles.calendarArrow} />
                            </TouchableOpacity>
                        </View>


                        {!this.props.protipDismissed &&
                            protip
                        }
                    </IntroCard>
                    <View style={layout.outerContainerAlt}>
                        <ActionCard
                            onPress={() => this.gotoScreen('MqInventoryStart')}
                            headerIcon={images.iconInventory}
                            headerCopy={this.__('inventorycardtitle')}
                            copy={this.__('inventorycardtext')}
                            actionText={this.props.hasInventory ? this.__('inventoryupdatecardactiontext') : this.__('inventorycardactiontext')}
                        />


                        <MqOptionsCard {...this.props} isMoveDateValid={this.isMoveDateValid()}/>


                        {hasDestinationAddress && this.isMoveDateValid() &&
                            <View style={styles.movingOptions}>
                                <TouchableOpacity onPress={() => this.props.navigateToFsQuotes()} activeOpacity={0.5}>
                                    <View style={[styles.action, styles.actionFirstChild]}>
                                        <View style={styles.actionInfo}>
                                        <H2 style={styles.actionText}>{this.__('professionalmovers')}</H2>
                                            {this.props.movingEstimateRange &&
                                                <P style={styles.actionQuote}>
                                                    {formatCurrencyFromString(this.props.movingEstimateRange.min)}

                                                    {this.props.movingEstimateRange.min != this.props.movingEstimateRange.max &&
                                                        `-${formatCurrencyFromString(this.props.movingEstimateRange.max)}`
                                                    }
                                                </P>
                                            }



                                            <View style={styles.actionIncludes}>
                                                <View style={[styles.include, { marginRight: 35 }]}>
                                                    <Image source={images.iconCheckmark} style={styles.checkmark}/ >
                                                <P style={styles.includesText}>{this.__('loadingunloading')}</P>
                                                </View>
                                                <View style={styles.include}>
                                                    <Image source={images.iconCheckmark} style={styles.checkmark} />
                                                <P style={styles.includesText}>{this.__('driving')}</P>
                                                </View>
                                            </View>
                                        </View>

                                        <Image style={styles.actionImage} source={images.iconArrowheadBlue} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.gotoScreen('TruckQuoteList')} activeOpacity={0.5}>
                                    <View style={styles.action}>
                                        <View style={styles.actionInfo}>
                                        <H2 style={styles.actionText}>{this.__('rentaltruck')}</H2>
                                            {this.props.truckEstimateRange &&
                                                <P style={styles.actionQuote}>
                                                    {formatCurrencyFromString(this.props.truckEstimateRange.min)}

                                                    {this.props.truckEstimateRange.min != this.props.truckEstimateRange.max &&
                                                        `-${formatCurrencyFromString(this.props.truckEstimateRange.max)}`
                                                    }
                                                </P>
                                            }


                                            <View style={styles.actionIncludes}>
                                                <View style={[styles.include, { marginRight: 35 }]}>
                                                    <Image source={images.iconXOrange} style={styles.checkmark} />
                                                <P style={styles.includesText}>{this.__('loadingunloading')}</P>
                                                </View>
                                                <View style={styles.include}>
                                                    <Image source={images.iconXOrange} style={styles.checkmark} />
                                                <P style={styles.includesText}>{this.__('driving')}</P>
                                                </View>
                                            </View>
                                        </View>

                                        <Image style={styles.actionImage} source={images.iconArrowheadBlue} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={ { marginBottom: 20 } }>
                            <ActionCard
                                onPress={() => this.gotoScreen('LaborLanding')}
                                headerIcon={images.iconLaborBlue}
                                headerCopy={this.__('laborcardtitle')}
                                copy={this.__('laborcardtext')}
                                actionText={this.__('labordcardactiontext')}
                            />


                            <ActionCard
                                onPress={() => this.gotoScreen('PackingMaterialsList')}
                                headerIcon={images.iconMaterials}
                                headerCopy={this.__('materialscardtitle')}
                                copy={this.__('materialscardtext')}
                                actionText={this.__('materialscardactiontext')}
                            />
                        </View>


                        {this.props.protipDismissed &&
                            protip
                        }
                    </View>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        moveDate: getMoveDateSelector(state),
        originAddress: getOriginAddressSelector(state),
        destinationAddress: getDestinationAddressSelector(state),
        inventoryData: state.inventory.data,
        movingEstimateRange: getMovingQuoteRange(state),
        truckEstimateRange: getTruckEstimateRange(state),
        hasInventory: doInventoryItemsExistSelector(state),
        protipDismissed: getProtipDismissedSelector(protipIdentifiers.MqLandingScreen, state),
        screenLanguage: getLanguageDataSelector(state, 'MqLandingScreen'),
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        navigateToFsQuotes: () => {
            dispatch(fromMoving.navigateToFsQuotes());
        },
        refreshData: () => {
            dispatch(asyncFetchInventoryData());
            dispatch(asyncFetchMovingQuoteData());
            dispatch(asyncFetchTruckQuoteData());
        },
        openModal: (key) => {
            dispatch(openModalById(key))
        },
        saveAddress: (addressData, addressId) => {
            dispatch(asyncSaveAddress(addressData, addressId, 'destination'))
        },
        showConciergeBell: () => {
          dispatch(showBell())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(MqLandingScreen))
