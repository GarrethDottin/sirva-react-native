import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

// @ts-ignore
export default StyleSheet.create({
    introCard: {
        flex: 1,
        paddingHorizontal: Variables.smallGutter * 2,
        backgroundColor: 'rgba(6, 90, 244, 0.75)',
        paddingTop: 30,
        flexDirection: 'column'
    },
    header: {
        color: Colors.white
    },
    formWrapper: {
        paddingBottom: 2,
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
    },
    selectedAddress: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightSemiBold,
        fontSize: 23,
        lineHeight: 28,
        color: Colors.offwhite
    },
    editIcon: {
        marginLeft: 'auto',
        width: 17,
        height: 17
    },
    subContainer: {
        marginTop: 15,
        width: '45%',
    },
    intro: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightSemiBold,
        fontSize: 13,
        lineHeight: 28,
        color: Colors.white,
    },
    horizontalAlign: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedDate: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightSemiBold,
        fontSize: 18,
        lineHeight: 28,
        paddingRight: 28,
        color: Colors.offwhite
    },
    calendarIcon: {
        marginLeft: 'auto',
        width: 18,
        height: 18
    },
    houseIcon: {
        marginRight: 'auto',
        width: 23,
        height: 23,
        paddingBottom: 2
    },
    doubleElemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 20
    },
    sliderContainer: {
        marginTop: 45,
    },
    comuteContainer: {
        marginTop: 25,
    },
    houseIcon2: {
        marginRight: 15,
        width: 23,
        height: 23,
        paddingBottom: 2
    },
    primaryButton: {
        width: '100%',
        minHeight: 40,
        marginTop: 9,
    },
});
