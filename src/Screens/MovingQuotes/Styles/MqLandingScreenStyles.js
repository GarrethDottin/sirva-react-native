import { StyleSheet } from 'react-native'
import images from '../../../Theme/Images'
import colors from '../../../Theme/Colors'
import variables from '../../../Theme/Variables'

export default StyleSheet.create({
    introCard: {
        backgroundColor: colors.lightBlue,
        paddingLeft:15,
        paddingRight:15,
        paddingTop: 30,
        paddingBottom: 20
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    location: {
        fontSize: 16,
        color: colors.white,
        marginLeft: 6,
        marginRight: 6,
        fontFamily: variables.baseFont
    },
    locationMarker: {
        width: 8,
        height: 10
    },
    locationStart: {
        paddingBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationDest: {
        marginLeft: 6,
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 4,
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationArrow: {
        width: 27,
        height: 13
    },
    dateWrapper: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        paddingBottom: 2,
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        
    },
    intro: {
        fontFamily: variables.baseHeaderFont,
        fontWeight: variables.weightSemiBold,
        fontSize: 24,
        color: colors.white,
        lineHeight: 28
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',      
    },
    selectedDate: {
        fontFamily: variables.baseHeaderFont,
        fontWeight: variables.weightSemiBold,
        fontSize: 24,
        lineHeight: 28,
        color: colors.white
    },
    calendarIcon: {
        marginLeft: 'auto',
        marginRight: 15,
        width: 18,
        height: 18
    },
    calendarArrow: {
        width: 9,
        height: 13
    },
    tablet: {
        backgroundColor: colors.green,
        borderRadius: 20,
        alignSelf: 'flex-end',
        paddingLeft: 12,
        paddingRight: 12
    },
    tabletCopy: {
        fontFamily: variables.baseFont,
        color: colors.white,
        textAlign: 'center',
        lineHeight: 26,
        fontSize: 12,
        
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
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    actionFirstChild: {
        borderBottomColor: colors.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    actionText: {
        fontFamily: variables.baseHeaderFont,
        fontWeight: variables.weightBold,
        color: colors.lightBlue,
        fontSize: 20,
        marginBottom: 10
    },
    actionImage: {
        width: 14,
        height: 20,
        alignSelf: 'center'
    },
    actionQuote: {
        fontWeight: variables.weightBold,
        marginBottom: 10
    },
    actionIncludes: {
        flexDirection: 'row'
    },
    include: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkmark: {
        width: 17,
        height: 12
    },
    xmark: {
        width: 17,
        height: 18
    },
    includesText: {
        color: colors.darkGray,
        fontSize: 12,
        fontFamily: variables.baseFont,
        marginLeft: 8
    }
});