import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export default StyleSheet.create({
    container: {
        marginTop: 40,
        alignItems: 'center'
    },
    intro: {
        alignItems: 'center'
    },
    avatar: {
        width: 160,
        height: 160,
        resizeMode: 'cover',
        borderRadius: 80,
        marginBottom: 20
    },
    subheader: {
        fontSize: 12,
        color: Colors.darkGray,
        marginTop: 5,
        marginBottom: 32
    },
    callButton: {
        minHeight: 40,
        minWidth: '100%'
    },
    bottomCallButton: {
        marginTop: 40,
        marginBottom: 60
    },
    infoSection: {
        alignSelf: 'flex-start',
        marginTop: 42
    },
    sectionHeader: {
        color: Colors.darkGray,
        marginBottom: 14
    },
    contactAction: {
        width: '100%', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.xxLightGray,
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 15
    },
    contactActionCopy: {
        color: colors.lightBlue
    },
    phone: {
        width: 17,
        height: 20
    },
    email: {
        width: 17,
        height: 15
    },
    externalLink: {
        width: 16,
        height: 19
    },
    linkedin: {
        width: 17,
        height: 13
    },
    twitter: {
        width: 17,
        height: 13
    },
    facebook: {
        width: 10,
        height: 16
    },
    instagram: {
        width: 16,
        height: 17
    },
});