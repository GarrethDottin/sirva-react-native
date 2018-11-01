import {
    StyleSheet
} from 'react-native'
import {
    Colors,
    Variables
} from '../../Theme'

export default StyleSheet.create({
    iconRows: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    buttonArea: {
        flexGrow: 1,
        flexBasis: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    selectableArea: {
        height: 48,
        width: "100%",
        backgroundColor: Colors.lightBlue,
        alignItems: "center",
        justifyContent: "center"
    },
    selectableAreaSelected: {
        backgroundColor: Colors.white,
    },
    leftEdgeButton: {
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
    },
    rightEdgeButton: {
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
    },
    labelText: {
        color: Colors.offwhite,
        fontFamily: Variables.baseFont,
        fontWeight: Variables.weightBold,
        fontSize: 15,
        marginTop: 5,
    },
    buttonText: {
        color: Colors.white,
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightBold,
        fontSize: 15,
    },
    buttonTextSelected: {
        color: Colors.lightBlue,
    }
})