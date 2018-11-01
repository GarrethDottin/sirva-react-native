import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, TextInput, ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { asyncLoginWithCreds } from '../../Redux/Modules/Authentication'
import { Button, FloatingLabelTextField, Link, HelpAndSupportLink, H2 } from '../../Components'
import { Images, Layout } from '../../Theme'
import { regexes } from '../../Config/Constants'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/LoginScreenStyles'
import { navigate } from '../../Redux/Modules/Routing'
import { ScreenHOC } from '../Screen';

class LoginScreen extends Component {

    state = {
        email: this.props.email,
        password: this.props.password,
        emailError: false,
        passwordError: false,
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    onSubmit = () => {
        const email = this.state.email
        const password = this.state.password
        let hasEmailError = false
        let hasPasswordError = false

        if (email.length === 0 || !email.match(regexes.email)) {
            hasEmailError = true
        }
        if (password.length === 0) {
            hasPasswordError = true
        }

        this.setState({
            emailError: hasEmailError,
            passwordError: hasPasswordError,
        })

        if (!(hasEmailError || hasPasswordError)) {
            this.props.loginWithCredentials(email, password)
        }
    }

    render() {
        return (
            <ImageBackground style={Layout.screenWrapper} source={Images.texture02} >
                <KeyboardAvoidingView contentContainerStyle={{ flex: 1, width: '100%'}}  
                    behavior="position" 
                    enabled={true} 
                    keyboardVerticalOffset={-200}>
                    
                    <View style={[Layout.outerContainer]}>
                        <HelpAndSupportLink text={this.__('help')} />

                        <View style={[Layout.contentContainer]}>
                            <Image style={styles.logo} source={Images.logoIcon} />

                            <H2 style={styles.title}>{this.__('title')}</H2>

                            <FloatingLabelTextField
                                placeholder={this.__("email")}
                                autoCapitalize={'none'}
                                hasError={this.state.emailError}
                                value={this.state.email}
                                onChangeText={(value) => this.setState({ email: value })}
                                textContentType='username'
                                autoCorrect={true}
                            />

                            <FloatingLabelTextField
                                placeholder={this.__("password")}
                                secureTextEntry={true}
                                hasError={this.state.passwordError}
                                value={this.state.password}
                                onChangeText={(value) => this.setState({ password: value })}
                                textContentType='password'
                            />

                            <Link style={styles.link} onPress={this.props.gotoForgotPassword}>{this.__('forgotpassword')}</Link>

                            <Button
                                label={this.__("button")}
                                style={styles.primaryButton}
                                onPress={this.onSubmit} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.authentication.email,
        password: state.authentication.password,
        screenLanguage: getLanguageDataSelector(state, 'LoginScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginWithCredentials: (email, password) => {
            dispatch(asyncLoginWithCreds(email, password));
        },
        gotoForgotPassword: () => {
            dispatch(navigate({ routeName: 'ForgotPassword' }));
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LoginScreen))
