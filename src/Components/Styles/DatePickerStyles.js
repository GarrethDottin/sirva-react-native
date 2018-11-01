import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

// @ts-ignore
export default StyleSheet.create({
    formWrapper: {
        paddingBottom: 2,
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
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
        height: 18,
        marginBottom: 5
    },
    header: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightSemiBold,
        fontSize: 13,
        lineHeight: 28,
        color: Colors.white
    },
    hasError: {
      paddingBottom: 2,
      borderBottomColor: Colors.orange,
      borderBottomWidth: 1
    }
})
