import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, TextInput, ScrollView, ImageBackground } from 'react-native'
import { asyncResetPassword, asyncVerifyResetPassword } from '../../Redux/Modules/Authentication'
import { Button, Label, HelpAndSupportLink, PasswordStrengthChecker, H2 } from '../../Components'
import { Images, Layout, Colors, Forms } from '../../Theme'
import { passwordData } from '../../Config/Constants'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/ResetPasswordScreenStyles'
import { ScreenHOC } from '../Screen';

class ResetPasswordScreen extends Component {

    token = ''

    state = {
        password: '',
        hasPasswordError: false,
        isValid: false
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {        
        const { params } = this.props.navigation.state
        this.token = params ? params.token : ''
        this.props.verifyToken(this.token)
    }

    onSubmit = () => {
        const password = this.state.password

        if (this.state.isValid) {
            this.props.resetPassword(password, this.token)
        } else {
            this.setState({ hasPasswordError: true })
        }
    }

    render() {
        /*https://github.com/ttdung11t2/react-native-password-strength-checker*/
        return (
            <ImageBackground style={Layout.screenWrapper} source={Images.texture02} >
                <View style={[Layout.outerContainer]}>
                    <ScrollView style={{width:'100%'}}>
                        <HelpAndSupportLink  />
                        <Image style={styles.logo} source={Images.logoIcon} />
                        
                        <H2 style={styles.title}>{this.__('title')}</H2>

                        <View>
                            <PasswordStrengthChecker
                                languageData={this.props.screenLanguage.strengthchecker}
                                ruleNames="symbols|words"
                                strengthLevels={passwordData.strengthLevels}
                                tooShort={passwordData.tooShortData}
                                minLength={8}
                                minLevel={0}
                                ruleNames='lowerCase|upperCase'
                                showBarOnEmpty={true}
                                hasError={this.state.hasPasswordError}
                                value={this.state.password}
                                onChangeText={(text, isValid) => {
                                    this.setState({ password: text, isValid: isValid })
                                }} />

                            <Button label={this.__('button')} style={styles.button} onPress={this.onSubmit} />
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'ResetPasswordScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (password, token) => {
            dispatch(asyncResetPassword(password, token))
        },
        verifyToken: (token) => {
            dispatch(asyncVerifyResetPassword(token))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(ResetPasswordScreen))
