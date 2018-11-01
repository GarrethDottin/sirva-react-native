import React from 'react';

import FsQuoteLandingScreen from './FsQuoteLandingScreen';
import FsQuoteListScreen from './FsQuoteListScreen';
import FsQuoteDetailScreen from './FsQuoteDetailScreen';
import FsQuoteConfirmScreen from './FsQuoteConfirmScreen';
import FsQuoteSubmittedScreen from './FsQuoteSubmittedScreen';

import { NavigationActions } from 'react-navigation'
import { resetNavStack } from '../../../Utils/NavigationHelpers';

export const FSNavigationDefinition = {
    FsQuoteLanding: {
        screen: FsQuoteLandingScreen,
        navigationOptions: {
            title: 'Full-service Movers'
        }
    },
    FsQuoteList: {
        screen: FsQuoteListScreen,
        navigationOptions: {
            title: 'Full-Service Movers'
        }
    },
    FsQuoteDetail: {
        screen: FsQuoteDetailScreen,
        navigationOptions: {
            title: 'Estimate Details'
        }
    },
    FsQuoteConfirm: {
        screen: FsQuoteConfirmScreen,
        navigationOptions: {
            title: 'Estimate Details'
        }
    },
    FsQuoteSubmitted: {
        screen: FsQuoteSubmittedScreen,
        navigationOptions: ({ navigation }) => ({
            title: '',
            headerLeft: null,
            headerRight: (
                <ScreenCloseButton onPress={() => {
                    resetNavStack({
                        index: 1,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Home' }),
                            NavigationActions.navigate({ routeName: 'MqLanding' }),
                        ],
                    });
                }}/>
            )
        })
    }
}
