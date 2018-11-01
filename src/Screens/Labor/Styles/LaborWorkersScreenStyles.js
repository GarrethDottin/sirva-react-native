import { StyleSheet } from 'react-native'
import { Images, Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    introWrapper: {
        marginLeft: Variables.largeGutter,
        marginRight: Variables.largeGutter,
        paddingTop: 32,
    },
    dropdownWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:7,
    },
    dropdown: {
        width:120,
    },
    dropdownLabel: {
        marginTop:38,
    },
    calculationLnk: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    calculationLinkText: {
        fontSize:12,
        fontWeight: 'normal',
    },
    cardCopy: {
        fontWeight: Variables.weightSemiBold,
        fontFamily: Variables.baseFont
    },
    cardLabelCopy:{
        fontWeight: Variables.weightBold,
        fontFamily: Variables.baseFont
    },
    cardWrapper: {
        marginLeft: Variables.smallGutter,
        marginRight: Variables.smallGutter,
    },
    buttonWrapper: {
        marginLeft: Variables.largeGutter,
        marginRight: Variables.largeGutter,
        paddingTop: 40,
    },
    button: {
        width: '100%',
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    modalTitle: {
        marginBottom: 21,
    },
    modalCopy: {

    },
    modalNav: {

    },
    table: {
        borderTopWidth: 1,
        borderColor: Colors.xxLightGray,
        marginTop: -5,
        marginBottom: 140,
        flexGrow: 1,
    },
    tableRow: {
        borderBottomWidth: 1,
        borderColor: Colors.xxLightGray,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    tableCell1: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: Colors.xxLightGray,
        flexBasis: '66%',
        flex: 1,
        justifyContent: 'center'
    },
    tableCell2: {
        borderRightWidth: 1,
        borderColor: Colors.xxLightGray,
        flexBasis: '34%',
        flex: 1,
        justifyContent: 'center'
    },
    tableCellContent: {
        fontSize: 12,
        lineHeight: 16,
        padding: 10,
    }

})
