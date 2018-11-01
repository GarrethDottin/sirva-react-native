import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    concierge: {
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    orangeDot: {
        backgroundColor: Colors.orange,
        width: 12,
        height: 12,
        position: 'absolute',
        left: 16,
        top: 10,
        zIndex: 99,
        borderRadius: 6
    },
    modal: {

    },
    modalContainer: {
        alignItems: 'center'
    },
    avatar: {
        marginTop: 25,
        marginBottom: 25
    },
    iconChatSmall: {
        width: 32,
        height: 32,
        position: 'absolute',
        right: -10,
        bottom: 4,
    },
    avatarPic: {
        width: 132,
        height: 132,
        borderRadius: 66
    },
    helpText: {
        textAlign: 'center',
        color: Colors.white,
        marginBottom: 25
    },
    spacer: {
        marginTop: 30
    },
    bold: {
        fontWeight: Variables.weightBold
    },
    button: {
        width: "100%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    callButton: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: Colors.white,
        marginTop: 20
    },
    callButtonText: {
        color: Colors.darkGray
    },
    inputArea: {
        width: "100%",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: Colors.xxxLightGray,
    },
    inputAreaText: {
        width: "100%",
        height: 130,
        color: Colors.darkGray,
        fontFamily: Variables.baseFont,
        fontSize: Variables.baseSize,
        lineHeight: 20,
        paddingHorizontal: 20,
        paddingTop: 15
    },
})