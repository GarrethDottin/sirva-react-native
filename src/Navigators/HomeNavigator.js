import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { defaultHeaderNavigationOptions, blueHeaderNavigationOptions } from '../Theme';

import { HomeScreen, MqLandingScreen, MqMovingDateScreen } from '../Screens';
import { InventoryNavigationDefinition } from '../Screens/MovingQuotes/Inventory';
import { FSNavigationDefinition } from '../Screens/MovingQuotes/FullService';
import { PackingMaterialsNavigationDefinition } from '../Screens/MovingQuotes/PackingMaterials';
import { TruckRentalNavigationDefinition } from '../Screens/MovingQuotes/TruckRental';
import { HousingNavigationDefinition } from '../Screens/Housing';
import { LaborNavigationDefinition } from '../Screens/Labor';
import { DrawerMenu } from '../Components';
import SchoolsScreen from '../Screens/Schools/SchoolsScreen';

export const HomeNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
            headerLeft: (<DrawerMenu />),
        }
    },
    MqLanding: {
        screen: MqLandingScreen,
        navigationOptions: {
            title: 'Moving'
        }
    },
    MqMovingDate: {
        screen: MqMovingDateScreen,
        navigationOptions: {
            ...blueHeaderNavigationOptions,
            title: 'Move Date',
        }
    },
    ...InventoryNavigationDefinition,
    ...FSNavigationDefinition,
    ...TruckRentalNavigationDefinition,
    ...PackingMaterialsNavigationDefinition,
    ...HousingNavigationDefinition,
    ...LaborNavigationDefinition,
    Schools: {
        screen: SchoolsScreen,
        navigationOptions: {
            title: 'Schools'
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
});
