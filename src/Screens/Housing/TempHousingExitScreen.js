import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { ScreenWrapper, IntroCard, H2, H3, P, OfferInline , AddressAutocompleteModal, Button } from '../../Components'
import { Images, Layout, Variables } from '../../Theme'
import { getTempHousingExitScreenView, tempHousingExitScreenView } from '../../Redux/Modules/AppState'
import styles from './Styles/TempHousingExitScreenStyles'
import S from '../../StyleUtils';
import { hideBell, showBell } from '../../Redux/Modules/Concierge'
import { checkForFeedback,setFeedbackLocationText } from '../../Redux/Modules/Feedback'

import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { __ } from '../../Utils/ReactHelpers'
import { resetNavStack } from '../../Redux/Modules/Routing'


class TempHousingExitScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    render() {
        return (
            <ScreenWrapper
                backgroundImage={Images.texture04}
                watermark={Images.housingWatermark}>
                <ScrollView>
                    <View style={styles.mainContainer}>
                        <H2 style={styles.screenHeader}>{this.__('title')}</H2>
                        <P style={styles.summaryCopy}>
                            {this.__('subtitle')}
                          </P>
                    </View>
                    <View style={styles.imageContainer} >
                        <Image style={styles.image} source={Images.oakwoodLogo} />
                    </View>

                    <View style={[Layout.outerContainerAlt, styles.offer]}>
                        <OfferInline copy="Save 3.75% on your stay (average savings $180 per month)." />
                    </View>

                    <View style={styles.mainContainer}>
                        <Button
                            label={this.__('buttonLabel')}
                            style={[styles.primaryButton, S.mb]}
                            onPress={() => {
                                this.props.showConciergeBell()
                                this.props.feedbackCheck()
                                this.props.feedbackText(
                                    this.__("moodTrackerTitle"),
                                    this.__("moodTrackerText")
                                )
                                this.props.goToHousing();
                            }} />
                    </View>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'TempHousingExitScreen'),
        hasViewed: getTempHousingExitScreenView(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showConciergeBell: () => {
            dispatch(showBell())
        },
        goToHousing: () => {
            dispatch(resetNavStack({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                    NavigationActions.navigate({ routeName: 'HousingLanding' }),
                ],
            }))
        },
        feedbackCheck: () => {
            dispatch(checkForFeedback('moodTrackerTempHousing'))
        },
        feedbackText:(title,text)=>{
            dispatch(setFeedbackLocationText(title, text))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TempHousingExitScreen)
