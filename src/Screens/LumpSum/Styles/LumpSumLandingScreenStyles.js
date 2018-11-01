import { StyleSheet } from 'react-native'
import { Images, Colors, Variables, Layout } from '../../../Theme'

export default StyleSheet.create({
    scrollWrapper: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    lumpSum: {
        marginTop: 110,
    },
    introWrapper: {
        paddingHorizontal: Variables.smallGutter,
        flexDirection: 'row'
    },
    summaryTopWrapper: {
        backgroundColor: Colors.xxxLightGray,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 22,
        paddingRight: 22,
        height: 50,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    header: {
        marginTop: 5,
        color: Colors.darkGray
    },
    summaryEmployerImage: {
        width: 100,
        height: 25,
        resizeMode: 'contain',
        //marginTop: 4,
        //marginBottom: 8,
    },
    summaryBottomWrapper: {
        backgroundColor: Colors.white,
        borderColor: Colors.xxLightGray,
        borderTopWidth: 1,
        paddingTop: 43,
        paddingBottom: 45,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: Colors.black,
        shadowOffset: { height: 4, width: 0 },
    },
    summaryAmount: {
        fontSize: 40,    
        lineHeight: 48,    
        textAlign: 'center',
        marginBottom: 20,
    },
    summaryCopy: {
        textAlign: 'center',
        marginHorizontal: (Variables.smallGutter * 3),
    },
    transferButton: {
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        backgroundColor: Colors.xxxLightGray,
        height: 62,
        paddingLeft: 33,
        paddingRight: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: Colors.xxLightGray,
    },
    transferButtonCopy: {
        color: Colors.lightBlue,
        fontWeight: Variables.weightBold,
    },
    transferButtonArrow: {
        height: 20,
        width: 12
    },
    agreementTrigger: {
        marginTop:  8
    },
    agreementTextStyle: {
        fontWeight: Variables.weightBold,
        color: Colors.white
    }
})