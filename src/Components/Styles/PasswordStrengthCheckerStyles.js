import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20,
    },
    passwordToggle: {
        position: 'absolute',
        bottom: 14,
        right: 8,
        width: 16,
        height: 14
    },
    passwordStrengthWrapper: {
        marginTop: 10,
        paddingBottom: 24,
        position: 'relative',
    },
    passwordStrengthBar: {
        height: 4,        
        borderRadius: 2,
        backgroundColor: Colors.xxLightGray,
        marginBottom: 6,        
    },
    innerPasswordStrengthBar: {
        height: 4,
        borderRadius: 2,
        width: 0
    },
    strengthDescriptionWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',        
    },
    strengthDescriptionIcon: {
        width: 16,
        height: 16,
        paddingLeft: 7,
        paddingTop: 4,
        borderRadius: 8,
        marginRight: 8,
        backgroundColor: Colors.lightBlue,      
    },
    strengthDescriptionIconImage: {
        width: 2,
        height: 8,
        resizeMode: 'center',    
    },
    strengthDescription: {
        fontFamily: Variables.baseFont,
        fontSize: 12,
        lineHeight: 16,        
        color: Colors.lightGray,
    },
    modalContent: {
        flexGrow: 1,
        padding: Variables.largeGutter,
        paddingBottom: 0,
        marginLeft: Variables.smallGutter,
        marginRight: Variables.smallGutter,
        backgroundColor: Colors.white,
        borderRadius: 6,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowColor: Colors.black,
        shadowOffset: { height: 0, width: 0 },
    },
    modalTitle: {
        marginBottom: 18,
    },
    modalLink: {
        alignSelf: 'flex-end',
        marginTop: 43,
    },
})