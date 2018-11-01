import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Linking } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { externalUrls } from '../Config/Constants';
import { pareseUrlParams } from '../Utils/ReactHelpers';

import { AsyncOverlay } from '../Components';
import { 
    ForgotPasswordScreen, ForgotPasswordSuccessScreen, IntroScreen,
    LoginScreen, RegisterScreen, ResetPasswordScreen
} from '../Screens';
import * as fromAuthentication from '../Redux/Modules/Authentication';
import { getIntroCompleted } from '../Redux/Modules/AppState';
import { navigate } from '../Redux/Modules/Routing';

class LinkingCheckScreen extends Component {
    componentDidMount() {
        Linking
            .getInitialURL()
            .then((url)=> {
                if (url) {
                    this.navigate(url)
                } else {
                    this.gotToDefaultScreen()
                }
                
            })
            .catch(()=> {
                this.gotToDefaultScreen()
            })
        Linking.addEventListener('url', (event) => this.navigate(event.url) )
    }

    gotToDefaultScreen() {
        console.log('this.props.isIntroCompleted', this.props.isIntroCompleted)
        if (this.props.isIntroCompleted) {
           this.props.navigate({ routeName: 'Login' });
        } else {
            this.props.navigate({ routeName: 'Intro' });
        }
        
    }

    navigate(url) {
        if (url.indexOf(externalUrls.resetPassword) !== -1) {
            const params = pareseUrlParams(url)
            if (params.hasOwnProperty('token')) {
                this.props.navigate({ routeName: 'ResetPassword', params: { token: params.token } })
                return
            }
        } else if (url.indexOf(externalUrls.login) !== -1) {
            const params = pareseUrlParams(url)
            if (params.hasOwnProperty('email') && params.hasOwnProperty('password')) {
                this.props.setCredentials(params.email, params.password);
            }
        }
        this.gotToDefaultScreen()
    }

    render() {
        return (
            <View style={{flex: 1}}></View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isIntroCompleted: getIntroCompleted(state)
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {   
        setCredentials: (email, password) => {
            dispatch(fromAuthentication.setCredentials(email, password))
        },
        navigate: (navigationOptions) => {
            dispatch(navigate(navigationOptions));
        }
    }
}

const ConnectedLinkingCheckScreen = connect(mapStateToProps, mapDispatchToProps)(LinkingCheckScreen);

export const GuestNavigator = createStackNavigator({
    LinkingCheck: ConnectedLinkingCheckScreen,
    Intro: IntroScreen,
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,
    ForgotPasswordSuccess: ForgotPasswordSuccessScreen,
    ResetPassword: ResetPasswordScreen,
    Register: RegisterScreen
}, {
    navigationOptions: {
        header: null
    }
});
