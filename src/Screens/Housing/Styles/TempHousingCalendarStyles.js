import { StyleSheet } from 'react-native'
import images from '../../../Theme/Images'
import colors from '../../../Theme/Colors'
import variables from '../../../Theme/Variables'

// @ts-ignore
export default StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: colors.lightBlueWithOpacity,
        justifyContent: 'space-between'
    },
    introCopy: {
        color: colors.white,
        marginBottom: 20
    },
    startDate: {
        backgroundColor: '#4AEB89',
        paddingLeft: 2,
        paddingRight: 2
    },
    selectedDate: {
        fontSize: 20,
        color: colors.white,
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    actionButton: {
        minHeight: 40,
        minWidth: 300,
        backgroundColor: colors.white,
    },
    actionButtonText: {
        color: colors.lightBlue,
        fontFamily: variables.baseHeaderFont,
        fontWeight: variables.weightBold,
        fontSize: variables.baseSize,
    },
    actions: {
        paddingBottom: 55
    }

})
