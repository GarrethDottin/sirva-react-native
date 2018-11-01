import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { ActionCard, ScreenWrapper, IntroCard, H2, H3, P, ProTip , AddressAutocompleteModal, Faqs } from '../../Components'
import { Images, Layout, Variables, Colors } from '../../Theme'
import styles from './Styles/HousingLandingScreenStyles'
import { getProtipDismissedSelector, protipIdentifiers, getHousingLandingScreenView, housingLandingScreenView  } from '../../Redux/Modules/AppState'
import { getDestinationAddressSelector } from '../../Redux/Modules/Relocation'
import { openModalById } from '../../Redux/Modules/Modal'
import { initLocationsIfEmpty, setLocationState } from '../../Redux/Modules/Housing'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { protipModalStyles } from '../../Components/Styles/ProTipStyles'
import { asyncSaveAddress } from '../../Redux/Modules/Relocation';
import { navigate } from '../../Redux/Modules/Routing';

class HousingLandingScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        const address = this.props.destinationAddress;
    }

    gotoScreen = (screen) => {
        this.props.gotoScreen(screen)
    }

    gotoRealEstateList = (isSellState) => {
        this.props.initRealEstateLocation()
        this.props.setRealEstateLocationState(isSellState)
        this.props.gotoScreen('AgentList')
    }

    handleClick = () => {
        Linking.canOpenURL("https://www.apartmentsearch.com/").then(supported => {
            if (supported) {
                Linking.openURL("https://www.apartmentsearch.com/");
            } else {
                console.log("Don't know how to open URI: https://www.apartmentsearch.com/");
            }
        });
    };

    saveDestAddress(addressData) {
        this.props.saveDestAddress(this.props.destinationAddress.id, addressData);
    }

    render() {
        const address = this.props.destinationAddress;

        const protip = <ProTip
            copy={this.__('protiptext')}
            copyLines={2}
            backgroundImage={images.textureGray01}
            helpActionCopy={this.__('protipmodalprompt')}
            identifier={protipIdentifiers.HousingLandingScreen}
            showDismissLink={!this.props.protipDismissed}
            dismissLinkText={this.__('protipdismiss')}
        >

            <P style={ protipModalStyles.p }>
                {this.__('protipmodaltext')}
            </P>
        </ProTip>

        let intro = null;
        if(!this.props.protipDismissed) {
            intro = protip;
        }

        const faq = [1, 2, 3].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        return (
            <ScreenWrapper
                backgroundImage={Images.texture05}
                watermark={Images.housingWatermark}>
                <ScrollView style={{minHeight: '100%'}}>
                    <IntroCard styles={styles.introCard}>
                        <View style={{ paddingHorizontal: Variables.smallGutter }}>
                            <H2 style={styles.header}>{this.__('searchheader')}</H2>
                            <View style={styles.formWrapper}>
                                <TouchableOpacity style={styles.address} onPress={() => this.props.openModal('agent-address')}>
                                    <Text style={styles.selectedAddress}>
                                        {address.city}, {address.zipCode}
                                    </Text>
                                    <Image source={Images.iconEdit}  style={styles.editIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {intro}
                    </IntroCard>
                    <AddressAutocompleteModal addressObj={address} modalKey={'agent-address'} onSubmit={ (address)=> this.saveDestAddress(address) }/>
                    <View style={Layout.outerContainerAlt}>
                        <ActionCard
                            headerIcon={Images.iconRealtor}
                            iconStyles={{width: 45, height: 45, marginBottom: -10}}
                            headerCopy={this.__('realestateheader')}
                            copy={this.__('realestatecopy')}/>
                        <View>
                            <TouchableOpacity onPress={() => this.gotoRealEstateList(true)} activeOpacity={0.5}>
                                <View style={[styles.action, styles.actionFirstChild]}>
                                    <View>
                                        <H2 style={styles.actionText}>{this.__('selling')}</H2>
                                        <View style={styles.actionIncludes}>
                                            <View style={[styles.include, { marginRight: 35 }]}>
                                                <P style={styles.includesText}>{this.__('sellingpromo')}</P>
                                            </View>
                                        </View>
                                    </View>
                                    <Image style={styles.actionImage} source={Images.iconArrowheadBlue} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.gotoRealEstateList(false)} activeOpacity={0.5}>
                                <View style={styles.action}>
                                    <View>
                                        <H2 style={styles.actionText}>{this.__('buying')}</H2>
                                        <View style={styles.actionIncludes}>
                                            <View style={[styles.include, { marginRight: 35 }]}>
                                                <P style={styles.includesText}>{this.__('buyingpromo')}</P>
                                            </View>
                                        </View>
                                    </View>

                                    <Image style={styles.actionImage} source={Images.iconArrowheadBlue} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <ActionCard
                            onPress={() => {
                                this.gotoScreen('TempHousingIntro')
                            }}
                            headerIcon={Images.iconHouse}
                            headerCopy={this.__('temphousingheader')}
                            copy={this.__('temphousingcopy')}
                            actionText={this.__('temphousingactiontext')} />

                            <TouchableOpacity style={styles.card} onPress={() => this.handleClick() }>
                                <View style={styles.cardBody}>
                                    <View>
                                        <View style={styles.cardHeader}>
                                            <Image style={styles.image} source={Images.iconBuilding} />
                                            <H4 style={styles.headerCopy}>{this.__('apartmentheader').toUpperCase()}</H4>
                                        </View>
                                        <P style={styles.copy}>{this.__('apartmentsearch')}</P>
                                    </View>
                                    <Image style={styles.arrow} source={Images.iconExternalLink} />
                                </View>
                            </TouchableOpacity>
                    </View>
                    <Faqs data={faq} />
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        protipDismissed: getProtipDismissedSelector(protipIdentifiers.HousingLandingScreen, state),
        destinationAddress: getDestinationAddressSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'HousingLandingScreen')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRealEstateLocationState: (isSellState) => {
            dispatch(setLocationState(isSellState))
        },
        initRealEstateLocation: () => {
            dispatch(initLocationsIfEmpty())
        },
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        openModal: (key) => {
            dispatch(openModalById(key))
        },
        saveDestAddress: (addressId, addressData) => {
            dispatch(asyncSaveAddress(addressData, addressId, 'destination'))
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HousingLandingScreen)
