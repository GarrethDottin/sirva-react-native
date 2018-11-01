import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { asyncForgotPassword } from '../../Redux/Modules/Authentication'
import { Buttons, HelpAndSupportLink, H2, P, FloatingLabelTextField } from '../../Components'
import { Images, Layout } from '../../Theme'
import { regexes } from '../../Config/Constants'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/ForgotPasswordScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class ForgotPasswordScreen extends Component {

    state = {
        email: '',
        emailError: false,
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    onSubmit = () => {
        const email = this.state.email
        let hasEmailError = false

        if (email.length === 0 || !email.match(regexes.email)) {
            hasEmailError = true
        }

        this.setState({
            emailError: hasEmailError,
        })

        if (!hasEmailError) {
            this.props.requestPassword(email)
        }
    }

    render() {
        return (
            <ImageBackground style={Layout.screenWrapper} source={Images.texture02} >
                <KeyboardAvoidingView contentContainerStyle={{ flex: 1, width: '100%'}}  
                    behavior="position" 
                    enabled={true} 
                    keyboardVerticalOffset={-140}>

                    <View style={[Layout.outerContainer]}>
                        <HelpAndSupportLink />
                            <View style={[Layout.contentContainer]}>
                                <Image style={styles.logo} source={Images.logoIcon} />
                                
                                <H2 style={styles.title}>{this.__('title')}</H2>

                                <P style={styles.copy}>{this.__('subtitle')}</P>

                                <FloatingLabelTextField 
                                    placeholder={this.__('email')}
                                    hasError={this.state.emailError}
                                    value={this.state.email}
                                    onChangeText={(value) => this.setState({email: value})}
                                />

                                <Button
                                    label={this.__('button')}
                                    style={styles.primaryButton}
                                    onPress={this.onSubmit} />

                                <Button
                                    label={this.__('cancel')}
                                    style={styles.secondaryButton}
                                    type={"secondary"}
                                    onPress={this.props.gotoLogin} />
                            </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'ForgotPasswordScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestPassword: (email) => {
            dispatch(asyncForgotPassword(email));
        },
        gotoLogin: () => {
            dispatch(navigate({ routeName: 'Login' }));
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(ForgotPasswordScreen))
