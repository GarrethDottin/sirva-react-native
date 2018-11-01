import { StyleSheet } from 'react-native';
import { Colors, Variables } from '../../Theme'

export const styles = StyleSheet.create({
    cardContainer: {
        marginLeft: Variables.smallGutter,
        marginRight: Variables.smallGutter,        
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    action: {
        flexDirection: 'row',
        backgroundColor: Colors.lightBlue,
        justifyContent: 'space-between',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        paddingTop: 15,
        paddingRight: 20,
        paddingBottom: 15,
        paddingLeft: 20,
    },
    actionText: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightBold,
        color: Colors.white,
        fontSize: 16
    },
})