// components/GridStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gridContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: "#3C4C6C",
    borderRadius: 8,
    borderColor: "#000000",
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
    margin: 4,
    fontSize: 30,
  },
  lefthourCell: {
    margin: 4,
    fontSize: 30,
    color: "#FFFFFF",
    textAlign: "center",
  },
  hourCell: {
    borderColor: "#000000",
    borderWidth: 1,
    color: "#FFFFFF",
    textAlign: "center",
    borderRadius: 8,
  },
  userName: {
    flexBasis: "5.5%",
    margin: 4,
    flexGrow: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontSize: 30,
    color: "#FFFFFF",
    borderColor: "black",
  },
});

export default styles;
