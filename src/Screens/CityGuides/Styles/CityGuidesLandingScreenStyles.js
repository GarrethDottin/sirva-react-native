import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    firstContainer: {
        backgroundColor: 'rgba(59, 115, 230, 1)',
    },
    introView: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop: 15,
    },
    introCard: {
        flex: 1,
        paddingHorizontal: Variables.smallGutter * 1.5,
        paddingTop: 15,
        flexDirection: 'column'
    },
    formWrapper: {
        paddingBottom: 2,
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
    },
    cityImageDay: {
        flex: 1,
        height: 200,
        width: '100%'
    },
    cityImageNight: {
        flex: 1,
        height: 180,
        width: '100%',
        paddingHorizontal: Variables.smallGutter * 1.7
    },
    titleStyle:{
        fontWeight:'normal',
        fontFamily:Variables.baseFont,
        letterSpacing: 0
    },
    secondContainer: {
        paddingHorizontal: Variables.smallGutter,
        marginBottom:120
    },
    child: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.60)',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    children: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.60)',
    }
});
