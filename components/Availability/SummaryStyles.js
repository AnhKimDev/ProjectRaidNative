// components/SummaryStyles.js
import { StyleSheet } from "react-native";
import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "../../constants/constants";

const styles = StyleSheet.create({
  summaryContainer: { marginVertical: 10 },
  summaryText: {
    borderColor: colors.black,
    margin,
    borderWidth: 1,
    paddingVertical: 8,
    fontSize: 18,
    color: colors.white,
    textAlign: "center",
    backgroundColor: colors.primary,
    borderRadius,
    ...textShadow,
  },
});

export default styles;
