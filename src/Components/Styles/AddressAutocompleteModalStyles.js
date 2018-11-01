import { StyleSheet, PixelRatio } from 'react-native'
import { Colors, Variables } from '../../Theme'


export default StyleSheet.create({
    wrapper: {
        height: '100%',
        paddingHorizontal: Variables.largeGutter,
        margin:0,
    },
    inputError: {
        borderBottomColor: Colors.orange,
    },
    button: {
        width:'100%',
    },
})