import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

const HOURS_IN_A_DAY = 24;

const AvailabilityWidget = () => {
  const [date, setDate] = useState(new Date());
  const [availability, setAvailability] = useState([
    { name: "User 1", hours: [8, 9, 10, 11, 12], image: "" },
    { name: "User 2", hours: [9, 10, 11, 12, 13], image: "" },
    { name: "User 3", hours: [10, 11, 12, 13, 14], image: "" },
    { name: "User 4", hours: [11, 12, 13, 14, 15], image: "" },
    { name: "User 5", hours: [12, 13, 14, 15, 16], image: "" },
    { name: "User 6", hours: [13, 14, 15, 16, 17], image: "" },
    { name: "User 7", hours: [14, 15, 16, 17, 18], image: "" },
    { name: "User 8", hours: [15, 16, 17, 18, 19], image: "" },
  ]);

  const handleDateChange = (direction) => {
    const newDate = new Date(date);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setDate(newDate);
  };

  const handleAvailabilityChange = (userIndex, hour) => {
    const newAvailability = [...availability];
    newAvailability[userIndex].hours.includes(hour)
      ? newAvailability[userIndex].hours.splice(
          newAvailability[userIndex].hours.indexOf(hour),
          1
        )
      : newAvailability[userIndex].hours.push(hour);
    setAvailability(newAvailability);
  };

  const getHighlightedHours = () => {
    const highlightedHours = [];
    for (let hour = 0; hour < HOURS_IN_A_DAY; hour++) {
      if (availability.every((user) => user.hours.includes(hour))) {
        highlightedHours.push(hour);
      }
    }
    return highlightedHours;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => handleDateChange("prev")}
        >
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => handleDateChange("next")}
        >
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.summaryContainer}>
        <TextInput
          style={styles.textInput}
          value={`Starting Time: ${getHighlightedHours().length ? Math.min(...getHighlightedHours()) : ""} - End Time: ${getHighlightedHours().length ? Math.max(...getHighlightedHours()) : ""}`}
          editable={false}
        />
        <TextInput
          style={styles.textInput}
          value={`Available Timeslots: ${getHighlightedHours().join(", ")}`}
          editable={false}
        />
      </View>

      <View style={[styles.gridContainer, { flexDirection: "column" }]}>
        <View style={styles.userColumn}>
          {availability.map((user, userIndex) => (
            <View key={user.name} style={styles.userNameContainer}>
              <Text style={styles.userName}>{user.name}</Text>
              <Image
                source={user.image ? { uri: user.image } : null}
                style={styles.image}
              />
              {!user.image && (
                <Ionicons
                  name="person"
                  size={25}
                  color="#ccc"
                  style={{
                    alignSelf: "center",
                    margin: 5,
                  }}
                />
              )}
            </View>
          ))}
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={styles.hourColumn}>
              {Array(HOURS_IN_A_DAY)
                .fill(0)
                .map((_, hour) => (
                  <Text key={hour} style={styles.hourCell}>
                    {hour}
                  </Text>
                ))}
            </View>

            {availability.map((user, userIndex) => (
              <View key={user.name} style={styles.hourColumn}>
                {Array(HOURS_IN_A_DAY)
                  .fill(0)
                  .map((_, hour) => (
                    <TouchableOpacity
                      key={`${userIndex}-${hour}`}
                      style={[
                        styles.hourCell,
                        user.hours.includes(hour) ? styles.green : styles.red,
                        getHighlightedHours().includes(hour)
                          ? styles.highlighted
                          : null,
                      ]}
                      onPress={() => handleAvailabilityChange(userIndex, hour)}
                    />
                  ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white" }}>Set Availability</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white" }}>Suggest Raid</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AvailabilityWidget;
