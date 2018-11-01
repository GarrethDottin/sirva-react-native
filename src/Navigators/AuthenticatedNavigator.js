import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createSwitchNavigator } from 'react-navigation';
import { MainNavigator } from './MainNavigator';
import  { SetupNavigator }  from './SetupNavigator';
import { navigate } from '../Redux/Modules/Routing';
import * as fromRelocation from '../Redux/Modules/Relocation';

import { ScreenHOC } from "../Screens/Screen";

class AppLoadingScreen extends Component {
    componentDidMount() {
        if (this.props.isRelocationLoaded) {
            this.navigate();
        } else  {
            this.props.loadRelocationData();
        }
    }

    componentDidUpdate() {
        if (!this.props.isRelocationLoaded) {
            return
        }
        this.navigate();
    }

    navigate() {
        if (this.props.setupComplete) {
            this.props.navigate({ routeName: 'Main' })
        } else {
            this.props.navigate({ routeName: 'Setup' })
        }
    }

    render() {
        //@TODO: relocation data is preloaded from App Navigator so this is never rendered.
        //       consider moving the navigate up a level.
        return (
            <View style={{flex: 1}}></View>
        )
    }
}

const appLoadingMapStateToProps = (state) => {
    return {
        isRelocationLoaded: state.relocation.loaded,
        setupComplete: fromRelocation.getSetupCompleteSelector(state)
    }
}

const appLoadingMapDispatchToProps = (dispatch) => {
    return {
        loadRelocationData: ()=> {
            dispatch(fromRelocation.asyncFetchRelocationData())
        },
        navigate: (navigationConfig) => {
            dispatch(navigate(navigationConfig));
        }
    }
}


const ConnectedAppLoadingScreen = connect(
  appLoadingMapStateToProps,
  appLoadingMapDispatchToProps
)(ScreenHOC(AppLoadingScreen));

export const AuthenticatedNavigator = createSwitchNavigator({
    AppLoading: ConnectedAppLoadingScreen,
    Main: MainNavigator,
    Setup: SetupNavigator
});
