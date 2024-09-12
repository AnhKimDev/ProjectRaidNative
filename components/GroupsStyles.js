import { StyleSheet } from "react-native";
import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "./../constants/constants";

export default StyleSheet.create({
  groupsText: {
    fontSize: 30,
    color: colors.white,
    marginVertical: 4,
    ...textShadow,
    alignSelf: "center",
    marginBottom: 10,
  },

  groupsContainer: {
    flexGrow: 1,
    padding: 16,
    margin: 4,
    flexShrink: 0,
  },

  groupItem: {
    flexGrow: 1,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "beige",
  },

  groupName: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: colors.white,
    ...textShadow,
  },

  groupMembersContainer: {
    flexDirection: "row",
    maxHeight: 100,
    overflowX: "scroll",
    overflowY: "hidden",
    overflow: "hidden", // Add this
  },

  groupMemberItem: {
    flexBasis: "15%", // adjust the width to fit your needs
    margin,
    alignItems: "center",
    overflow: "hidden", // add this to hide individual item overflow
  },

  groupMemberImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  groupMemberName: {
    fontSize: 14,
    marginBottom: 10,
    flexBasis: 40, // initial width
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
  },
});
