import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "rgba(236,240,243,0.6)",
        //height:'100%'
    },
    modal: {
        //flexGrow: 1,
        padding: Variables.largeGutter,
        paddingBottom: 0,
        margin: Variables.smallGutter,
        backgroundColor: Colors.white,
        borderRadius: 6,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowColor: Colors.black,
        shadowOffset: { height: 0, width: 0 },
    },    
})