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
import AvailabilityApi from "./AvailabilityApi";

const HOURS_IN_A_DAY = 24;
const groupId = "group-1";
const users = [
  {
    userId: "user-1",
    name: "User 1",
    image: "",
  },
  {
    userId: "user-2",
    name: "User 2",
    image: "",
  },
  {
    userId: "user-3",
    name: "User 3",
    image: "",
  },
  {
    userId: "user-4",
    name: "User 4",
    image: "",
  },
  {
    userId: "user-5",
    name: "User 5",
    image: "",
  },
  {
    userId: "user-6",
    name: "User 6",
    image: "",
  },
  {
    userId: "user-7",
    name: "User 7",
    image: "",
  },
  {
    userId: "user-8",
    name: "User 8",
    image: "",
  },
];
const getyyyymmdd = (date) => {
  if (!(date instanceof Date)) {
    throw new Error(`Invalid date object: ${date}`);
  }
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${date}`);
  }
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};

const AvailabilityWidget = () => {
  const [date, setDate] = useState(() => new Date(Date.now()));
  const [availability, setAvailability] = useState([]);
  const [highlightedHours, setHighlightedHours] = useState({});

  //update if date is changed
  useEffect(() => {
    const fetchAvailability = async () => {
      const groupId = "group-1";
      const availability = await AvailabilityApi.getAvailabilityByGroup(
        groupId,
        date
      );
      setAvailability(availability);
    };
    fetchAvailability();
  }, [date]);

  //handles arrow left
  const handlePrevDate = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  //handles arrow right
  const handleNextDate = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };

  //TODO: handles setavaialbility button
  const handleSetAvailability = () => {
    const availabilityByDate = {};

    Object.keys(highlightedHours).forEach((userId) => {
      highlightedHours[userId].forEach((entry) => {
        const dateIso = entry.date;
        const hours = entry.hours.reduce(
          (acc, hour) => ({ ...acc, [hour]: true }),
          {}
        );

        if (!availabilityByDate[dateIso]) {
          availabilityByDate[dateIso] = {};
        }

        availabilityByDate[dateIso][userId] = hours;
      });
    });

    Object.keys(availabilityByDate).forEach((dateIso) => {
      const startDate = new Date(dateIso);
      const endDate = new Date(startDate);
      const usersAvailability = availabilityByDate[dateIso];

      AvailabilityApi.updateAvailabilityByGroup(
        dateIso,
        startDate,
        endDate,
        usersAvailability
      ).then(() => {
        handleReset();
        //setDate(new Date(date)); // or setDate(date) if you don't need a new Date object
      });
    });
  };

  const getAvailabilityStatus = (hour, user) => {
    const userAvailability = availability.find(
      (avail) => avail.userId === user.userId
    );

    let isAvailable = false;
    if (userAvailability) {
      isAvailable = userAvailability.hours.includes(hour);
    }

    const convertedDate = getyyyymmdd(date);

    const userHighlightedHours = highlightedHours?.[user.userId];
    const isHighlighted =
      userHighlightedHours &&
      userHighlightedHours.some(
        (entry) => entry.date === convertedDate && entry.hours.includes(hour)
      );

    if (isHighlighted) {
      return styles.yellow; // Return yellow if the hour is highlighted
    } else if (isAvailable) {
      return styles.green; // Return green if the hour is available
    } else {
      return styles.red; // Return red by default
    }
  };

  const handleHourPress = (date, hour, userId) => {
    const convertedDate = getyyyymmdd(date);

    setHighlightedHours((prevHighlightedHours) => {
      const newHighlightedHours = { ...prevHighlightedHours };

      if (!newHighlightedHours[userId]) {
        newHighlightedHours[userId] = [];
      }

      let userDateEntryIndex = newHighlightedHours[userId].findIndex(
        (entry) => entry.date === convertedDate
      );
      if (userDateEntryIndex === -1) {
        newHighlightedHours[userId].push({ date: convertedDate, hours: [] });
        userDateEntryIndex = newHighlightedHours[userId].length - 1;
      }

      const userDateEntry = newHighlightedHours[userId][userDateEntryIndex];
      const hourIndex = userDateEntry.hours.indexOf(hour);
      if (hourIndex === -1) {
        userDateEntry.hours.push(hour);
      } else {
        userDateEntry.hours = userDateEntry.hours.filter((h) => h !== hour);
      }

      return newHighlightedHours;
    });

    console.log(
      `Hour ${hour} selected for user ${userId} on date ${convertedDate}`
    );
    //console.log("Updated highlighted hours:", highlightedHours);
  };

  const handleReset = () => {
    //console.log("before reset", highlightedHours);
    //console.log("availability", availability);
    setHighlightedHours({});
    //console.log("after reset", highlightedHours);
  };

  //renders how the cells are displayed
  const renderHours = () => {
    return users.map((user, userIndex) => (
      <View key={user.userId} style={styles.hourColumn}>
        {Array(HOURS_IN_A_DAY)
          .fill(0)
          .map((hour, index) => (
            <TouchableOpacity
              key={`${userIndex}-${index}`}
              style={[styles.hourCell, getAvailabilityStatus(index, user)]}
              onPress={() => handleHourPress(date, index, user.userId)} // Pass date, hour, and userId
            >
              <Text style={styles.hourText}>{index}</Text>
            </TouchableOpacity>
          ))}
      </View>
    ));
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

  const calculateSummary = () => {
    const timeslots = [];

    for (let hour = 0; hour < 24; hour++) {
      const isHourAvailable = users.every((user) => {
        const availabilityStatus = getAvailabilityStatus(hour, user);
        return availabilityStatus.backgroundColor !== "#E74C3C";
      });

      if (isHourAvailable) {
        timeslots.push(hour);
      }
    }

    const startTime = timeslots.length ? Math.min(...timeslots) : "";
    const endTime = timeslots.length ? Math.max(...timeslots) : "";
    const timeslotsString = timeslots.join(", ");

    return { startTime, endTime, timeslots: timeslotsString };
  };
  //renders the summary with startingtime and available timeslots
  const renderSummary = () => {
    const { startTime, endTime, timeslots } = calculateSummary();

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
              value={`Available Timeslots: ${timeslots}`}
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
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonTextStyle}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSetAvailability}
          >
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
