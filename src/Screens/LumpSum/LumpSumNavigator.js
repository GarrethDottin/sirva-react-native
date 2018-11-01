import React from 'react';

import { StackNavigator } from 'react-navigation';
import { DrawerMenu } from '../../Components';

import LumpSumLandingScreen from '../LumpSum/LumpSumLandingScreen';
import LumpSumTransferScreen from '../LumpSum/LumpSumTransferScreen';
import LumpSumStatusScreen from '../LumpSum/LumSumStatusScreen';
import { defaultHeaderNavigationOptions } from '../../Theme';

export const LumpSumNavigator = StackNavigator({
    LumpSumLanding: {
        screen: LumpSumLandingScreen,
        navigationOptions: {
            title: "Claim Your Lump Sum",
            headerLeft: (<DrawerMenu />),
        }
    },
    LumpSumTransfer: {
        screen: LumpSumTransferScreen,
        navigationOptions: {
            title: "Claim Your Lump Sum",
        }
    },
    LumpSumStatus: {
        screen: LumpSumStatusScreen,
        navigationOptions: {
            title: "Claim Your Lump Sum",
            headerLeft: (<DrawerMenu />),
        }
    },
}, {
    navigationOptions: {
        ...defaultHeaderNavigationOptions
    },
    cardStyle: {backgroundColor: 'transparent'}
})
