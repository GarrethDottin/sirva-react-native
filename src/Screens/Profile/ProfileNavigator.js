import React from 'react';

import { StackNavigator } from 'react-navigation';
import { DrawerMenu } from '../../Components';

import MqMovingDateScreen from '../MovingQuotes/MqMovingDateScreen';
import Review2Screen from '../Onboarding/Review2Screen';
import Review3Screen from '../Onboarding/Review3Screen';
import ProfileScreen from './ProfileScreen';
import { defaultHeaderNavigationOptions, Colors } from '../../Theme';

import { InventoryNavigationDefinition } from '../MovingQuotes/Inventory';

export const ProfileNavigator = StackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            title: "Profile",
            headerLeft: (<DrawerMenu />),
        }
    },

    ProfileMovingDate: MqMovingDateScreen,
    Review3: {
        screen: Review3Screen,
        navigationOptions: {
            title: "Home Size",
            headerStyle: {
                backgroundColor: Colors.lightBlue,
            },
            headerTintColor: Colors.white
        }
    },
    Review2: {
        screen: Review2Screen,
        navigationOptions: {
            title: "Who's Moving",
            headerStyle: {
                backgroundColor: Colors.lightBlue,
            },
            headerTintColor: Colors.white
        }
    },
    ...InventoryNavigationDefinition
},{
    navigationOptions: {
        ...defaultHeaderNavigationOptions
    }
})
