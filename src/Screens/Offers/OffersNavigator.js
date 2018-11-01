import React from 'react';

import { StackNavigator } from 'react-navigation';
import { DrawerMenu } from '../../Components';

import OffersScreen from '../Offers/OffersScreen';
import OfferDetailsScreen from '../Offers/OfferDetailsScreen';
import { defaultHeaderNavigationOptions } from '../../Theme';

export const OffersNavigator = StackNavigator({
    MainOffer: {
        screen: OffersScreen,
        navigationOptions: {
            title: "Offers",
            headerLeft: (<DrawerMenu />),
        }
    },
    OfferDetails: {
        screen: OfferDetailsScreen,
        navigationOptions: {
            title: "Offer Details",
        }
    }
}, {
    navigationOptions: {
        ...defaultHeaderNavigationOptions,
    }
})
