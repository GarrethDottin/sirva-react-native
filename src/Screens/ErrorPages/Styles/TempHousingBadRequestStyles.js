import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    firstContainer: {
        backgroundColor: 'rgba(59, 115, 230, 1)',
    },
    introView: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop: 15,
    },
    introCard: {
        paddingHorizontal: Variables.smallGutter * 1.5,
        paddingTop: 15,
        flexDirection: 'column'
    },
    formWrapper: {
        paddingBottom: 2,
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
    },
    pic: {
        height: 110,
        width: '100%',
        resizeMode: 'contain'
    },
    secondContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: Variables.smallGutter,
        alignItems: 'center',
    },
    button: {
        width: "100%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    callButton: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: Colors.lightBlue,
        marginTop: 20,
        alignSelf: 'flex-end'
    },
    callButtonText: {
        color: Colors.white
    },
    infoText: {
        width: '80%',
        textAlign: 'center',
        justifyContent: 'center',
    },
    homeButton: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: Colors.white,
        alignSelf: 'flex-end',
        borderColor: Colors.xxLightGray,
        borderWidth: 1

    },
    homeButtonText: {
        color: Colors.lighBlue
    },
});
