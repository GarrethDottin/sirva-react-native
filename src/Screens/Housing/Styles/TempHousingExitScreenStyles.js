import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    screenHeader: {
        marginBottom: 20
    },
    summaryCopy: {
        display: 'flex',
    },
    mainContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: (Variables.smallGutter * 2),
        marginVertical: 25
    },
    primaryButton: {
        width: '100%',
        minHeight: 40,
        marginTop: 9,
    },
    notice: {
        fontSize: 12,
        fontFamily: Variables.baseFont,
        color: Colors.lightGray,
        textAlign: 'center'
    },
    offer: {
        marginBottom: 30
    },
    imageContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 100,
        width: 200,
        resizeMode: 'contain',
    }
});
