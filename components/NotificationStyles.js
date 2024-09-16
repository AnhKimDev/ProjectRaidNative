import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "../constants/constants";

export default {
  notificationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  notification: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  notificationDescription: {
    fontSize: 16,
    color: "#fff",
  },
  notificationDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  notificationDate: {
    fontSize: 16,
    color: "#fff",
  },
  notificationTime: {
    fontSize: 16,
    color: "#fff",
  },
  notificationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  notificationButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  notificationButtonText: {
    fontSize: 16,
    color: "#fff",
  },
};
