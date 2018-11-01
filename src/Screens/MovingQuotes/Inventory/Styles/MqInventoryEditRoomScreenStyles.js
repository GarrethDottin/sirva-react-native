import { StyleSheet } from 'react-native'
import { Colors, Variables} from '../../../../Theme'

export default StyleSheet.create({
    h4: {
        marginTop: 10,
        marginBottom: 25,
        color: Colors.offwhite
    },
    buttonSet: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        minWidth: 142,
        maxWidth: 142,
        width: 142,
        paddingLeft: 0,
        paddingRight: 0
    },
    clearButton: {
        borderWidth: 2,
        borderColor: Colors.white,
        marginRight: 15,
        minHeight: 40,
    },
    modalClose: {
        padding: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },
    modalInner: {
        marginTop: 25,
        paddingBottom: 30
    },
    modalh2: {
        marginBottom: 15
    },
    modalButton: {
        marginTop: 20,
        borderColor: Colors.lightBlue,
        borderWidth: 2,
        shadowColor: 'transparent',
        minWidth: '100%'
    }
});
