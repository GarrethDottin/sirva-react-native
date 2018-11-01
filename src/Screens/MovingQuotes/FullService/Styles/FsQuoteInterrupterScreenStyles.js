import { StyleSheet } from 'react-native'
import images from '../../../../Theme/Images'
import colors from '../../../../Theme/Colors'
import variables from '../../../../Theme/Variables'

export default StyleSheet.create({
    mainContent: {
        marginTop: 30
    },
    header: {
        marginBottom: 10
    },
    iconListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40
    },
    listItemText: {
        flex: 1,
        marginLeft: 30,
        fontWeight: variables.weightBold
    },
    buttonSet: {
        marginBottom: 10
    }
});