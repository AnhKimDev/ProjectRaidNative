// components/HeaderStyles.js
import { StyleSheet } from "react-native";
import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "../../constants/constants";

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3C4C6C",
    borderRadius: 20,
    marginTop: 20,
    borderColor: "#000000",
    borderWidth: 1,
  },
  arrowButton: { padding: 8, borderRadius: 8 },
  arrowText: { fontSize: 24, color: "#FFFFFF", ...textShadow },
  dateText: {
    fontSize: 24,
    color: "#FFFFFF",
    paddingHorizontal: 16,
    ...textShadow,
  },
});

export default styles;
