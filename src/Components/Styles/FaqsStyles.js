import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 10
    },

    title: {
        textAlign: 'center',
        color: Colors.lightGray,
        fontSize: 12,
        fontFamily: Variables.baseFont,
        fontWeight: Variables.weightBold
    },

    faqItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    faqQuestion: {
        color: Colors.lightBlue,
        fontWeight: 'bold',
        textAlign: 'justify',
        width: '90%'
    },

    faqAnswer: {
        alignItems: 'flex-start',
    },

    arrowStyle: {
        width: 9,
        height: 9,
    },

    arrowStyleRotated: {
        width: 9,
        height: 9,
        transform: [{ rotate: '90deg'}],
    },

    itemContainer: {
        borderTopWidth: 0.25,
        borderTopColor: Colors.xLightGray,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.45)'
    }
})
