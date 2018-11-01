import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { ScreenWrapper, IntroCard, H2, H3, P, ProTip , AddressAutocompleteModal, Button, OfferInline, Faqs } from '../../Components'
import { Images, Layout, Variables } from '../../Theme'
import { getTempHousingIntroScreenView, tempHousingIntroScreenView } from '../../Redux/Modules/AppState'
import styles from './Styles/TempHousingIntroScreenStyles'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { getProtipDismissedSelector, protipIdentifiers } from '../../Redux/Modules/AppState'
import { protipModalStyles } from '../../Components/Styles/ProTipStyles'
import S from '../../StyleUtils';
import { hideBell, showBell } from '../../Redux/Modules/Concierge'
import { __ } from '../../Utils/ReactHelpers'
import * as fromTempHousing from '../../Redux/Modules/TempHousing';
import moment from 'moment';

import { navigate } from '../../Redux/Modules/Routing'

class TempHousingIntroScreen extends Component {

    state = {
        showIntro: false
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (!this.props.hasViewed) {
          this.props.setHasViewed()
          this.setState({ showIntro: true })
        }
        this.props.showConciergeBell()
        this.props.getLastRequest()
    }

    gotoScreen = (screen) => {
        this.props.gotoScreen(screen)
    }

    setLastRequest (lastRequest) {
      var duration = moment.duration(moment(new Date()).diff(lastRequest)).asHours();

      if (duration > 24) {
        return Math.round(moment.duration(moment(new Date()).diff(lastRequest)).asDays()) + " " + this.__('days')
      } else if (moment.duration(moment(new Date()).diff(lastRequest)).asMinutes() < 60 && moment.duration(moment(new Date()).diff(lastRequest)).asMinutes() > 1) {
        return Math.round(moment.duration(moment(new Date()).diff(lastRequest)).asMinutes()) + " " + this.__('minutes')
      } else if (moment.duration(moment(new Date()).diff(lastRequest)).asMinutes() < 1) {
        return Math.round(moment.duration(moment(new Date()).diff(lastRequest)).seconds()) + " " + this.__('seconds')
      } else {
        return Math.round(duration) + " " + this.__('hours')
      }
    }

    render() {
        const protip = <ProTip
            copy={this.__('protipSummary')}
            copyLines={2}
            backgroundImage={Images.textureGray01}
            helpActionCopy={this.__('protipLearn')}
            identifier={protipIdentifiers.TempHousingIntroScreen}
            showDismissLink={!this.props.protipDismissed}>

            <P style={protipModalStyles.p}>
                {this.__('protip')}
            </P>
        </ProTip>

        let intro = null
        if(!this.props.protipDismissed) {
            intro = protip
        }

        const faq = [1, 2, 3, 4, 5].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        return (
            <ScreenWrapper
                backgroundImage={Images.texture05}
                watermark={Images.housingWatermark}>
                <ScrollView>
                    <View style={styles.mainContainer}>
                          <H2 style={styles.screenHeader}>{this.__('title')}</H2>
                          <P style={styles.summaryCopy}>
                              {this.__('subtitle')}
                          </P>
                    </View>
                    {intro}

                    <View style={[Layout.outerContainerAlt, styles.offer]}>
                        <OfferInline copy="Save 3.75% on your stay (average savings $180 per month)." />
                    </View>

                    <View style={styles.mainContainer}>
                        <Button
                            label='Get Started'
                            style={ [styles.primaryButton, S.mb] }
                            onPress={() => this.gotoScreen('TempHousingRequest')} />
                            <Text style={styles.notice}>{this.__('requested', this.setLastRequest(this.props.lastRequest.updated_at))}</Text>
                    </View>
                    <View style={styles.imageContainer} >
                        <Image style={styles.image} source={Images.oakwoodLogo} />
                    </View>
                    <Faqs data={faq} containerStyles={S.mt} />
                </ScrollView>
            </ScreenWrapper>
      )
    }
}


const mapStateToProps = (state) => {
    return {
        hasViewed: getTempHousingIntroScreenView(state),
        protipDismissed: getProtipDismissedSelector(protipIdentifiers.TempHousingIntroScreen, state),
        screenLanguage: getLanguageDataSelector(state, 'TemporaryHousingIntroScreen'),
        lastRequest: fromTempHousing.getRequestsSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
            dispatch(hideBell())
        },
        setHasViewed: () => {
            dispatch(tempHousingIntroScreenView())
        },
        showConciergeBell: () => {
            dispatch(showBell())
        },
        getLastRequest: () => {
          dispatch(fromTempHousing.asyncGetTempHouses())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TempHousingIntroScreen)
