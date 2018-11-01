import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightBlue,
        borderRadius: 6,
        minWidth: 168,
        minHeight: 60
    },
    buttonText: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightBold,
        fontSize: Variables.baseSize,
        color: Colors.white,
    },
    containerSecondary: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: 6,
        minWidth: 168,
        minHeight: 60,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: Colors.black,
        shadowOffset: { height: 0, width: 0 },
    },
    buttonTextSecondary: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightBold,
        fontSize: Variables.baseSize,
        color: Colors.lightBlue,
    }
})