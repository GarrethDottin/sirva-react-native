import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../Theme'

export const styles = StyleSheet.create({
    card: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 1,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 25,
        paddingVertical: 25,
        borderRadius: 6

    },
    icon: {
        width: 33,
        height: 41
    },
    copy: {
        color: Colors.neonTeal,
        fontWeight: Variables.weightBold,
        marginLeft: 25
    }
});