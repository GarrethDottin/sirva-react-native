import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, ScrollView, Image, ImageBackground, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { getOriginAddressSelector, getDestinationAddressSelector, getCompanyAddressSelector,
    getStartDateSelector, asyncFetchRelocationData } from '../../Redux/Modules/Relocation'
import { showBell } from '../../Redux/Modules/Concierge'
import { getHomeScreenView, homeScreenView } from '../../Redux/Modules/AppState'
import { ScreenHOC } from '../Screen';
import { Button, DrawerMenu, H1, H3, H4, P, ProTip, ScreenWrapper } from '../../Components'
import { getDateObjFromString, getDaysUntil } from '../../Utils/ReactHelpers'
import { Images, Layout } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/HomeScreenStyles'
import { getProtipDismissedSelector, protipIdentifiers } from '../../Redux/Modules/AppState'
import { protipModalStyles } from '../../Components/Styles/ProTipStyles'

import { navigate } from '../../Redux/Modules/Routing';

class HomeScreen extends Component {
    state = {
        showIntro: false
    }

    constructor(props) {
        super(props);
        console.log('this.props.screenLanguage', this.props.screenLanguage)
        this.__ = __(this.props.screenLanguage)

        this.props.showConciergeBell()
    }

    componentDidMount = () => {
        if (!this.props.hasViewed) {
            this.props.setHasViewed()
            this.setState({ showIntro: true })
        }

        if (this.props.originAddress == null) {
            this.props.refreshRelocationData()
        }
    }

    render() {
        let diffDays = ''
        let hasSchools = this.__('schoolsEnabled') === 'true' ? true : false;

        if (this.props.startDate) {
            const startDate = getDateObjFromString(this.props.startDate)
            diffDays = getDaysUntil(startDate)
        }

        const finalAddress = this.props.destAddress ? this.props.destAddress : this.props.companyAddress

        const protip = <ProTip
            copy={this.__('protiptext')}
            copyLines={2}
            backgroundImage={images.textureGray01}
            helpActionCopy={this.__('protipmodalprompt')}
            identifier={protipIdentifiers.HomeScreen}
            showDismissLink={!this.props.protipDismissed}
            dismissLinkText={this.__('protipdismiss')}
        >
            <H2 style={ protipModalStyles.h2 }>{this.__('protipmodaltitle')}</H2>

            <P style={ protipModalStyles.p }>
                {this.__('protipmodaltext')}
            </P>
        </ProTip>

        let intro = null
        if (this.state.showIntro) {
            intro = (
                <ImageBackground style={styles.introPanel} source={Images.textureBlue01}>
                    <View style={styles.introPanelCopyWrapper}>
                        <H1 style={styles.introPanelTitle}>{this.__('introcardtitle')}</H1>
                        <P style={styles.introPanelCopy}>{this.__('introcardcopy')}</P>
                    </View>
                </ImageBackground>
            )
        }

        return (
            <ScreenWrapper backgroundImage={Images.texture07}>
                <ScrollView style={{width:'100%'}}>
                    {intro}
                    <View style={styles.summary}>
                        <Image source={Images.iconLocationBlack} style={styles.locationPin} />
                        <P numberOfLines={1} style={styles.origin}>{this.props.originAddress ? this.props.originAddress.city : ''}</P>
                        <Image source={Images.iconRightArrow} style={styles.arrow} />
                        <P numberOfLines={1} style={styles.destination}>{finalAddress.city}</P>
                        <P style={styles.days}>{(diffDays !== '') ? this.__('diffdays', diffDays) : ''}</P>
                    </View>
                    <View style={[styles.verticalLine, { height: 41 }]}></View>
                    <View style={styles.movingWrapper}>
                        <View style={styles.circle}></View>
                        <H4 style={styles.panelSubtitle}>{this.__('movingcardtitle')}</H4>
                        <H3 style={styles.panelTitle}>{this.__('movingcardsubtitle')}</H3>
                        <P style={styles.panelCopy}>{this.__('movingcardtext')}</P>
                        <Button label={this.__('movingcardbutton')} style={styles.panelButton} onPress={() => this.props.gotoScreen('MqLanding')} />
                    </View>
                    <View style={[styles.verticalLine, { height: 29 }]}></View>
                    <View style={styles.housingWrapper}>
                        <View style={[styles.circle, styles.housingCircle]}></View>
                            <H4 style={styles.panelSubtitle}>{this.__('housingcardtitle')}</H4>
                            <H3 style={styles.panelTitle}>{this.__('housingcardsubtitle')}</H3>
                            <P style={styles.panelCopy}>{this.__('housingcardtext')}</P>
                            <Button label={this.__('housingcardbutton')} type="secondary" style={styles.panelButton} onPress={() => this.props.gotoScreen('HousingLanding')} />
                    </View>
                    {hasSchools &&
                      <View>
                        <View style={[styles.verticalLine, { height: 29 }]}></View>
                         <View style={styles.housingWrapper}>
                             <View style={[styles.circle, styles.housingCircle]}></View>
                                 <H4 style={styles.panelSubtitle}>{this.__('schoolresearchcardtitle')}</H4>
                                 <H3 style={styles.panelTitle}>{this.__('schoolresearchcardsubtitle')}</H3>
                                 <P style={styles.panelCopy}>{this.__('schoolresearchcardtext')}</P>
                                 <Button label={this.__('schoolresearchcardbutton')} type="secondary" style={styles.panelButton} onPress={() => this.props.gotoScreen('Schools')} />
                         </View>
                       </View>
                     }
                    <View style={[styles.verticalLine, { height: 100 }]}></View>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        originAddress: getOriginAddressSelector(state),
        destAddress: getDestinationAddressSelector(state),
        companyAddress: getCompanyAddressSelector(state),
        startDate: getStartDateSelector(state),
        hasViewed: getHomeScreenView(state),
        protipDismissed: getProtipDismissedSelector(protipIdentifiers.HomeScreen, state),
        screenLanguage: getLanguageDataSelector(state, 'HomeScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshRelocationData: () => {
            dispatch(asyncFetchRelocationData())
        },
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        setHasViewed: () => {
            dispatch(homeScreenView())
        },
        showConciergeBell: () => {
            dispatch(showBell())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(HomeScreen))
