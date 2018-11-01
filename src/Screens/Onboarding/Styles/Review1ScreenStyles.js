import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    introWrapper: {
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
        paddingTop:75,
    },
    title: {
        marginBottom: 14,
    },
    dateWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateDiff: {
        fontSize:12,
        fontWeight: Variables.weightSemiBold,
    },
    addressCopy: {
        fontWeight: Variables.weightSemiBold,
        marginBottom: 5
    },
    button: {
        width: '100%',
    },
    card: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginTop: 20,
    },
    body: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        paddingTop: 15,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    headerCopy: {
        alignSelf: 'flex-end'
    },
    image: {
        width: 32,
        height: 32,
        marginRight: 15,
        resizeMode: 'contain',
    },
    formWrapper: {
        paddingBottom: 2,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'baseline',
    },
    editIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginBottom: 5
    }
})
