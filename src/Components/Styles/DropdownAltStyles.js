import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    accessory: {
        width: 24,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },

    triangleContainer: {
        width: 13,
        height: 8,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent', /* XXX: Required */
    },
    triangle: {
        width: 13,
        height: 8
    }
})