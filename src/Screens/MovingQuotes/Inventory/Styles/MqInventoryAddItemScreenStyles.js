import { StyleSheet } from 'react-native'
import { Colors, Variables} from '../../../../Theme'

export default StyleSheet.create({
    screen: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: Colors.xxxLightGray
    },
    searchForm: {
        backgroundColor: Colors.lightBlueWithOpacity
    },
    textBox: {
        fontSize: 16,
        marginBottom: 35
    },
    searchResults: {
        backgroundColor: Colors.xxxLightGray,
        paddingTop: 30,
        flex: 1,
        alignSelf: 'stretch'
    },
    searchResultSection: {
        marginBottom: 8
    },
    searchResultItem: {
        borderBottomColor: Colors.xxLightGray,
        borderBottomWidth: 1
    },
    itemName: {
        lineHeight: 46,
    },
    searchResultSeparator: {
        marginTop: 25
    }
});
