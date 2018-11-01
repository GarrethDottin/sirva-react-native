import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { DrawerMenu } from '../../Components';
import * as fromStore from '../../Redux/index';
import * as fromLocalization from '../../Redux/Modules/Localization';
import { defaultHeaderNavigationOptions } from '../../Theme';
import { __ } from '../../Utils/ReactHelpers';
import AboutDetailScreen, { AboutScreenTitlesFn, AboutScreenContentsFn } from './AboutDetailScreen';
import AboutLandingScreen from './AboutLandingScreen';

export const AboutNavigator = createStackNavigator({
    Landing: {
        screen: AboutLandingScreen,
        navigationOptions: {
            title: 'About iMOVE',
            headerLeft: (<DrawerMenu />),
        }
    },
    Detail: {
        screen: AboutDetailScreen,
        navigationOptions: ({navigation})=> {
            const state = fromStore.store.getState()
            const languageData = fromLocalization.getLanguageDataSelector(state, 'AboutScreen');
            const translateFn = __(languageData);
            const screenContents = AboutScreenTitlesFn(translateFn);
            return {
                title: screenContents[navigation.getParam('screen')]
            }
        }
    }
}, {
    navigationOptions: {
        ...defaultHeaderNavigationOptions,
        headerTransitionPreset: "uikit",
        headerStyle: {
            backgroundColor: 'transparent'
        }
    },
    cardStyle: { backgroundColor: 'transparent' }
})
