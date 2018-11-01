import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', 
    },
    text: {
        color: Colors.darkGray,
        fontFamily: Variables.baseFont,
        fontSize: 16,
        lineHeight: 20,
    },
    bullet: {
        width: 8,
        height: 8,
        resizeMode: 'center',  
        marginRight: 16,  
    }
})