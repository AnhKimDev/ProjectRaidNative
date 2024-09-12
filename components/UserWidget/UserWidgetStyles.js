import { StyleSheet } from "react-native";
import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "../../constants/constants";

export default StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: colors.secondary,
  },

  container: {
    backgroundColor: colors.primary,
    padding,
    borderRadius: 20,
    margin,
    borderColor: colors.black,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "column",
  },
});
