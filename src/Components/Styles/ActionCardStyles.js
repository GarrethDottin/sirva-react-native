import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
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
        width:32,
        height:32,
        marginRight: 15,
        resizeMode: 'contain',
    },
    action: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        paddingTop: 15,
        paddingRight: 20,
        paddingBottom: 15,
        paddingLeft: 20,
    },
    actionText: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightBold,
        color: Colors.lightBlue,
        fontSize: 16
    },
    actionImage: {
        width: 14,
        height: 20
    }
})