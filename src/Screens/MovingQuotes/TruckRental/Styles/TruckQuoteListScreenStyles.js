import { StyleSheet } from 'react-native'
import images from '../../../../Theme/Images'
import colors from '../../../../Theme/Colors'
import Variables from '../../../../Theme/Variables'

export default StyleSheet.create({
    introWrapper: {
        marginBottom: -10,
    },
    introCopy: {
        fontSize: 24,
        lineHeight: 28,
        color: colors.white,
        marginBottom: -36,
        fontFamily: variables.baseFont
    },
    sizeFilters: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'flex-start',
        marginBottom: -30
    },
    truck: {
        width: 35,
        height: 35,
        marginTop: -10,
        marginRight:10,
    },
    optionStyles: {
        marginHorizontal: 15
    },
    sizeLinkText: {
        fontFamily: variables.baseFont,
        fontSize: 12,
        fontWeight: variables.weightBold,
        color: '#4175F7'
    },
    listCard: {
        paddingTop: 14,
        paddingBottom: 10
    },
    quoteInfo: {
        marginLeft: 20
    },
    offerFlag: {
        marginLeft: 35
    },
    brandLogo: {
        width: 130,
        height: 51
    },
    listItemName: {
        fontSize: 16,
        color: colors.darkGray,
        flex: 1
    },
    listItemLabel: {
        textAlign: 'center',
        color: '#A19E9E',
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightBold
    },
    listItemCopy: {
        textAlign: 'center',
        fontSize: 30,
        color: colors.darkGray,
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightSemiBold,
    },
    h2: {
        marginTop: 26
    }
});