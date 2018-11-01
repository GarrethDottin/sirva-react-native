import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleStyle:{
        marginBottom:5,
        marginTop:5
    },
    subCard: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 15,
    },
    cardBorder: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: Colors.xLightGray
    },
    mainContainerBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.xLightGray
    },
    subStyle:{
        fontWeight: 'normal',
        fontFamily: Variables.baseFont,
        letterSpacing: 0
    }
});
