import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: Colors.lightGray,
        borderBottomWidth: 1,
    },
    innerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    labelIcon: {
        resizeMode: 'contain',
        width: 34,
        height: 34,
        marginBottom: 11,
        marginRight: 11,
    },
    labelText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: Variables.weightBold,
        marginBottom: 5,
    },
    inputText: {
        color: Colors.white,
        fontSize: 48,
        lineHeight: 52,
        marginBottom: -4,
        marginLeft: 18,
        marginRight: 18,
        fontWeight: 'normal',
    },
    button: {
        color: Colors.white,
        fontWeight: 'normal',
        marginBottom: 1,
        padding: 12,        
    },
})