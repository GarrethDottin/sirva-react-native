import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    // minHeight: "100%",
    alignItems: "flex-start",
    // paddingBottom: 200
  },
  header: {
    paddingHorizontal: 38,
    paddingVertical: 31
  },
  offer: {
      marginBottom: 5,
      marginTop: -20,
      width: '100%'
  },
  rowContainer: {
    // flexWrap: "wrap",
    width: "100%",
    flexDirection: "row",
    // alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  rowItem: {
    width: "50%",
    paddingHorizontal: 10
  }
});
