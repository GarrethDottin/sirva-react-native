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
        paddingRight: 34
    },
    summaryColumn: {
        flex: 1
    },
    label: {
        fontFamily: variables.baseFont,
        fontSize: 12,
        color: colors.lightGray,
    },
    alignRight: {
        textAlign: 'right'
    },
    name: {
        lineHeight: 28
    },
    price: {
        fontFamily: variables.baseHeaderFont,
        fontSize: 40,
        fontWeight: variables.weightSemiBold,
        textAlign: 'right'
    },
    brandLogo: {
        width: 130,
        height: 53,
        marginLeft: -12
    },
    details: {
        paddingTop: 30
    },
    estimate: {
        textAlign: 'right'
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.lightGray,
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
    //@TODO: Refactor to share these with FsQuoteDetailScreenStyles.js
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
    notincluded: {
        marginTop: 30
    },
    checkmark: {
        width: 17,
        height: 12,
        marginRight: 5
    },
    xmark: {
        width: 17,
        height: 18,
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