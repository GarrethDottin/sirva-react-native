import { StyleSheet } from 'react-native'
import { Images, Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    wrapper: {
        paddingLeft: Variables.largeGutter,
        paddingRight: Variables.largeGutter, 
        paddingTop: 32,
        paddingBottom: 20,
        borderBottomWidth:1,
        borderColor: Colors.xxLightGray,
    },
    detailsDatalist: {
        marginTop: 18,
    },
    dataListLastItem: {
        borderBottomWidth: 0,
    },
    discountCopy: {
        color: Colors.teal,
        fontWeight: Variables.weightBold,
        textAlign: 'center',
        paddingTop: 34,
    },
    totalsWrapper: {
        paddingLeft: Variables.largeGutter,
        paddingRight: Variables.largeGutter, 
        paddingTop: 7,
    },
    price: {
        color: Colors.orange2,
        textDecorationLine: 'line-through'
    },
    yourPrice: {
        color: Colors.teal,
    },
    total: {
        fontSize: 30,
        lineHeight: 32,
        fontWeight: Variables.weightSemibold,
    },
    paymentCopy: {
        color: Colors.orange2,
        fontWeight: Variables.weightBold,
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 21,
    },
    payButton: {
        width: 178,
        height: 44,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    noteCopy: {
        color: Colors.lightGray,
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
        marginTop: 37,
        marginBottom: 110,
    },
})