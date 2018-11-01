import { StyleSheet } from 'react-native'
import images from '../../../../Theme/Images'
import colors from '../../../../Theme/Colors'
import variables from '../../../../Theme/Variables'

export default StyleSheet.create({
    summary: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 43,
        paddingBottom: 43,
        paddingLeft: 34,
        paddingRight: 34,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    summaryColumn: {
        flex: 1
    },
    label: {
        fontFamily: variables.baseFont,
        fontWeight: variables.weightBold,
        fontSize: 12,
        color: colors.lightGray,
    },
    alignRight: {
        textAlign: 'right'
    },
    name: {
        marginTop: 10,
        lineHeight: 28
    },
    price: {
        fontFamily: variables.baseHeaderFont,
        fontSize: 40,
        fontWeight: variables.weightSemiBold,
        textAlign: 'right'
    },
    estimate: {
        textAlign: 'right'
    },
    details: {
        paddingTop: 30
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.xxLightGray,
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 15
    },
    button: {
        minHeight: 40,
        marginTop: 30,
        marginBottom: 23,
        alignSelf: 'stretch'
     },
     notice: {
         fontSize: 12,
         fontFamily: variables.baseFont,
         color: colors.lightGray,
         textAlign: 'center'
     },
     section: {
         marginTop: 50
     },
     sectionHeader: {
         color: colors.darkGray,
         marginBottom: 20
     },
     include: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkmark: {
        width: 17,
        height: 12,
        marginRight: 5
    },
    contactAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.xxLightGray,
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 15
    },
    contactActionCopy: {
        color: colors.lightBlue
    },
    phone: {
        width: 17,
        height: 20
    },
    externalLink: {
        width: 16,
        height: 19
    },
    offer: {
        marginTop: 30
    }
});