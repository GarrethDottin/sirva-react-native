import { StyleSheet } from 'react-native'
import { Colors, Variables} from '../../../../Theme'

export default StyleSheet.create({
    blueScreen: {
        backgroundColor: Colors.lightBlueWithOpacity
    },
    blueHeaderStyles: { 
        lineHeight: 32, 
        fontSize: 20, 
        fontFamily: Variables.baseHeaderFont, 
        fontWeight: Variables.weightSemiBold 
    },
    textBox: {
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
        fontSize: 24,
        color: Colors.white,
        marginTop: 25,
        marginBottom: 5,
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightSemiBold,
        width: '100%',
        height: 40
    },
    inputError: {
        borderBottomColor: Colors.yellow
    },
    error: {
        color: Colors.yellow,
        fontWeight: Variables.weightSemiBold
    },
    radioItemStyle: {
        marginBottom: 30
    },
    radioLabel: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Variables.baseFont,
    },
    h4: {
        color: Colors.white
    },
    whiteButton: {
        minWidth: '100%',
        minHeight: 40,
        marginBottom: 50
    },
    roomTypeLabel: {
        color: Colors.offwhite
    }
});
