import React, { Component } from "react";
import { StyleSheet, View, WebView } from 'react-native';
import { connect } from 'react-redux';
import { ScreenWrapper, HtmlView } from '../../Components';
import * as fromLocalization from '../../Redux/Modules/Localization';
import S from '../../StyleUtils';
import { __ } from '../../Utils/ReactHelpers';



// If the struct of a given page does not fit this, it's better to create a specific screen for it.
// This approach is just to handle the common scenarios.
export const AboutScreenTitlesFn = (__) => ({
    help: __('helpTitle'),
    repayment: __('repaymentTitle'),
    terms: __('termsTitle'),
    privacy: __('privacyTitle'),
    noticies: __('noticiesTitle'),
    copyright:  __('copyrightTitle'),
    opensource: __('opensourceTitle'),
})

const htmlStylesheet = StyleSheet.create({
    h2: {
        fontSize: 30,
        marginTop: 0,
        marginBottom: 10,
    },
    p: {
        fontSize: 15,
        marginBottom: 40,
        marginTop: 0,
        fontWeight: '300'
    }
})

export class AboutDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    render() {
        const screen = this.props.navigation.getParam('screen');
        const text = `<style> html { font-family: 'Nunito Sans' } </style>${this.__(`${screen}Text`)}`;
        return (
            <ScreenWrapper>
                <View style={ S.flex1 }>
                    <View style={ [{ height: '100%'}, S.ph] }>
                        <HtmlView source={ { html: text }} ></HtmlView>
                    </View>
                </View>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: fromLocalization.getLanguageDataSelector(state, 'AboutScreen'),
    }
}

export default connect(mapStateToProps, null)(AboutDetailScreen);
