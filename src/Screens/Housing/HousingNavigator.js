import { StackNavigator } from 'react-navigation';
import { Variables, Colors } from "../../Theme";
import { ScreenCloseButton } from '../../Components';
import AgentListScreen from '../Housing/AgentListScreen';
import AgentDetailScreen from '../Housing/AgentDetailScreen';
import AgentRequestSubmittedScreen from '../Housing/AgentRequestSubmittedScreen';


const blackHeaderTheme = {
    headerStyle: {
        backgroundColor: 'transparent',
    },
    headerTitleStyle: {
        lineHeight: 32,
        fontSize: 20,
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightSemiBold,
        color: Colors.darkGray,
    },
}

export const HousingNavigationDefinition = {
    AgentList: {
        screen: AgentListScreen,
        navigationOptions: {
            title: "Real Estate Agent",
            headerBackTitle: null,
            headerStyle: { backgroundColor: "transparent" },
            headerTransitionPreset: "uikit"
        }
    },
    AgentDetail: {
        screen: AgentDetailScreen,
        navigationOptions: {
            title: "Real Estate Agent",
            headerBackTitle: null,
            headerStyle: { backgroundColor: "transparent" },
            headerTransitionPreset: "uikit"
        }
    },
}

export const HousingNavigator = StackNavigator(HousingNavigationDefinition, {
    navigationOptions: {
        ...blackHeaderTheme,
        headerBackTitle: null,
        title: 'Housing'
    },
    initialRouteName: 'AgentList',
    cardStyle: {backgroundColor: 'transparent'}
});
