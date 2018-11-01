import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    container: {
        width:'100%',
        marginTop: 26,
        position: 'relative',
    },
    label: {
        color: Colors.xLightGray,
        fontFamily: Variables.baseFont,
        fontWeight: Variables.weightBold,
        fontSize: 12,
        lineHeight: 16,
        position: 'absolute',
        top:0,
        left: 0,
    },
    labelError: {
        color: Colors.orange,
    },
    input: {
        // width:'100%',
        flex: 1,
        height: 38,
        color: Colors.lightGray,
        fontFamily: Variables.baseFont,
        fontSize: 12,
        fontWeight: Variables.weightBold,
        lineHeight: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.xLightGray,
    },
    clearButton: {
        width:13,
        height:13,
        resizeMode: 'contain',
        position: 'absolute',
        right: 10,
        bottom: 12
    },
    showHideWrapper: {
        padding: 10,
        position: 'absolute',
        right: -2,
        bottom: 0
    },
    showHideButton: {
        width:16,
        height:14,
        resizeMode: 'contain',
        padding: 10
    },
    icon: {
        width:17,
        height:17,
        resizeMode: 'contain',
        position: 'absolute',
        bottom:16,
        right:0,
    }
})
