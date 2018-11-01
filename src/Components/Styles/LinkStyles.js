import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        paddingTop: 15,
        paddingBottom: 15,
    },
    buttonText: {
        fontFamily: Variables.baseFont,
        fontWeight: Variables.weightBold,
        fontSize: Variables.baseSize,
        color: Colors.lightBlue,
    },
})