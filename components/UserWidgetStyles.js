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
  mainContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.secondary,
  },

  container: {
    flexGrow: 1,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 20,
    margin: 4,
    borderColor: colors.black,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    maxHeight: 600,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    textShadowColor: colors.black,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },

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
    maxHeight: 100,
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
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  groupMemberItem: {
    marginRight: 10,
    marginBottom: 10,
  },

  groupMemberImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },

  groupMemberName: {
    flexGrow: 1,
    fontSize: 14,
    marginBottom: 10,
    maxWidth: 40,
    alignSelf: "center",
    textAlign: "center",
  },

  profilePicture: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: colors.black,
    alignSelf: "center",
    justifyContent: "center",
  },

  upcomingEventsContainer: {
    flexGrow: 1,
    padding: 16,
    margin: 4,
    borderRadius: 8,
    maxHeight: 400,
  },

  upcomingEventsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    textShadowColor: colors.black,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    marginBottom: 10,
  },

  eventItem: {
    flexGrow: 1,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "beige",
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  eventDate: {
    fontSize: 16,
    color: "#666",
  },

  userInfoContainer: {
    flex: 1,
    marginBottom: 20,
    overflow: "hidden",
  },
  eventsContainer: {
    flexGrow: 1,
    flexWrap: "no-wrap",
    paddingHorizontal: 16, // Add horizontal padding
    paddingVertical: 8, // Add vertical padding
    backgroundColor: colors.primary,
    borderRadius: 8,
    maxHeight: 400,
    overflow: "hidden",
  },
});
