import { StyleSheet } from 'react-native'
import images from '../../../Theme/Images'
import Colors from '../../../Theme/Colors'
import Variables from '../../../Theme/Variables'

// @ts-ignore
export default StyleSheet.create({
    header: {
        color: Colors.white
    },
    protip: {
        marginLeft: 0,
        marginRight: 0
    },
    introCard: {
        paddingTop: 30
    },
    formWrapper: {
        paddingBottom: 2,
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,

    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedAddress: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightSemiBold,
        fontSize: 24,
        lineHeight: 28,
        color: Colors.offwhite
    },
    editIcon: {
        marginLeft: 'auto',
        width: 17,
        height: 17
    },
    action: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        paddingTop: 15,
        paddingRight: 20,
        paddingBottom: 15,
        paddingLeft: 20,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    actionFirstChild: {
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    actionText: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightBold,
        color: Colors.lightBlue,
        fontSize: 20,
        marginBottom: 10
    },
    actionImage: {
        width: 14,
        height: 20,
        alignSelf: 'center'
    },
    actionQuote: {
        fontWeight: Variables.weightBold,
        marginBottom: 10
    },
    actionIncludes: {
        flexDirection: 'row'
    },
    include: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    includesText: {
        color: Colors.darkGray,
        fontSize: 12,
        fontFamily: Variables.baseFont,
        marginLeft: 8
    },
    card: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginTop: 20,
        marginBottom: 20
    },
    cardBody: {
        borderRadius: 6,
        paddingTop: 15,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    headerCopy: {
        alignSelf: 'flex-end'
    },
    image: {
        width: 32,
        height: 32,
        marginRight: 15,
        resizeMode: 'contain',
    },
    arrow: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        alignSelf: 'center',
    }
})
