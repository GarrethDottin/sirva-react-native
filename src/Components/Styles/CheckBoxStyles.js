import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    elementsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 5,
    },
    checked: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    unchecked: {
        height: 20,
        width: 20,
        marginRight: 10,

    },
    textStyles: {
        color: Colors.black,
        fontWeight: '200'
    }
})
