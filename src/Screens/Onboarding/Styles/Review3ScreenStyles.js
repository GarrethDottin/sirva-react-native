import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    wrapper: {
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
        paddingTop:75,
    },
    title: {
        color: Colors.xLightBlue,
        marginBottom: 19,
    },
    subtitle: {
        color: Colors.white,
        marginBottom: 55,
    },
    copy: {
        color: Colors.white,
        fontSize: 12,
        lineHeight: 16,
        marginTop:-36,
        marginBottom: 24,
    },
    button: {
        width: '100%',
    },
    fieldContainer: {
        marginTop: 50,
        marginBottom: 50,
    }
});