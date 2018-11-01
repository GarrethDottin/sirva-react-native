
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppNavigator } from './AppNavigator';
import { setNavigationRef } from './Utils/NavigationHelpers';

import * as fromAnalytics from './Redux/Modules/Analytics';

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getActiveRouteName(route);
    }
    return route.routeName;
}

class TrackerAppNavigator extends Component {
    onNavigationChange(prevState, currentState) {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);
        if (prevScreen !== currentScreen) {
            this.props.trackScreen(currentScreen);
        }
    }

    render() {
        return (
            <AppNavigator
                ref={ navigatorRef => setNavigationRef(navigatorRef)  }
                onNavigationStateChange={
                    (prevState, currentState ) => this.onNavigationChange(prevState, currentState)
                }/>
        )
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        trackScreen: (screen)=> {
            dispatch(fromAnalytics.trackScreenView(screen))
        }
    }
}

export default connect(null, mapDispatchToProps)(TrackerAppNavigator);