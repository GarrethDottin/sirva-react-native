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
    brandLogo: {
        width: 130,
        height: 50
    },
    label: {
        fontFamily: variables.baseFont,
        fontWeight: variables.weightBold,
        fontSize: 12,
        color: colors.lightGray,
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
    name:{
        fontSize: 20
    }
});