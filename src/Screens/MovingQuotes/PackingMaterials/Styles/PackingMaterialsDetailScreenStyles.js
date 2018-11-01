import { StyleSheet } from 'react-native'
import { Colors, Variables } from '../../../../Theme'

export const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 37,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 1
  },
  image: {
    width: 110,
    height: 110
  },
  header: {
    paddingTop: 10,
    fontSize: 20
  },
  labelContainer: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    backgroundColor: Colors.xxLightGray,
    position: "absolute",
    top: 30,
    right: 35,
    borderRadius: 12,
    height: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontFamily: Variables.baseFont,
    fontSize: 12,
    textAlign: "center",
    padding: 0,
    margin: 0
  },
  childContainer: {
    flex: 1,
    width: "100%",
    paddingVertical: 25,
  },
  description: {
    paddingVertical: 25,
  },
  detailHeader: {
    paddingBottom: 14,
    color: Colors.darkGray
  },
  detailItem: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row'
  },
  itemDescription: {
    fontSize: 15
  },
  itemDimension: {
    fontSize: 12,
    alignContent: 'flex-end'
  }
});