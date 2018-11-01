import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, ImageBackground } from 'react-native'
import { Images, Layout } from '../../Theme'
import { H1, H2, P, Button, ScreenWrapper } from '../../Components'
import { styles } from './Styles/FeedbackThankYouScreenStyles';
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { navigate, popToTop } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class FeedbackThankYouScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    goHome() {
        this.props.returnToHome();
    }

    render() {
        return (
            <ScreenWrapper backgroundStyles={{ flex: 1, width: "100%", height: "100%" }} backgroundImage={Images.texture03}>
                <View style={styles.mainContent}>
                    <H1>{this.__('title')}</H1>
                    <P style={styles.thankYouText}>{this.__('intro')}</P>
                    <Button style={styles.button} label={this.__('button')} onPress={() => this.goHome()} />
                </View>
            </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'FeedbackThankYouScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        returnToHome: () => {
            dispatch(popToTop());
            dispatch(navigate({ routeName: 'Home' }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenHOC(FeedbackThankYouScreen));
