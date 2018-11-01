import { StyleSheet } from 'react-native'
import { Colors, Variables} from '../../../../Theme'

export default StyleSheet.create({
    h2: {
        color: Colors.white
    },
    roomInfo: {
        marginTop: 30,
        paddingBottom: 12,
        marginBottom: 10,
        borderBottomColor: 'rgba(233,233,233,0.2)',
        borderBottomWidth: 1,
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 9
    },
    editAction: {
        flexDirection: 'row',
        marginLeft: 'auto',
        alignItems: 'center'
    },
    editIcon: {
        width: 17,
        height: 17,
        marginLeft: 5
    },
    nfLabelText: {
        fontSize: 16,
        fontWeight: 'normal',
        marginBottom: 10
    },
    nfInputText: {
        fontSize: 16,
        lineHeight: 48,
        marginLeft: 10,
        marginRight: 10
    },
    nfButton: {
        fontSize: 16,
        padding: 6
    },
    nfContainer: {
        borderBottomColor: Colors.offwhite
    },
    nfInnerWrapper: {
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
        marginBottom: -1
    },
    button: {
        marginTop: 36,
    }
});
