import Colors from "./Colors";
import Variables from "./Variables";

const headerTitleStyle = {
    lineHeight: 32, 
    fontSize: 20,
    fontFamily: Variables.baseHeaderFont,
    fontWeight: Variables.weightSemiBold
}

export const defaultHeaderNavigationOptions = {
    headerStyle: {
        backgroundColor: 'transparent',
    },
    headerTintColor: Colors.darkGray,
    headerTitleStyle: headerTitleStyle,
    headerBackTitle: null
}

export const blueHeaderNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.lightBlueWithOpacity,
    },
    headerTintColor: Colors.white,
    headerTitleStyle: headerTitleStyle,
    headerBackTitle: null
}
