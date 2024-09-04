import React, { useState, useMemo } from "react";
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
import { users } from "./data";

const HOURS_IN_A_DAY = 24;

const AvailabilityWidget = () => {
  const [date, setDate] = useState(new Date());
  const [availability, setAvailability] = useState(users);

  // Extracted functions for better readability
  const handlePrevDate = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  const handleNextDate = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };

  const handleAvailabilityChange = (userIndex, hour) => {
    const newAvailability = [...availability];
    const userHours = newAvailability[userIndex].hours;
    const hourIndex = userHours.indexOf(hour);
    hourIndex !== -1 ? userHours.splice(hourIndex, 1) : userHours.push(hour);
    setAvailability(newAvailability);
  };

  // Memoized function to calculate highlighted hours
  const highlightedHours = useMemo(() => {
    const hours = [];
    for (let hour = 0; hour < HOURS_IN_A_DAY; hour++) {
      if (availability.every((user) => user.hours.includes(hour))) {
        hours.push(hour);
      }
    }
    return hours;
  }, [availability]);

  // Extracted variables for better readability
  const startTime = highlightedHours.length
    ? Math.min(...highlightedHours)
    : "";
  const endTime = highlightedHours.length ? Math.max(...highlightedHours) : "";

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePrevDate}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={handleNextDate}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.summaryContainer}>
        <TextInput
          style={styles.textInput}
          value={`Starting Time: ${startTime} - End Time: ${endTime}`}
          editable={false}
        />
        <TextInput
          style={styles.textInput}
          value={`Available Timeslots: ${highlightedHours.join(", ")}`}
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
                <View style={styles.userImagePlaceholder}>
                  <Ionicons name="person" size={25} color="#ccc" />
                </View>
              )}
            </View>
          ))}
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scroll
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
                  <Text key={hour} style={styles.lefthourCell}>
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
                        user.hours.includes(hour) ? styles.yellow : styles.red,
                        highlightedHours.includes(hour)
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTextStyle}>Set Availability</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTextStyle}>Suggest Raid</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AvailabilityWidget;
