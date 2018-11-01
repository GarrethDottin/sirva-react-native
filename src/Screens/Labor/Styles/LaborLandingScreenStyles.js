import { StyleSheet } from 'react-native'
import { Images, Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    introWrapper: {
        marginLeft: Variables.largeGutter,
        marginRight: Variables.largeGutter, 
    },
    introTitle: {
        marginBottom: 18,
    },
    introCopy: {
        //marginBottom: -14,
    },
    mainContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: (Variables.smallGutter * 2),
        marginTop: 35,
        marginBottom: 0
    },
    primaryButton: {
        width: '100%',
        minHeight: 40,
        marginTop: 5,
    },
})