import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: Variables.smallGutter * 2.5,
        paddingTop: 25,
        flexDirection: 'column',
    },
    subContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    firstItem: {
        width: '50%',
        paddingRight: 20,
        fontSize: 12,
        fontWeight: '500'
    },
    secondItem: {
        width: '25%',
        textAlign: 'left',
        fontSize: 12
    },
    thirdItem: {
        width: '25%',
        textAlign: 'right',
        fontSize: 12
    }
})
