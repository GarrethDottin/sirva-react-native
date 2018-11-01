import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    backgroundStyles: {
        //padding: 0
    },
    header: {
        color: Colors.white
    },
    tabNav: {
        marginBottom: 0
    },
    protip: {
        marginLeft: 0,
        marginRight: 0
    },
    introCard: {
        paddingTop: 30
    },
    originWrapper: {
        paddingBottom: 2,
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
    },
    formWrapper: {
        paddingBottom: 2,
        marginTop: -30
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedAddress: {
        fontFamily: Variables.baseHeaderFont,
        fontWeight: Variables.weightSemiBold,
        fontSize: 24,
        lineHeight: 28,
        color: Colors.offwhite
    },
    editIcon: {
        marginLeft: 'auto',
        width: 17,
        height: 17
    },

    agentsWrapper: {
        marginTop: 30
    },
    agentsHeader: {
        marginBottom: 6
    },
    agentList: {
        marginHorizontal: Variables.smallGutter
    },
    agentCard: {
        marginTop: 20,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 6
    },
    agentInfo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    agentName: {
        color: Colors.darkGray
    },
    agentExperience: {
        fontSize: 12
    },
    agentCities: {
        fontSize: 12,
        color: Colors.lightGray,
        marginTop: 20
    },
    avatar: {
        width: 77,
        height: 77,
        resizeMode: 'cover',
        borderRadius: 38.5
    }
});
