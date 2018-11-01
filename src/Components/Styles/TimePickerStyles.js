import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: 265,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,  
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 65,
        paddingHorizontal: Variables.smallGutter,
        borderBottomWidth:1,
        borderColor: Colors.xxLightGray
    },
    link: {
        fontSize: 12,
    },
})