import React from 'react';
import { Images } from '../../Theme'
import { blueHeaderNavigationOptions } from '../../Theme';
import { ScreenCloseButton } from '../../Components';

import AgentListScreen from "./AgentListScreen";
import AgentDetailScreen from "./AgentDetailScreen";
import AgentRequestSubmittedScreen from "./AgentRequestSubmittedScreen";
import HousingLandingScreen from './HousingLandingScreen';
import TempHousingIntroScreen from './TempHousingIntroScreen';
import TempHousingRequestScreen from './TempHousingRequestScreen';
import TempHousingCalendarScreen from './TempHousingCalendarScreen';
import TempHousingComuteScreen from './TempHousingComuteScreen';
import TempHousingExitScreen from './TempHousingExitScreen';
import TempHousingBadRequest from '../ErrorPages/TempHousingBadRequest';

export const HousingNavigationDefinition = {
    HousingLanding: {
        screen: HousingLandingScreen,
        navigationOptions: {
            title: 'Housing'
        },
    },
    AgentList: {
        screen: AgentListScreen,
        navigationOptions: {
            title: "Housing"
        }
    },
    AgentDetail: {
        screen: AgentDetailScreen,
        navigationOptions: {
            title: "Housing"
        }
    },
    AgentSubmission: {
        screen: AgentRequestSubmittedScreen,
        navigationOptions: ({ navigation }) => {
             return {
                 headerLeft: null,
                 headerRight: (
                     <ScreenCloseButton closeIcon={Images.iconXBlack} onPress={() => navigation.goBack()}/>
                 )
             }
         }
    },
    TempHousingIntro: {
      screen: TempHousingIntroScreen,
        navigationOptions: {
          title: "Temporary Housing",
        }
    },
    TempHousingRequest: {
        screen: TempHousingRequestScreen,
        navigationOptions: {
            ...blueHeaderNavigationOptions,
            title: 'Temporary Housing',
        }
    },
    TempHousingCalendar: {
        screen: TempHousingCalendarScreen,
        navigationOptions: ({ navigation }) => ({
            ...blueHeaderNavigationOptions,
            title: navigation.state.params.title,
            headerRight: ( <ScreenCloseButton closeIcon={Images.iconXWhite} onPress={() => navigation.goBack()} /> ),
        })
    },
    TempHousingComute: {
        screen: TempHousingComuteScreen,
        navigationOptions: {
            ...blueHeaderNavigationOptions,
            title: 'Temporary Housing',
        },
    },
    TempHousingExit: {
        screen: TempHousingExitScreen,
        navigationOptions: {
            title: 'Temporary Housing'
        }
    },
    TempHousingBadRequest: {
      screen: TempHousingBadRequest,
      navigationOptions: {
        title: 'Temporary Housing'
      }
    }
}
