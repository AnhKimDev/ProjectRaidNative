import { StyleSheet } from "react-native";
import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "../../constants/constants";

const styles = StyleSheet.create({
  timeContainer: {
    alignItems: "center",
    flexDirection: "row",
    zIndex: 999,
    marginBottom: 10,
  },
  timeLabel: {
    fontSize: 16,
    marginRight: 10,
    color: colors.white,
  },
  pickerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    color: colors.white,
    backgroundColor: colors.primary,
    flexDirection: "row",
    padding,
    borderRadius,
    margin,
  },
  hourText: {
    fontSize: 16,
    color: colors.white,
    ...textShadow,
  },
  minuteText: {
    fontSize: 16,
    color: colors.white,
    ...textShadow,
  },
});

export default styles;
