import React from 'react';
import { blueHeaderNavigationOptions, Images } from '../../../Theme';
import { ScreenCloseButton } from '../../../Components';

import MqInventoryScreen from './MqInventoryScreen';
import MqInventoryAddRoomScreen from './MqInventoryAddRoomScreen';
import MqInventoryRoomScreen from './MqInventoryRoomScreen';
import MqInventoryEditRoomScreen from './MqInventoryEditRoomScreen';
import MqInventoryAddItemScreen from './MqInventoryAddItemScreen';



export const InventoryNavigationDefinition = {
    MqInventoryStart: {
        screen: MqInventoryScreen,
        navigationOptions: {
            title: 'Inventory'
        }
    },
    MqInventoryAddRoom: {
        screen: MqInventoryAddRoomScreen,
        navigationOptions: ({ navigation })=> { 
            return {
            ...blueHeaderNavigationOptions,
            title: "Add Room",
            headerLeft: null,
            headerRight: (
                <ScreenCloseButton closeIcon={Images.iconXWhite} onPress={() => navigation.goBack()}/>
            )
        } }
    },
    MqInventoryRoom: {
        screen: MqInventoryRoomScreen,
        navigationOptions: {
            ...blueHeaderNavigationOptions,
            title: 'Inventory'
        }
    },
    MqInventoryEditRoom: {
        screen: MqInventoryEditRoomScreen,
        navigationOptions: ({ navigation }) => {
            return {
                ...blueHeaderNavigationOptions,
                title: "Edit Room",
                headerLeft: null,
                headerRight: (
                    <ScreenCloseButton closeIcon={Images.iconXWhite} onPress={() => navigation.goBack()}/>
                )
            }
        }
    },
    MqInventoryAddItem: {
        screen: MqInventoryAddItemScreen,
        navigationOptions: ({navigation}) => {
            return {
                ...blueHeaderNavigationOptions,
                title: "Add Item",
                headerLeft: null,
                headerRight: (
                    <ScreenCloseButton closeIcon={Images.iconXWhite} onPress={() => {
                        navigation.goBack()
                    }}/>
                )
            }
        }
    },
}
