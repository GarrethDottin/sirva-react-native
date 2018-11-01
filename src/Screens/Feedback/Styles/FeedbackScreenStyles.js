import { StyleSheet } from 'react-native'
import { Variables, Colors } from '../../../Theme'

export const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  inputArea: {
    width: "100%",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderColor: Colors.lightGray,
  },
  inputAreaText: {
    width: "100%",
    height: 250,
    color: Colors.darkGray,
    fontFamily: Variables.baseFont,
    fontSize: Variables.baseSize,
    lineHeight: 20,
    padding: 15,
  },
  feedbackArea: {
    marginTop: 20,
    marginBottom: 0,
    paddingLeft: Variables.smallGutter,
    paddingRight: Variables.smallGutter,
  },
  characterCounter: {
    alignSelf: "flex-end",
    color: Colors.lightGray,
    fontSize: 12,
    marginVertical: 15,
  },
  feedbackDescriptionText: {
    paddingHorizontal: 15,
  }
});
