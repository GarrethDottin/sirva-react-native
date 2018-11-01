import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    container: {
        marginTop: 40,
        alignItems: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        resizeMode: 'cover',
        borderRadius: 45,
        marginBottom: 20
    },
    mainContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
});
