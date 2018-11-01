import { StyleSheet } from 'react-native'
import { Colors } from '../../Theme'
import { navHeaderHeight } from '../../Config/Constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.white,
        marginTop: -navHeaderHeight
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})