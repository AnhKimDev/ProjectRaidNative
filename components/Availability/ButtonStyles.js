// components/ButtonStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  button: {
    backgroundColor: "#3498DB",
    padding: 16,
    borderRadius: 8,
  },
  buttonTextStyle: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default styles;
