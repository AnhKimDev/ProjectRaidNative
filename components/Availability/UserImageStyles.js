// components/UserImageStyles.js
import { StyleSheet } from "react-native";
import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "../../constants/constants";

const styles = StyleSheet.create({
  userImage: {
    flexGrow: 1,
    margin: 4,
  },
  userImagePlaceholder: {
    flexBasis: "10%",
    flexGrow: 1,
    margin: 4,
    borderRadius: 50,
    aspectRatio: 1,
    borderWidth: 2,
    fontSize: 30,
    borderColor: "black",
    backgroundColor: "#333333",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
