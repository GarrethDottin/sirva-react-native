import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    wrapper: {
        backgroundColor: Colors.white,
        margin: 10,
        paddingHorizontal: 27,
        paddingTop: 23,
        paddingBottom: 100,
        borderRadius: 6,
        height: '100%'
    },
    close: {
        width: 18,
        height: 18,
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 35
    },
    closeWhite: {
        marginTop: 20
    },
    grayWrapper: {
        /*flex: 1,
        flexDirection: 'column',
        alignItems: 'center',*/
        height: Dimensions.get('window').height - 30,
        paddingBottom: 23,
        top: 5
    },
    container: {
        justifyContent: 'space-between',
    },
    whiteContainer: {
        paddingBottom: 50
    }
})
