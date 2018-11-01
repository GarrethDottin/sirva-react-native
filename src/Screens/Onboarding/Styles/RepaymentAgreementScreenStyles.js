import { StyleSheet } from 'react-native'
import { Images, Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    outerContainer: {
        paddingLeft:0,
        paddingRight:0,
    },
    scrollWrapper: {
        width: '100%',
        paddingBottom: 16,
        marginBottom: 84,
    },
    scrollInner: {
        paddingBottom: 84
    },
    introWrapper: {
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
    },
    introCopy: {
        textAlign:'center',
        marginTop: 58,
        marginBottom: -3,
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
    },
    jobTitle: {
        textAlign:'center',
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
        marginBottom: 32,
    },
    summaryTopWrapper: {
        backgroundColor: Colors.xxxLightGray,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 17,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    summaryEmployerSubtitle: {
        color: Colors.darkGray,
    },
    summaryEmployerName: {
        //marginBottom: -14,
        marginTop: 4
    },
    summaryEmployerAddress: {
        fontSize: 12,
        lineHeight: 16,
        color: Colors.lightGray,
        marginBottom:10
    },
    summaryDateSubtitle: {
        color: Colors.darkGray,
        textAlign: 'right',
        lineHeight: 18,
    },
    summaryEmployerWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    summaryDateWrapper: {
        display: 'flex',
        flexDirection: 'column',        
    },
    colorBar: {
        height: 130,
        width: '100%',
    },
    summaryBottomWrapper: {
        backgroundColor: Colors.white,
        marginTop: -130,
        marginLeft: Variables.smallGutter,
        marginRight: Variables.smallGutter,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderColor: Colors.xxLightGray,
        borderTopWidth: 1,
        paddingTop: 43,
        paddingBottom: 45,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: Colors.black,
        shadowOffset: { height: 4, width: 0 },
        marginBottom: 20,
    },
    summaryAmount: {
        fontSize: 40,    
        lineHeight: 48,    
        textAlign: 'center',
        marginBottom: 3,
    },
    summaryCopy: {
        textAlign: 'center',
    },
    contractWrapper: {
        marginLeft: Variables.largeGutter,
        marginRight: Variables.largeGutter,
        paddingTop: 25,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 84,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        paddingLeft: Variables.largeGutter,
        paddingRight: Variables.smallGutter,
        paddingTop:12,
    },
    buttonCopy: {
        fontSize: 12,
        lineHeight: 16,
        marginTop:10,
    },
    button: {
        width: 115,
        minWidth: 0,
    }
})

export const htmlStyles = StyleSheet.create({
    b: {
        fontWeight: 'bold',
    },
    strong: {
        fontWeight: 'bold',
    },
    p: {
        marginBottom: -50,
    },
    ol: {
        marginLeft: Variables.smallGutter,
        marginBottom: -50,
    },
})