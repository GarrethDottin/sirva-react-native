import { StyleSheet } from 'react-native'
import { Images, Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    title: {
        color: Colors.white,
        marginTop: 12,
        marginBottom: 23,
    },
    wrapper: {
        paddingHorizontal: Variables.largeGutter,
        paddingTop: 20,
        flex: 1,
        justifyContent: 'space-between',
    },
    calendarWrapper: {
        paddingHorizontal: Variables.smallGutter,
    },
    label: {
        fontSize: 12,
        fontWeight: Variables.weightBold,
        lineHeight: 16,
        color: Colors.xxLightGray,
        marginBottom: 2,
    },
    dateWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.white,
        paddingBottom: 10,
        marginBottom:28,
    },
    date: {
        color: Colors.white,
        fontWeight: Variables.weightSemiBold,
        paddingTop: 4,
    },
    calendarIcon: {
        width: 18,
        height: 18,
    },
    button: {
        width: '100%',
        marginBottom: 35,
    }
})