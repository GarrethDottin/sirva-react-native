import { StyleSheet, Dimensions } from 'react-native'
import { Images, Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 21,
        marginHorizontal: 38,
        flex: 1
    },
    locationPin: {
        width: 13,
        height: 18,
        resizeMode: 'contain',
        marginRight: 6,
        alignSelf: 'center'
    },
    origin: {
        marginTop: 5,
        marginRight: 7,
        maxWidth: 85
    },
    arrow: {
        width: 27,
        height: 13,
        resizeMode: 'contain',
        marginTop: 9,
        marginRight: 6,
    },
    destination: {
        flexGrow: 1,
        marginTop: 5,
        marginRight: 6,
        maxWidth: 85
    },
    days: {
        fontSize: 12,
        marginTop: 4,
        borderColor: Colors.xxLightGray,
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 8,
        paddingRight: 8,
        alignSelf: 'center'
    },
    verticalLine: {
        borderColor: Colors.xxLightGray,
        borderLeftWidth: 2,
        marginLeft: 44,
    },
    movingWrapper: {
        paddingLeft: 46,
        paddingRight: 46,
        paddingBottom: 38,
        paddingTop: 20,
        backgroundColor: Colors.white,
        borderRadius: 6,        
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowColor: Colors.black,
        shadowOffset: { height: 0, width: 0 },
        position: 'relative',
        marginLeft: Variables.smallGutter,
        marginRight: Variables.smallGutter,
    },
    housingWrapper: {
        paddingLeft: 15,
        paddingRight: 46,
        paddingBottom: 38,
        paddingTop: 20,
        position: 'relative',
        marginLeft: 44,
        marginRight: Variables.smallGutter,
        borderLeftWidth: 2,
        borderColor: Colors.xxLightGray
    },
    panelSubtitle: {
        color: Colors.lightBlue,
        marginBottom: 27,
    },
    panelTitle: {
        color: Colors.darkGray,
        marginBottom: 10,
    },
    panelCopy: {
        marginBottom: 21,
    },
    panelButton: {
        minHeight: 40,
        minWidth: 130,
        paddingLeft: 20,
        paddingRight: 20,
    },
    circle: {
        borderColor: Colors.yetAnotherGray,
        backgroundColor: Colors.white,
        borderWidth:2,
        width: 18,
        height: 18,
        borderRadius: 9,
        position: 'absolute',
        top: 18,
        left: 21,
    },
    housingCircle: {
        left:-10,
    },
    introPanel: {
        paddingTop: 35,
        paddingBottom: 21,
    },
    introPanelCopyWrapper: {
        paddingLeft: Variables.largeGutter,
        paddingRight: Variables.largeGutter,
    },
    introPanelTitle: {
        color: Colors.white,
        marginBottom: 7,
    },
    introPanelCopy: {
        color: Colors.white,
        marginBottom: -7,
    }
})