import colors from './Colors'
import variables from './Variables'

export default forms = {
    textBox: {
        width: '100%',
        height: 40,
        fontFamily: variables.baseFont,
        fontSize: 12,
        fontWeight: variables.weightBold,
        lineHeight: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.xLightGray,
        marginBottom: 45
    },
    buttonSet: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    buttonSetButton: {
        minWidth:0, 
        width:'49%',
    }
}