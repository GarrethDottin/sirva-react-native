import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    dlItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomColor: Colors.xxLightGray,
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 15
    },
    label: {
        fontFamily: Variables.baseHeaderFont,
        fontSize: 12,
    },
    value: {
        marginLeft: 50,
        flex: 1,
        textAlign: 'right'
    }
})