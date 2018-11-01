import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    touchableHighStyle: {
        marginTop: 20,
        borderRadius: 7
    },
    card: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    body: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        paddingTop: 15,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.xxLightGray
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerCopy: {
        alignSelf: 'flex-start',

    },
    image: {
        width: 32,
        height: 32,
        marginRight: 15,
        resizeMode: 'contain',
    },
    arrow: {
        width: 14,
        height: 20
    },
    subtitle: {
        fontSize: 12,
        color: Colors.lightGray,
    }
})
