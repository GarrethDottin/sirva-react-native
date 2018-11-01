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
  },
  body: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  headerCopy: {
    marginLeft: 15,
    alignSelf: 'flex-end'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  action: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    paddingHorizontal: 25,
    paddingVertical: 12,
    minHeight: 76,
  },
  actionText: {
    fontFamily: Variables.baseFont,
    color: Colors.lightBlue,
    fontSize: 12,
    textAlign: "center"
  },
  actionImage: {
    width: 14,
    height: 20
  },
  labelContainer: {
    position: "absolute",
    top: -12,
    width: "100%",
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#34D9C0"
  },
  labelText: {
    color: Colors.white
  }
});