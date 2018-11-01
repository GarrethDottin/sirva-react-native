import { StyleSheet } from 'react-native'
import images from '../../../Theme/Images'
import Colors from '../../../Theme/Colors'
import Variables from '../../../Theme/Variables'

// @ts-ignore
export default StyleSheet.create({
    introCard: {
        paddingHorizontal: Variables.smallGutter * 2,
        backgroundColor: 'rgba(6, 90, 244, 0.75)',
        paddingVertical: 25,
        flexDirection: 'row'
    },
    mainContainer: {
        paddingHorizontal: Variables.smallGutter * 2,
        backgroundColor: Colors.white,
        paddingVertical: 20,
        flex: 1,
    },
    houseIcon2: {
        marginRight: 15,
        width: 23,
        height: 23,
        paddingBottom: 2
    },
    primaryButton: {
        width: '100%',
        minHeight: 40,
        marginTop: 9,
    },
    buttonContainer: {
        paddingTop: 20,
    },
    subContainer: {
        marginBottom: 15,
    },
    formWrapper: {
        paddingBottom: 2,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 1,
    },
    checkListTitle: {
        marginBottom: 0
    },
    travelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    clockIcon: {
        marginRight: 15,
        width: 23,
        height: 23,
    },
})
