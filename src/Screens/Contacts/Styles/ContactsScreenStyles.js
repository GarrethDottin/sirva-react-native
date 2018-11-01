import { StyleSheet } from 'react-native'
import { Images, Colors, Variables} from '../../../Theme'

export default StyleSheet.create({
    scrollWrapper: {
        paddingBottom: 20
    },
    card: {
        marginTop: 20
    },
    cardHeaderContainer: {
        minHeight: 40,
        backgroundColor: Colors.lightGray,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        paddingHorizontal: 22,
        paddingTop: 14,
        paddingBottom: 12
    },
    cardHeader: {
        color: Colors.white,
    },
    avatar: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 9
    },
    avatarPic: {
        width: 77,
        height: 77,
        borderRadius: 38.5
    },
    cardContent: {
        backgroundColor: '#4a4a4a',
        opacity: 0.85,
        paddingHorizontal: 22,
        paddingTop: 22,
        paddingBottom: 40
    },
    cardName: {
        color: Colors.white
    },
    cardLocation: {
        color: Colors.white,
        paddingBottom: 40
    },
    smallText: {
        color: Colors.white,
        fontSize: 12,
        maxWidth: 200
    },
    contactActionContainer: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    contactAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 22,
    },
    lastAction: {
        borderTopColor: Colors.xxLightGray,
        borderTopWidth: 1,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },
    contactActionCopy: {
        color: Colors.lightBlue,
        fontWeight: Variables.weightBold
    },
    emailIcon: {
        width: 17,
        height: 15
    },
    phoneIcon: {
        width: 17,
        height: 20
    },
    hrCardContent: {
        backgroundColor: Colors.white
    },
    hrCardName: {
        color: Colors.darkGray
    },
    hrCardLocation: {
        color: Colors.darkGray
    },
    hrSmallText: {
        color: Colors.darkGray
    },
    hrDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    hrLogo: {
        width: 100,
        height: 25,
        resizeMode: 'contain',
    },
    
});