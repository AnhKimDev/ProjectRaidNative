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
    flexGrow: 1,
    aspectRatio: 1,
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
  arrowText: { fontSize: 24, color: colors.white, ...textShadow },
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
  userColumn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "7%",
    flexGrow: 1,
  },
  hourColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "7%",
    flexGrow: 1,
  },
  leftbufferCell: {
    ...styles.cell,
    margin,
    fontSize: 30,
  },
  lefthourCell: {
    ...styles.cell,
    fontSize: 30,
    margin,
    color: colors.white,
    textAlign: "center",
    ...textShadow,
  },
  hourCell: {
    ...styles.cell,
    borderColor: colors.black,
    borderWidth: 1,
    color: colors.white,
    textAlign: "center",
    borderRadius,
  },
  userName: {
    ...styles.cell,
    flexBasis: "5.5%",
    margin: 4,
    flexGrow: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontSize: 30,
    color: colors.white,
    borderColor: "black",
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
  userImage: { flexGrow: 1, margin },
  buttonTextStyle: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  userImagePlaceholder: {
    flexBasis: "10%",
    flexGrow: 1,
    margin,
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
