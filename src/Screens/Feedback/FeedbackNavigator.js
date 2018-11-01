import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { defaultHeaderNavigationOptions } from '../../Theme/index';
import FeedbackScreen from './FeedbackScreen';
import FeedbackThankYouScreen from './FeedbackThankYouScreen';
import { DrawerMenu } from '../../Components';

//Feedback Stack
export const FeedbackNavigator = createStackNavigator({
    MainFeedback: {
        screen: FeedbackScreen,
        navigationOptions: {
            title: "Feedback",
            headerBackTitle: null,
            headerLeft: (<DrawerMenu />),
            headerStyle: { backgroundColor: "transparent" },
            headerTransitionPreset: "uikit"
        }
    },
    ThankYouFeedback: {
        screen: FeedbackThankYouScreen,
        navigationOptions: {
            title: "Feedback",
            headerBackTitle: null,
            headerLeft: (<DrawerMenu />),
            headerStyle: { backgroundColor: "transparent" },
            headerTransitionPreset: "uikit"
        }
    }
},{
    navigationOptions: {
        ...defaultHeaderNavigationOptions
    },
    cardStyle: {backgroundColor: 'transparent'}
})
