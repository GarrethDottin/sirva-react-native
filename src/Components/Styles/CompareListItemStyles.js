import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    costInformationParentContainer: {
        flexDirection: 'column',
        flex: 1,
        marginBottom: 15,
        paddingBottom: 5
    },
    costInformationMainContainer: {
        flexDirection: 'column',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: Colors.xLightGray,
        paddingBottom: 5,
        alignItems: 'center'
    },
    costInformationContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start'
    },
    costInfomationSubContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '25%'
    },
    constInformationSubtitle: {
        fontSize: 10,
        fontWeight:'normal',
        fontFamily:Variables.baseFont,
        color: Colors.lightGray,
        paddingTop: 2,
    },
    firstItem: {
        width: '50%',
        paddingRight: 20,
        fontSize: 11,
        fontWeight: '500',
        color: Colors.darkGray,

    },
    secondItem: {
        textAlign: 'left',
        color: Colors.lightBlue,
        fontWeight:Variables.weightBold,
        fontFamily:Variables.baseHeaderFont,
        fontSize: 13
    },
    thirdItem: {
        textAlign: 'right',
        color: Colors.teal,
        fontWeight: Variables.weightBold,
        fontFamily: Variables.baseHeaderFont,
        fontSize: 13
    },
    item1Subtitle: {
        textAlign: 'left',
        fontSize: 11,
        color: Colors.xLightGray,
        flexDirection: 'column',
    },
    item2Subtitle: {
        textAlign: 'right',
        fontSize: 11,
        color: Colors.xLightGray,
        flexDirection: 'column'
    }
})
