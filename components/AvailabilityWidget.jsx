import React, { useState, useMemo, useEffect } from "react";
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
import { users, availability as availabilityData } from "./data";

const HOURS_IN_A_DAY = 24;

const AvailabilityWidget = () => {
  const [date, setDate] = useState(new Date());
  const [availability, setAvailability] = useState(() => {
    console.log("line 19");
    if (users.length === 0) {
      return [];
    } else {
      return Array(users.length).fill({
        hours: Array(HOURS_IN_A_DAY).fill(false),
      });
    }
  });

  useEffect(() => {
    console.log("line 30");
    if (availabilityData.length > 0) {
      const newAvailability = availabilityData.filter(
        (item) => item.date === date.toISOString().split("T")[0]
      );
      setAvailability(newAvailability);
    } else {
      setAvailability([]);
    }
  }, [date]);

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
    const newHours =
      hourIndex !== -1
        ? userHours.filter((h) => h !== hour)
        : [...userHours, hour];
    newAvailability[userIndex].hours = newHours;
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
  });

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
          {availability.map((availabilityItem, userIndex) => {
            const user = users.find(
              (user) => user.userId === availabilityItem.userId
            );
            if (user) {
              return (
                <View
                  key={availabilityItem.userId}
                  style={styles.userNameContainer}
                >
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
              );
            } else {
              return null;
            }
          })}
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
              <View key={user.userId} style={styles.hourColumn}>
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
