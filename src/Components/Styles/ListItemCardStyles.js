import { StyleSheet } from 'react-native'
import colors from '../../Theme/Colors'
import variables from '../../Theme/Variables'

export default StyleSheet.create({
    card: {
        //box-shadow: 0 3px 8px 0 rgba(0,0,0,0.1);
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        borderRadius: 6,
        minHeight: 60,
    },
    actionImage: {
        marginLeft: 'auto'
    }
})