import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    text: {
        fontFamily: Variables.baseFont,
        color: Colors.lightGray,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: Variables.weightBold,  
        letterSpacing: 1,
    }
})