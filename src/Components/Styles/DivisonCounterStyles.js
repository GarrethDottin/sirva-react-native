import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

// @ts-ignore
export default StyleSheet.create({
    formWrapper: {
        paddingBottom: 2,
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
    },
    horizontalAlign: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 'auto',
        width: 23,
        height: 23,
        marginBottom: 5
    },
})
