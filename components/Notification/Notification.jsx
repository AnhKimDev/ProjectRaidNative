import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import notificationStyles from "./NotificationStyles";

const Notification = ({
  title,
  description,
  passedDate,
  startTime,
  endTime,
}) => {
  return (
    <View style={notificationStyles.notificationContainer}>
      <View style={notificationStyles.notification}>
        <Text style={notificationStyles.notificationTitle}>{title}</Text>
        <Text style={notificationStyles.notificationDescription}>
          {description}
        </Text>
        <View style={notificationStyles.notificationDetails}>
          <Text style={notificationStyles.notificationDate}>
            {passedDate.toLocaleDateString()}
          </Text>
          <Text style={notificationStyles.notificationTime}>
            {startTime.getHours().toString().padStart(2, "0")}:
            {startTime.getMinutes().toString().padStart(2, "0")} -{" "}
            {endTime.getHours().toString().padStart(2, "0")}:
            {endTime.getMinutes().toString().padStart(2, "0")}
          </Text>
        </View>
        <View style={notificationStyles.notificationButtons}>
          <TouchableOpacity
            style={notificationStyles.notificationButton}
            onPress={() => console.log("Confirm")}
          >
            <Text style={notificationStyles.notificationButtonText}>
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={notificationStyles.notificationButton}
            onPress={() => console.log("Decline")}
          >
            <Text style={notificationStyles.notificationButtonText}>
              Decline
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Notification;
