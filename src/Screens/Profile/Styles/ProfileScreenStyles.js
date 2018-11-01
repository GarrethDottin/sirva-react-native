import { StyleSheet } from 'react-native'
import { Images, Colors, Variables} from '../../../Theme'

export default StyleSheet.create({
    scrollWrapper: {
        paddingTop: 15
    },
    transferee: {
        padding: 20,
        paddingTop: 55,
        marginBottom: 15,
        borderRadius: 6
    },
    transfereeText: {
        textAlign: 'center',
        color: Colors.white
    },
    email: {
        marginVertical: 15
    },
    section: {
        //marginBottom: 40
    },
    sectionHeaderContainer: {
        backgroundColor: 'rgba(0,0,0,0.03)',
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginBottom: 17,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sectionHeader: {
        color: Colors.darkGray,
        lineHeight: 50,
    },
    edit: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    editLink: {
        color: Colors.lightBlue,
        fontSize: 12,
        fontWeight: Variables.weightSemiBold
    },
    editArrow: {
        width: 8,
        height: 16,
        marginLeft: 7
    },
    sectionContent: {
        paddingHorizontal: 20,
        marginBottom: 25
    },
    rowLabel: {
        fontSize: 12,
        color: Colors.lightGray,
        marginBottom: 3
    },
    rowValue: {
        marginBottom: 23,
        fontWeight:Variables.weightSemiBold,
        fontFamily: Variables.baseFont
    },
    fieldValue:{
        fontWeight: Variables.weightSemiBold,
        fontFamily: Variables.baseFont
    },
    editable: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    family: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    familyColumn: {
        marginHorizontal: 18,
        alignItems: 'center'
    },
    familyCount: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: Colors.xxLightGray,
        marginBottom: 10,
        paddingBottom: 10,
    },
    adult: {
        width: 28,
        height: 35,
        marginRight: 20,
    },
    child: {
        width: 34,
        height: 28,
        marginRight: 20,
        marginTop: 7
    },
    count: {
        marginBottom: 0,
        paddingBottom: 0,
        marginBottom: -9
    },
    field: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.xLightGray,
        paddingBottom: 7,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    editIcon: {
        width: 17,
        height: 17
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
    dateField: {

    }
});