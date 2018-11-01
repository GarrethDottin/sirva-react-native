import { StyleSheet } from 'react-native'
import images from '../../../../Theme/Images'
import colors from '../../../../Theme/Colors'
import Variables from '../../../../Theme/Variables'

export default StyleSheet.create({
    introWrapper: {
        //marginBottom: 37,
        marginLeft: 20,
        marginRight: 20
    },
    introCopy: {
        fontSize: 24,
        lineHeight: 28,
        color: colors.white
    },
    introButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.white,
        minHeight: 40,
        marginTop: 20,
        alignSelf: 'stretch'
    },
    listItemName: {
        fontSize: 16,
        color: colors.darkGray,
        flex: 1
    },
    listItemCopy: {
        fontSize: 30,
        
        color: colors.darkGray,
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightSemiBold,
        marginLeft: 30,
        marginRight: 10
    },
    h2: {
        marginTop: 26,
        marginBottom: 8
    },
    //Interrupter styles
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
    listCard: {
        paddingTop: 14,
        paddingBottom: 10
    },
    pricing: {
        marginLeft: -10,  
    },
    offerFlag: {
        marginLeft: 30
    },
    listItemText: {
        flex: 1,
        fontWeight: variables.weightBold
    },
    brandLogo: {
        width: 130, 
        height: 51
    },
    buttonSet: {
        marginBottom: 10
    }
});