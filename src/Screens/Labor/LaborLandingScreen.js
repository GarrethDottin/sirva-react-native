import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, StyleSheet, Image } from 'react-native'
import { ScreenWrapper, H2, P, ProTip, TopNavHeader, FeatureCard, OfferInline, Faqs } from '../../Components'
import { protipModalStyles } from '../../Components/Styles/ProTipStyles'
import { Images, Layout } from '../../Theme'
import S from '../../StyleUtils';
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { getProtipDismissedSelector, protipIdentifiers } from '../../Redux/Modules/AppState'
import styles from './Styles/LaborLandingScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class LaborLandingScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    handleHeaderSelection = (index) => {
        if (index === 1) this.props.gotoScreen('LaborOrderHistory')
    }

    render() {
        const protip = <ProTip
            copy={this.__('protiptext')}
            copyLines={2}
            backgroundImage={images.textureGray01}
            helpActionCopy={this.__('protipmodalprompt')}
            identifier={protipIdentifiers.LaborLandingScreen}
            showDismissLink={!this.props.protipDismissed}
            dismissLinkText={this.__('protipdismiss')}
        >
            <P style={ protipModalStyles.p }>
                {this.__('protipmodaltext')}
            </P>
        </ProTip>

        const faq = [1, 2, 3, 4].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        return (
            <ScreenWrapper backgroundImage={Images.texture05} watermark={Images.movingWatermark}>
                <ScrollView contentContainerStyle={Layout.bottomSpacer}>
                    <TopNavHeader
                        data={[this.__('tabnavhelpers'), this.__('tabnavhistory')]}
                        selectedId={0}
                        onPress={(index) => this.handleHeaderSelection(index)}
                    />

                    <View style={styles.introWrapper}>
                        <H2 style={styles.introTitle}>{this.__('introtitle')}</H2>
                        <P style={styles.introCopy}>{this.__('introcopy')}</P>
                    </View>

                    {!this.props.protipDismissed &&
                        protip
                    }

                    <View style={styles.mainContainer}>
                        <Button
                            label={this.__('button')}
                            style={ [styles.primaryButton, S.mb] }
                            onPress={() => this.props.gotoScreen('LaborLocation')} />
                    </View>

                    <View style={[Layout.outerContainerAlt, styles.offer]}>
                        <OfferInline copy={this.__('discountpromo')} />
                    </View>

                    {this.props.protipDismissed &&
                        protip
                    }

                    <Faqs data={faq} containerStyles={[S.mt, {marginTop: 30}]}/>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        protipDismissed: getProtipDismissedSelector(protipIdentifiers.LaborLandingScreen, state),
        screenLanguage: getLanguageDataSelector(state, 'LaborLandingScreen')
     }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LaborLandingScreen));
