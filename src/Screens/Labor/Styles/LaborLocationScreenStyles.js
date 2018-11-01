import { StyleSheet } from 'react-native'
import { Images, Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    title: {
        color: Colors.white,
        marginTop:12,
        marginBottom:28,
    },
    wrapper: {
        paddingHorizontal: Variables.largeGutter,
        paddingTop: 20,
        flex:1,
        justifyContent:'space-between',
    },
    radioForm: {
        alignItems: 'flex-start',
        flexGrow:1,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom:25,
    },
    radioLabelWrapper: {
        flexGrow:1,
        marginLeft:10,
        borderBottomWidth:1, 
        borderColor:Colors.white,
        paddingBottom:10,
        paddingRight:25,
        position: 'relative',
    },
    radioLabel: {
        fontSize:12,
        fontWeight: Variables.weightBold,
        color: Colors.white,
        marginTop:3,
        marginBottom:3,
    },
    radioLabelSelected: {
        color: Colors.xxLightGray,
    },
    radioAddress: {        
        color: Colors.xxLightGray,
        fontWeight: Variables.weightSemiBold,
    },
    radioAddressFilled: {        
        color: Colors.white,
    },
    radioAddressImage: {
        width:16,
        height:20,
        position: 'absolute',
        right:0,
        bottom:14,
    },
    button: {
        width: '100%',
        marginTop: 70,
    }
})