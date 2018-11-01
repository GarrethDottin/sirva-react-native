import { StyleSheet } from 'react-native'
import { Images, Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    wrapper: {
        paddingLeft: Variables.largeGutter,
        paddingRight: Variables.largeGutter, 
        paddingTop: 32,
    },
    detailsDatalist: {
        marginTop: 18,
    },
    dataListLastItem: {
        borderBottomWidth: 0,
    },
    total: {
        textAlign: 'right',
        marginBottom: 12,
    },
    note: {
        textAlign: 'right',
        color: Colors.orange2,
        fontSize: 12,
        lineHeight: 16,
    },
    detailsLink: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        width: '100%',
        marginTop: 20,
    }
})