import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, TextInput, ScrollView, ImageBackground } from 'react-native'
import { Buttons, HelpAndSupportLink, H2, P } from '../../Components'
import { Images, Layout } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/ForgotPasswordSuccessScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class ForgotPasswordSuccessScreen extends Component {
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }
    
    render() {
        return (
            <ImageBackground style={Layout.screenWrapper} source={Images.texture02} >
                <View style={[Layout.outerContainer]}>
                    <HelpAndSupportLink />    
                    <ScrollView style={{width:'100%'}}>
                        <View style={[Layout.contentContainer]}>
                            <Image style={styles.logo} source={Images.logoIcon} />
                            
                            <H2 style={styles.title}>{this.__('title')}</H2>

                            <P style={styles.copy}>{this.__('subtitle')}</P>               
                         
                            <Button
                                label={this.__('button')}
                                style={styles.primaryButton}
                                onPress={this.props.gotoLogin} />
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'ForgotPasswordSuccessScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoLogin: () => {
            dispatch(navigate({ routeName: 'Login' }));
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(ForgotPasswordSuccessScreen))
