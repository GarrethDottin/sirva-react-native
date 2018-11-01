import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    proTip: {
        marginTop: 20,
        borderRadius:6,
        marginLeft: Variables.smallGutter,
        marginRight: Variables.smallGutter, 
    },
    proTipBg: {
        padding: 10,
        borderRadius:6,
        // minHeight: 60,
        justifyContent: 'space-between'
    },
    proTipBg3Lines: {
        padding: 10,
        borderRadius:6,
        // minHeight: 60,
        justifyContent: 'space-between',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    copy: {
        color: Colors.white,
        marginBottom: 10
    },
    actionItem: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightBold,
        color: Colors.white,
        fontSize: 16,
        marginLeft: 8
    },
    hideAction: {
        marginLeft: 'auto'
    },
    bell: {
        width: 18,
        height: 19
    }
})

export const protipModalStyles =  StyleSheet.create({
    modalContainer: {
        marginTop: 30,
    },
    h2: {
        color: Colors.white
    },
    p: {
        color: Colors.white,
        marginTop: 20
    },
    icon: {
        width: 160,
        height: 86,
        marginVertical: 30,
        alignSelf: 'center'
    }
})