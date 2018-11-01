import { StyleSheet } from 'react-native'
import { Colors,Variables } from '../../Theme'

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 30,
        justifyContent: "space-around",
        height: 26,
        paddingHorizontal: 35,
        borderBottomWidth: 1,
        borderColor: Colors.xxLightGray,
        minWidth:'100%'
    },
    notselectedItem:{
        fontWeight: 'normal'
    },
    selectedItem:{
        fontWeight:Variables.weightBold
    },
    selectedOption: {
        borderBottomWidth: 2,
        marginHorizontal: 15,
        borderColor:'transparent'
    },
    notSelectedOption: {
        borderBottomWidth: 0,
        marginHorizontal: 15,
    },
    link: {
        fontSize: 12,
        fontWeight: Variables.weightBold,
        lineHeight: 16,
        letterSpacing:1,
    }
})