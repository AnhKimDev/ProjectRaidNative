import { StyleSheet } from "react-native";

import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "../../constants/constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius,
    padding: padding,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    padding: 24,
    borderWidth: 5,
    borderRadius: borderRadius,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.white,
    textAlign: "center",
    ...textShadow,
  },
  input: {
    height: 40,
    borderColor: colors.black,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.white,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 16,
    marginRight: 10,
    color: colors.white,
  },
  dateValue: {
    fontSize: 16,
    color: colors.white,
  },
  timeContainer: {
    alignItems: "center",
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
    width: "100%",
  },
  picker: {
    width: "45%",
  },
  button: {
    backgroundColor: colors.blue,
    padding: padding,
    borderRadius: borderRadius,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  centeredContainer: {
    justifyContent: "center",
    flex: 1,
  },

  scrollView: {
    paddingHorizontal: 20,
  },
});

export default styles;
