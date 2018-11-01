import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export const styles = StyleSheet.create({
    flag: {
        marginTop: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    icon: {
        width: 12,
        height: 15
    },
    copy: {
        color: Colors.neonTeal,
        fontWeight: Variables.weightBold,
        fontSize: 12,
        marginLeft: 5
    }
});