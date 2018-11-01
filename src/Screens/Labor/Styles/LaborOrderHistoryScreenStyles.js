import { StyleSheet } from 'react-native'
import { Images, Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    wrapper: {
        marginLeft: Variables.smallGutter,
        marginRight: Variables.smallGutter, 
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 20,
        borderRadius: 6,
        paddingLeft: 20,
        paddingRight: 18,
        paddingTop: 20,
        paddingBottom: 24,
    },
    cardInfo: {
        width: 178,
    },
    cardWorkers: {
        color: Colors.lightBlue,
        fontWeight: Variables.weightBold,
        marginBottom: 3,
    },
    cardTotal: {
        paddingTop: 7,
        paddingLeft: 10,
        paddingRight: 10,
    },
    cardArrow: {
        width: 14,
        height: 20,
    },
    emptyMessage: {
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
    }
})