import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { AuthenticatedNavigator } from './Navigators/AuthenticatedNavigator';
import { GuestNavigator } from './Navigators/GuestNavigator';
import { checkAuth } from './Redux/Modules/Authentication';
import * as fromErrors from './Redux/Modules/Errors';
import { asyncGetLanguageData } from './Redux/Modules/Localization';
import * as fromRelocation from './Redux/Modules/Relocation';
import { ScreenHOC } from './Screens/Screen';
import BootUp from './Screens/Start/BootUp';
import { setNavigationRef } from './Utils/NavigationHelpers';

class LandingScreen extends Component {
    componentDidMount() {
        setTimeout(()=> {
            this.props.navigation.navigate({ routeName: 'App' })
        }, 2800);
    }
    render() {
        return null
    }
}


class AuthLoadingScreen extends Component {

    componentDidMount() {
        this.props.setupConnectionCheck();
        this.props.checkAuth()

        setTimeout(()=> {
            this.props.retrieveLanguageData()
        }, 2800);
    }

    componentDidUpdate() {
        //if authenticated, preload the relocation data
        if (this.props.isAuthChecked && this.props.isAuthenticated && !this.props.isRelocationLoaded) {
            this.props.loadRelocationData();
            return
        }

        //auth is checked and language date is loaded
        //and relocation data is loaded if authenticated
        if  (this.props.languageData !== null && this.props.isAuthChecked &&
            ((this.props.isAuthenticated && this.props.isRelocationLoaded) || !this.props.isAuthenticated)
        ) {
            if (this.props.isAuthenticated)  {
                this.props.navigation.navigate({ routeName: 'Authenticated' })
            } else {
                this.props.navigation.navigate({ routeName: 'Guest' })
            }
        }
    }

    render() {
        return <BootUp/>;
    }
}

const mapStateToProps = (state) => {
    return {
        languageData: state.localization.languageData,
        isAuthenticated: state.authentication.isAuthenticated,
        isAuthChecked: state.authentication.isAuthChecked,
        isRelocationLoaded: state.relocation.loaded,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveLanguageData: () => {
            dispatch(asyncGetLanguageData())
        },
        checkAuth: () => {
            dispatch(checkAuth());
        },
        loadRelocationData: ()=> {
            dispatch(fromRelocation.asyncFetchRelocationData())
        },
        setupConnectionCheck: ()=> dispatch(fromErrors.setupConnectionCheck())
    }
}

const ConnectedAuthLoadingScreen = connect(mapStateToProps, mapDispatchToProps)(ScreenHOC(AuthLoadingScreen));

export const AppNavigator = createSwitchNavigator({
    Landing: LandingScreen,
    App: createSwitchNavigator({
        CheckAuth: ConnectedAuthLoadingScreen,
        Authenticated: AuthenticatedNavigator,
        Guest: GuestNavigator
    })
}, {
    initialRouteName: 'App'
})
