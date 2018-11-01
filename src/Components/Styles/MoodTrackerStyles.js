import { StyleSheet } from 'react-native';
import { Colors, Variables } from '../../Theme'

export const styles = StyleSheet.create({
    modal: {
       backgroundColor: "transparent",
       margin:0,
       padding:0,
    },
    topWrapper: {
        backgroundColor: "#3D5AD4",
        margin: Variables.smallGutter,
        marginBottom:0,
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
        paddingTop: 45,
        paddingBottom: 45,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    buttonWrapper: {
        flexDirection:'row',
    },
    alignText: {
        textAlign: "center",
        marginVertical: 5,
        paddingHorizontal: 20,
        color: Colors.white
    },
    button: {
        flexGrow: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopWidth: 1,
        borderColor: Colors.white,
        marginLeft: Variables.smallGutter,
        marginRight: Variables.smallGutter,
    },
})
