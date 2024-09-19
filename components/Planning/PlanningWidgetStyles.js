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
  gridContainer: {
    padding,
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius,
    borderColor: colors.black,
    borderWidth: 1,
  },
  dayColumn: {
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
  hourColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flex: 1,
  },
  leftbufferCell: {
    ...styles.cell,
    margin,
    fontSize: 30,
  },
  lefthourCell: {
    ...styles.cell,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    color: colors.white,
    textAlign: "center",
    ...textShadow,
  },
  weekdaysCell: {
    ...styles.cell,
    fontSize: 20,
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
  green: { backgroundColor: colors.green },
  yellow: { backgroundColor: colors.yellow },
  red: { backgroundColor: colors.red },
  dayHourColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
    flexGrow: 1,
  },
  bufferCell: {
    ...styles.cell,
    margin,
    fontSize: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding,
    margin,
    flexGrow: 1,
  },
  button: {
    backgroundColor: colors.blue,
    padding,
    borderRadius,
    margin,
    borderWidth: 2,
    flex: 1,
    flexGrow: 1,
  },
  buttonTextStyle: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
  },
});
