import { StyleSheet } from 'react-native';
import { Colors, Variables } from '../../Theme'

export const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-end',
        backgroundColor: "rgba(0,0,0,0)",
    },
    modal: {
        backgroundColor: Colors.orange,
        alignItems: 'center',
        paddingBottom: 15
    },
    successModal: {
        backgroundColor: Colors.lightGreen
    },
    copy: {
        color: Colors.white,
    },
    successCopy: {
        color: Colors.darkGray
    },
    modalLink: {
        alignSelf: 'flex-end',
        marginTop: 0,
        paddingBottom: 0
    },
    modalLinkTextError: {
        color: Colors.white,
    },
    modalLinkTextSuccess: {
        color: Colors.darkGray,
    },
    nonModal: {
        flexGrow: 1,
        padding: 20,
        margin: Variables.smallGutter,
        borderRadius: 6,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowColor: Colors.black,
        shadowOffset: { height: 0, width: 0 },
    }
})
