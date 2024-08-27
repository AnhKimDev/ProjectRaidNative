import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import styles from "./styles";

const AvailabilityWidget = () => {
  const [date, setDate] = useState(new Date());
  const [availability, setAvailability] = useState([
    { name: "User 1", hours: [8, 9, 10, 11, 12] },
    { name: "User 2", hours: [9, 10, 11, 12, 13] },
    { name: "User 3", hours: [10, 11, 12, 13, 14] },
    { name: "User 4", hours: [11, 12, 13, 14, 15] },
    { name: "User 5", hours: [12, 13, 14, 15, 16] },
    { name: "User 6", hours: [13, 14, 15, 16, 17] },
    { name: "User 7", hours: [14, 15, 16, 17, 18] },
    { name: "User 8", hours: [15, 16, 17, 18, 19] },
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
    for (let hour = 0; hour < 24; hour++) {
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
          value={`Starting Time: ${availability[0].hours[0]} - End Time: ${
            availability[0].hours[availability[0].hours.length - 1]
          }`}
          editable={false}
        />
        <TextInput
          style={styles.textInput}
          value={`Available Raid Hours: ${getHighlightedHours().join(", ")}`}
          editable={false}
        />
      </View>
      <ScrollView>
        <View style={styles.gridContainer}>
          <View style={styles.hourRow}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {Array(24)
                .fill(0)
                .map((_, hour) => (
                  <Text key={hour} style={styles.hourCell}>
                    {hour}
                  </Text>
                ))}
            </ScrollView>
          </View>
          {availability.map((user, userIndex) => (
            <View key={user.name} style={styles.userRow}>
              <Text style={styles.userName}>{user.name}</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {Array(24)
                  .fill(0)
                  .map((_, hour) => (
                    <TouchableOpacity
                      key={hour}
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
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>Set Availability</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Suggest Raid</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AvailabilityWidget;
