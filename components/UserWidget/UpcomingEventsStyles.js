import { StyleSheet } from "react-native";
import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "../../constants/constants";

export default StyleSheet.create({
  upcomingEventsContainer: {
    flexGrow: 1,
    padding: 16,
    margin: 4,
    borderRadius: 8,
    maxHeight: 300,
    overflow: "hidden",
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "beige",
    flexDirection: "column",
    flex: 1,
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1, // Add this to make the event title take up the available space
  },

  eventDate: {
    fontSize: 16,
    color: "#666",
    marginRight: 10, // Add some margin to separate the date and time
  },

  eventTime: {
    fontSize: 16,
    color: "#666",
  },

  eventDetailsToggle: {
    fontSize: 16,
    color: "#666",
  },

  eventDetailsContainer: {
    padding: 10,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  eventDetailsText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5, // Add some margin between the details text
  },

  eventDetailsExtension: {
    flexGrow: 1,
  },
});
