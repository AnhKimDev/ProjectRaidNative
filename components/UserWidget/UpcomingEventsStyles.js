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
