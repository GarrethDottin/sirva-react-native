import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    tabNav: {
        marginBottom: 0
    },
    introView: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop: 15,
    },
    introCard: {
        paddingHorizontal: Variables.smallGutter * 1.5,
        paddingTop: 30,
        flexDirection: 'column'
    },
    cactusImage: {
        height: 180,
        width: '100%',
        resizeMode: 'contain'
    },
    secondContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: Variables.smallGutter,
        alignItems: 'center',
    },
    infoText: {
        width: '80%',
        textAlign: 'center',
        justifyContent: 'center',
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
    formWrapper: {
        paddingBottom: 2,
        marginTop: -30
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
