import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'
import { navHeaderHeight } from '../../Config/Constants'

export default StyleSheet.create({
    background: {
        backgroundColor: colors.lightGray,
    },
    watermark: {
        position: 'absolute',
        top: 25,
        right: 0,
        //zIndex: 999,
        width: 100,
        height: 151,
        resizeMode: 'contain'
    },
})
