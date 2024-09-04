import { StyleSheet } from "react-native";

const colors = {
  primary: "#3C4C6C",
  secondary: "#191970",
  white: "#FFFFFF",
  black: "#000000",
  green: "#2ECC71",
  yellow: "#FFF000",
  red: "#E74C3C",
  blue: "#3498DB",
};

const textShadow = {
  textShadowColor: "black",
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 2,
};

const borderRadius = 8;
const padding = 16;
const margin = 4;

const styles = {
  cell: {
    width: 40,
    height: 40,
    margin,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default StyleSheet.create({
  mainContainer: { backgroundColor: colors.secondary, flex: 1, padding: 24 },
  header: {
    padding,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginTop: 20,
    borderColor: colors.black,
    borderWidth: 1,
  },
  arrowButton: { padding: padding / 2, borderRadius },
  arrowText: { fontSize: 24, color: colors.white },
  dateText: {
    fontSize: 24,
    color: colors.white,
    paddingHorizontal: padding,
    ...textShadow,
  },
  summaryContainer: { padding, borderRadius, marginBottom: 16 },
  textInput: {
    height: "auto",
    borderColor: colors.black,
    borderWidth: 1,
    paddingHorizontal: padding,
    paddingVertical: 8,
    fontSize: 18,
    color: colors.white,
    textAlign: "center",
    backgroundColor: colors.primary,
    borderRadius,
    marginTop: 10,
    ...textShadow,
  },
  gridContainer: {
    padding,
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius,
    borderColor: colors.black,
    borderWidth: 1,
  },
  userColumn: { flexDirection: "row", marginBottom: 16, marginLeft: 45 },
  hourColumn: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  lefthourCell: {
    ...styles.cell,
    fontSize: 25,
    color: colors.white,
    textAlign: "center",
    ...textShadow,
  },
  hourCell: {
    ...styles.cell,
    borderColor: colors.black,
    borderWidth: 1,
    fontSize: 18,
    color: colors.white,
    textAlign: "center",
    borderRadius,
  },
  userName: {
    ...styles.cell,
    minWidth: 40,
    maxWidth: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: colors.white,
    ...textShadow,
  },
  green: { backgroundColor: colors.green },
  yellow: { backgroundColor: colors.yellow },
  red: { backgroundColor: colors.red },
  highlighted: {
    backgroundColor: colors.green,
    borderWidth: 2,
    borderColor: colors.black,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding,
  },
  button: { backgroundColor: colors.blue, padding, borderRadius },
  userImage: { width: 40, height: 40, margin },
  buttonTextStyle: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  userImagePlaceholder: {
    width: 40,
    height: 40,
    margin: 4,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
  },
});
