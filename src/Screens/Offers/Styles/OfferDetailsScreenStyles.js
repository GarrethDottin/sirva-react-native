import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../Theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center"
  },
  scrollContainer: {
    flex: 1,
    width: "100%"
  },
  logoContainer: {
    width: "100%",
    height: 140,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    marginTop: 27,
    marginBottom: 37
  },
  descriptionContainer: {
    width: "100%",
    backgroundColor: Colors.white,
    marginHorizontal: 17,
    borderRadius: 6,
    shadowColor: Colors.black,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
  },
  text: {
    paddingHorizontal: 21,
    paddingTop: 44,
    paddingBottom: 24
  },
  action: {
    width: "100%",
    flexDirection: 'row',
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
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
  descriptionBox: {
    width: "100%",
    paddingLeft: 17,
    paddingRight: 17,
    alignItems: "center",
    position: "relative"
  },
  labelContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    top: -21,
  },
  label: {
    backgroundColor: Colors.green,
    borderRadius: 21,
    paddingHorizontal: 25,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: Variables.weightBold,
    lineHeight: 0
  },
  finePrintContainer: {
    paddingVertical: 27,
    paddingHorizontal: 37,
    backgroundColor: "transparent"
  },
  finePrintText: {
    color: Colors.lightGray,
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center"
  }
});