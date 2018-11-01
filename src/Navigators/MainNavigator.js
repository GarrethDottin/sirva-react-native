import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { Variables, Colors } from '../Theme';
import { Dimensions } from 'react-native';
import { DrawerContent } from '../Components';

import { HomeNavigator } from './HomeNavigator';
import { OffersNavigator } from '../Screens/Offers/OffersNavigator';
import { LumpSumNavigator } from '../Screens/LumpSum/LumpSumNavigator';
import { CityGuidesNavigator } from '../Screens/CityGuides/CityGuidesNavigator';
import { ContactsNavigator } from '../Screens/Contacts/ContactsNavigator';
import { ProfileNavigator } from '../Screens/Profile/ProfileNavigator';
import { FeedbackNavigator } from '../Screens/Feedback/FeedbackNavigator';
import { AboutNavigator} from '../Screens/About/AboutNavigator';

export const MainNavigator = createDrawerNavigator({
    Home: HomeNavigator,
    Offers: OffersNavigator,
    'City Guides': CityGuidesNavigator,
    'Claim Your Lump Sum': LumpSumNavigator,
    Contacts: ContactsNavigator,
    Profile: ProfileNavigator,
    Feedback: FeedbackNavigator,
    About: AboutNavigator
}, {
    contentComponent: DrawerContent,
    drawerWidth: Dimensions.get('window').width,
    drawerBackgroundColor: 'transparent',
    contentOptions: {
        inactiveTintColor: Colors.white,
        activeTintColor: Colors.white,
        activeBackgroundColor: 'transparent',
        itemStyle: {
            height: 40,
            padding: 0,
        },
        labelStyle: {
            fontSize: 16,
            height: 40,
            fontFamily: Variables.baseFont,
            fontWeight: Variables.weightBold
        }
    }
})
