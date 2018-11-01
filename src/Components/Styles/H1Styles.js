import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    text: {
        color: Colors.darkGray,
        fontFamily: Variables.baseHeaderFont,
        fontSize: 30,
        fontWeight: Variables.weightSemiBold,
        lineHeight: 32,
    }
})