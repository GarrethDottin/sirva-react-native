import { StyleSheet } from 'react-native'
import { Images, Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    wrapper: {
        paddingLeft: Variables.largeGutter,
        paddingRight: Variables.largeGutter, 
        paddingTop: 32,
    },
    introTitle: {
        marginBottom: 20,
    },
    dataListLastItem: {
        borderBottomWidth: 0,
    },    
    total: {
        textAlign: 'right',
        marginBottom: 13,
    },
    totalNote: {
        color: Colors.orange2,
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'right',
    },
    sectionHeaderWrapper: {
        marginTop: 24,
        marginBottom: -30,
        marginLeft: Variables.smallGutter,
        marginRight: Variables.smallGutter,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter, 
        backgroundColor: 'rgba(0, 0, 0, 0.03)', 
        borderRadius: 6,      
    },
    sectionHeader: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: Variables.weightBold,
    },
    note: {
        marginTop: 30,
        paddingLeft: Variables.largeGutter,
        paddingRight: Variables.largeGutter, 
        color: Colors.lightGray,
        fontSize: 12,
        lineHeight: 16,
        textAlign:'center',
    },
    completeMessage: {
        backgroundColor: 'rgba(161,158,158,0.7)',
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: Variables.weightBold,
        color: Colors.white,
        paddingVertical: 12,
    },
})