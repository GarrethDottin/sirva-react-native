import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    illustration: {
        width: 272,
        height: 247,
        resizeMode: 'center',
        marginTop: 50,
    },
    title: {
        textAlign: 'center',
    },
    copy: {
        textAlign: 'center',
        marginTop: 12,
    },
    swipeCopy: {
        color: Colors.lightGray,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: Variables.weightBold,  
        letterSpacing: 1,
        textAlign: 'center',
        marginTop: 76,
        width: '100%'
    },
    button: {
        width: '100%',
    },
    outerContainer: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center',
        paddingBottom: 12,
        paddingTop: 24,
        width: '100%',        
    },
    sliderContainer: {
        flexGrow: 1,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
    sliderInner: {
        width: '400%',
        position: 'absolute',
        left: 0,
        flex: 1,
        flexDirection: 'row',
    },
    slide: {
        width: '25%',
    },
    bottomWrapper: {
        width: '100%',
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
    }
});