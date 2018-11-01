import { StyleSheet } from 'react-native';
import { Colors, Variables } from '../../Theme'

export const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 360,
    shadowColor: Colors.black,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
    backgroundColor: "transparent",
  },
  action: {
    width: "100%",
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
  descriptionText: {
    width: "100%",
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.xxxLightGray,
    paddingHorizontal: 35,
  },
  headerImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 140,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  overheadLabel: {
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  overheadSection: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    top: 136,
    elevation: 1,
    zIndex: 1,
  }
})