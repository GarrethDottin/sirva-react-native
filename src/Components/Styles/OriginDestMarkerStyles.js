import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    locations: {
        marginBottom: 10
    },
    locationGraphic: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontFamily: variables.baseFont,
        fontSize: 12,
        color: colors.lightGray,
    },
    alignRight: {
        textAlign: 'right'
    },
    locationNames: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    connector: {
        flex: 1,
        height: 2,
        backgroundColor: colors.offwhite,
        marginLeft: 4,
        marginRight: 4
    },
    arrow: {
        width: 5.5,
        height: 12
    },
    marker:{
        width:13,
        height:18
    }
})