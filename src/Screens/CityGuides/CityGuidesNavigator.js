import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Variables, Colors } from "../../Theme";
import { DrawerMenu } from '../../Components';
import CityGuidesLandingScreen from '../CityGuides/CityGuidesLandingScreen';
import CompareInfoScreen from '../CityGuides/CompareInfoScreen';
import { defaultHeaderNavigationOptions } from '../../Theme';

export const CityGuidesNavigator = StackNavigator({
    CityGuidesLanding: {
        screen: CityGuidesLandingScreen,
        navigationOptions: {
            title: "City Guides",
            headerLeft: (<DrawerMenu />),
        }
    },
    CompareInfoScreen: {
        screen: CompareInfoScreen,
        navigationOptions: ({ navigation }) => ({ title: navigation.state.params.title || '' })
    }
}, {
    navigationOptions: {
        ...defaultHeaderNavigationOptions,
    }
})
