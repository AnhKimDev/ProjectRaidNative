import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import styles from "./AvailabilityWidgetStyles";
import { Ionicons } from "@expo/vector-icons";
import { users, availability as availabilityData } from "./data";

const HOURS_IN_A_DAY = 24;

const AvailabilityWidget = () => {
  const [date, setDate] = useState(() => new Date(Date.now()));
  const [availability, setAvailability] = useState([]);

  //update if date is changed
  useEffect(() => {
    if (availabilityData.length > 0) {
      const newAvailability = availabilityData.filter(
        (item) => item.date === date.toISOString().split("T")[0]
      );
      setAvailability(newAvailability);
    } else {
      setAvailability([]);
    }
  }, [date]);

  //handles arrow left
  const handlePrevDate = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  //handles arrow right
  const handleNextDate = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };

  //handles onclick on cells
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
  const startTime = useMemo(() => {
    return highlightedHours.length ? Math.min(...highlightedHours) : "";
  }, [highlightedHours]);

  const endTime = useMemo(() => {
    return highlightedHours.length ? Math.max(...highlightedHours) : "";
  }, [highlightedHours]);

  //renders how the cells are displayed
  const renderHours = () => {
    if (availability.length === 0) {
      // If no data is found, render all hours as empty
      return users.map((user, userIndex) => (
        <View key={user.userId} style={styles.hourColumn}>
          {Array(HOURS_IN_A_DAY)
            .fill(0)
            .map((_, hour) => (
              <TouchableOpacity
                key={`${userIndex}-${hour}`}
                style={styles.hourCell}
              >
                <Text style={styles.hourText}>{""}</Text>
              </TouchableOpacity>
            ))}
        </View>
      ));
    } else {
      // If data is found, render hours as usual
      return availability.map((user, userIndex) => (
        <View key={user.userId} style={styles.hourColumn}>
          {Array(HOURS_IN_A_DAY)
            .fill(0)
            .map((_, hour) => {
              return (
                <TouchableOpacity
                  key={`${userIndex}-${hour}`}
                  style={[
                    styles.hourCell,
                    user.hours.includes(hour) ? styles.yellow : styles.red,
                    highlightedHours.includes(hour) ? styles.highlighted : null,
                  ]}
                  onPress={() => handleAvailabilityChange(userIndex, hour)}
                >
                  <Text style={styles.hourText}>{hour}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      ));
    }
  };

  //renders the Header with date
  const renderHeader = () => {
    const startDate = date;
    const startDayOfWeek = startDate.toLocaleString("default", {
      weekday: "long",
    });
    const startMonth = startDate.toLocaleString("default", { month: "short" });
    const startDay = startDate.getDate();
    const startYear = startDate.getFullYear();
    const weekRange = `${startDayOfWeek}, ${startMonth} ${startDay}, ${startYear}`;

    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePrevDate}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{weekRange}</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={handleNextDate}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>
    );
  };

  //renders the summary with startingtime and available timeslots
  const renderSummary = () => {
    return (
      <View style={styles.summaryContainer}>
        {availability.length > 0 ? (
          <>
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
          </>
        ) : (
          <Text style={styles.textInput}>
            No availability data found for this date.
          </Text>
        )}
      </View>
    );
  };

  //renders users, hours and buttons
  const renderGrid = () => {
    return (
      <View style={[styles.gridContainer, { flexDirection: "column" }]}>
        <View style={styles.userColumn}>
          <View style={[styles.userName, styles.leftbufferCell]}>
            <Text>&#8203;&#8203;</Text>
          </View>
          {availability.map((availabilityItem, userIndex) => {
            const user = users.find(
              (user) => user.userId === availabilityItem.userId
            );
            if (user) {
              return (
                <View key={availabilityItem.userId} style={styles.userName}>
                  {/* <Text style={styles.userName}>{user.name}</Text> */}
                  <Image
                    source={user.image ? { uri: user.image } : null}
                    style={styles.image}
                  />
                  {!user.image && (
                    <View style={styles.userImagePlaceholder}>
                      <Ionicons name="person" size={20} color="#ccc" />
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
          <View style={{ flexDirection: "row" }}>
            <View style={styles.hourColumn}>
              {Array(HOURS_IN_A_DAY)
                .fill(0)
                .map((_, hour) => (
                  <Text key={hour} style={styles.lefthourCell}>
                    {hour}
                  </Text>
                ))}
            </View>
            {renderHours()}
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
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      {renderSummary()}
      {renderGrid()}
    </View>
  );
};

export default AvailabilityWidget;
