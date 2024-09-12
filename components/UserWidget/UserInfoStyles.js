import { StyleSheet } from "react-native";
import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "../../constants/constants";

export default StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    textShadowColor: colors.black,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },

  profilePicture: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: colors.black,
    alignSelf: "center",
    justifyContent: "center",
  },
  userInfoContainer: {
    flexGrow: 1,
    marginBottom: 10,
    overflow: "hidden",
    alignItems: "center",
  },
});
