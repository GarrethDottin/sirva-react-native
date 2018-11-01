import React from 'react';

import { StackNavigator } from 'react-navigation';
import { DrawerMenu } from '../../Components';

import ContactsScreen from './ContactsScreen';
import { defaultHeaderNavigationOptions } from '../../Theme';

export const ContactsNavigator = StackNavigator({
    Contacts: {
        screen: ContactsScreen,
        navigationOptions: {
            title: "Contacts",
            headerLeft: (<DrawerMenu />)
        }
    },
}, {
    navigationOptions: {
        ...defaultHeaderNavigationOptions
    },
    cardStyle: { backgroundColor: 'transparent' }
})
