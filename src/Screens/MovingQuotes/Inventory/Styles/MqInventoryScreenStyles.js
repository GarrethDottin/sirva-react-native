import { StyleSheet } from 'react-native'
import { Colors, Variables} from '../../../../Theme'

export default StyleSheet.create({
    screenHeader: {
        marginHorizontal: 20,
        marginVertical: 30
    },
    roomList: {
        padding: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardStyles: {
        shadowColor: 'transparent',
        backgroundColor: Colors.white,
        height: 60,
        borderRadius: 0,
        marginTop: 0,
        borderBottomColor: Colors.xxLightGray,
        borderBottomWidth: 1
        //justifyContent: 'space-between'
    },
    firstCard: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    onlyCard: {
        borderRadius: 6
    },
    lastCard: {
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderBottomWidth: 0
    },
    cardContents: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center'
    },
    roomName: {
        color: Colors.lightBlue,
        fontWeight: Variables.weightBold
    },
    itemCount: {
        color: Colors.lightGray,
        fontSize: 12,
        marginLeft: 'auto',
        marginRight: 12
    }
});
/*
const styles = StyleSheet.create({
    button: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
        alignSelf: 'stretch' 
    },
    addItem: {
        flex: 1,
        alignSelf: 'flex-end',
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 0
    }
  });*/