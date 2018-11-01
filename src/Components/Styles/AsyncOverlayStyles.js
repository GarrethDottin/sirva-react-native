import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    blur: {
        position: 'absolute', 
        top: 0, 
        right: 0, 
        bottom: 0, 
        left: 0, 
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    }
    /*backdrop: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: Variables.smallGutter,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9
    },
    content: {
        backgroundColor: Colors.white,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        //borderRadius: 6
    },
    copy: {
        textAlign: 'center',
        color: Colors.medBlue,
        marginLeft: 10,
        //fontWeight: Variables.weightSemiBold
    }*/
})