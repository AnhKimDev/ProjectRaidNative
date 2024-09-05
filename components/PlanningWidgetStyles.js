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
const margin = 4; // adjusted margin to add more space between cells

const cell = {
  flexBasis: "10%",
  margin,
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
};

const whiteCenteredText = {
  color: colors.white,
  textAlign: "center",
};

const cellWithWhiteText = {
  ...cell,
  ...whiteCenteredText,
};

const bufferCell = {
  ...cellWithWhiteText,
  flexBasis: "7%", // same width as hourCellLeft and lefthourCell
  fontSize: 18,
  borderRadius: 8,
  borderColor: "transparent",
  borderWidth: 0,
};

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.secondary,
  },
  header: {
    padding,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    borderColor: colors.black,
    borderWidth: 1,
  },
  gridContainer: {
    padding,
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius,
    borderColor: colors.black,
    borderWidth: 1,
  },
  hourCellLeft: {
    ...cellWithWhiteText,
    flexBasis: "7%", // reduced flex basis to reduce width
    fontSize: 18,
    borderRadius: 8,
    borderColor: "transparent",
    borderWidth: 0,
    marginLeft: -5,
  },
  lefthourCell: {
    ...cellWithWhiteText,
    flexBasis: "7%", // reduced flex basis to reduce width
    fontSize: 20,
    ...textShadow,
  },
  hourCell: {
    ...cellWithWhiteText,
    fontSize: 18,
    borderRadius: 8,
    borderColor: colors.black,
    borderWidth: 1,
    margin: 4,
    aspectRatio: 1,
  },
  bufferCell: {
    flexBasis: "7%", // reduced flex basis to reduce width
    fontSize: 18,
    borderRadius: 8,
    borderColor: "transparent",
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding,
  },
  button: { backgroundColor: colors.blue, padding, borderRadius },
  buttonTextStyle: {
    justifyContent: "space-between",
    color: "white",
    ...textShadow,
  },
  dayColumn: {
    ...cellWithWhiteText,
    flexBasis: "7%",
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    fontSize: "auto",
  },
  arrowButton: {
    padding: 8,
    borderRadius: 8,
  },
  arrowText: {
    fontSize: 24,
    color: colors.white,
  },
  dateText: {
    fontSize: 24,
    color: colors.white,
  },
});
