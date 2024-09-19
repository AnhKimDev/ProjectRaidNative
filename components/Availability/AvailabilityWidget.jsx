import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import styles from "./AvailabilityWidgetStyles";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import Summary from "./Summary";
import SuggestRaidModal from "./Modal/SuggestRaidModel";
import MockDatabaseAdapter from "../../api/adapter/mock-database-adapter";

const HOURS_IN_A_DAY = 24;
const users = [
  {
    userID: "user-1",
    name: "User 1",
    image: "https://picsum.photos/40/40?image=1",
  },
  {
    userID: "user-2",
    name: "User 2",
    image: "https://picsum.photos/40/40?image=2",
  },
  {
    userID: "user-3",
    name: "User 3",
    image: "https://picsum.photos/40/40?image=3",
  },
  {
    userID: "user-4",
    name: "User 4",
    image: "https://picsum.photos/40/40?image=4",
  },
  {
    userID: "user-5",
    name: "User 5",
    image: "https://picsum.photos/40/40?image=5",
  },
  {
    userID: "user-6",
    name: "User 6",
    image: "https://picsum.photos/40/40?image=6",
  },
  {
    userID: "user-7",
    name: "User 7",
    image: "https://picsum.photos/40/40?image=7",
  },
  {
    userID: "user-8",
    name: "User 8",
    image: "https://picsum.photos/40/40?image=8",
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
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      const groupID = "group-1";
      const availability = await MockDatabaseAdapter.getAvailabilityByGroup(
        groupID,
        date
      );
      setAvailability(availability);
    };
    fetchAvailability();
  }, [date]);

  const handleSetAvailability = () => {
    const availabilityByDate = {};

    Object.keys(highlightedHours).forEach((userID) => {
      highlightedHours[userID].forEach((entry) => {
        const dateIso = entry.date;
        const hours = entry.hours.reduce(
          (acc, hour) => ({ ...acc, [hour]: true }),
          {}
        );

        if (!availabilityByDate[dateIso]) {
          availabilityByDate[dateIso] = {};
        }

        availabilityByDate[dateIso][userID] = hours;
      });
    });

    Object.keys(availabilityByDate).forEach((dateIso) => {
      const startDate = new Date(dateIso);
      const endDate = new Date(startDate);
      const usersAvailability = availabilityByDate[dateIso];

      MockDatabaseAdapter.updateAvailabilityByGroup(
        dateIso,
        startDate,
        endDate,
        usersAvailability
      ).then(() => {
        handleReset();
        setDate(new Date(date)); // or setDate(date) if you don't need a new Date object
      });
    });
  };
  const getAvailabilityStatus = (hour, user) => {
    const userAvailability = availability.find(
      (avail) => avail.userID === user.userID
    );

    let isAvailable = false;
    if (userAvailability) {
      isAvailable = userAvailability.hours.includes(hour);
    }

    const convertedDate = getyyyymmdd(date);

    const userHighlightedHours = highlightedHours?.[user.userID];
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
  const handleHourPress = (date, hour, userID) => {
    const convertedDate = getyyyymmdd(date);

    setHighlightedHours((prevHighlightedHours) => {
      const newHighlightedHours = { ...prevHighlightedHours };

      if (!newHighlightedHours[userID]) {
        newHighlightedHours[userID] = [];
      }

      let userDateEntryIndex = newHighlightedHours[userID].findIndex(
        (entry) => entry.date === convertedDate
      );
      if (userDateEntryIndex === -1) {
        newHighlightedHours[userID].push({ date: convertedDate, hours: [] });
        userDateEntryIndex = newHighlightedHours[userID].length - 1;
      }

      const userDateEntry = newHighlightedHours[userID][userDateEntryIndex];
      const hourIndex = userDateEntry.hours.indexOf(hour);
      if (hourIndex === -1) {
        userDateEntry.hours.push(hour);
      } else {
        userDateEntry.hours = userDateEntry.hours.filter((h) => h !== hour);
      }

      return newHighlightedHours;
    });

    console.log(
      `Hour ${hour} selected for user ${userID} on date ${convertedDate}`
    );
    //console.log("Updated highlighted hours:", highlightedHours);
  };
  const handleHourRowPress = (hour) => {
    users.forEach((user) => {
      handleHourPress(date, hour, user.userID);
    });
  };
  const handleReset = () => {
    //console.log("before reset", highlightedHours);
    //console.log("availability", availability);
    setHighlightedHours({});
    //console.log("after reset", highlightedHours);
  };
  const renderHourCell = (hour, user, index) => {
    const availabilityStatus = getAvailabilityStatus(hour, user);
    return (
      <TouchableOpacity
        key={`${date}-${hour}-${user.userID}`}
        style={[styles.hourCell, availabilityStatus]}
        onPress={() => handleHourPress(date, index, user.userID)}
      >
        <Text style={styles.hourText}>{hour}</Text>
      </TouchableOpacity>
    );
  };
  const renderHours = () => {
    return users.map((user, userIndex) => (
      <View key={user.userID} style={styles.hourColumn}>
        {Array(HOURS_IN_A_DAY)
          .fill(0)
          .map((_, hour) => renderHourCell(hour, user, userIndex))}
      </View>
    ));
  };
  const convertHourToDate = (hour) => {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  };
  const calculateSummary = () => {
    const timeslots = [];

    for (let hour = 0; hour < 24; hour++) {
      const allUsersAvailable = users.every((user) => {
        const availabilityStatus = getAvailabilityStatus(hour, user);
        return availabilityStatus.backgroundColor !== "#E74C3C";
      });

      if (allUsersAvailable) {
        timeslots.push(hour);
      }
    }

    const startTime = timeslots.length
      ? convertHourToDate(Math.min(...timeslots))
      : "";
    const endTime = timeslots.length
      ? convertHourToDate(Math.max(...timeslots))
      : "";
    const timeslotsString = timeslots.join(", ");
    return { startTime, endTime, timeslots: timeslotsString };
  };
  const renderUser = (user, index) => {
    return (
      <View key={user.userID} style={styles.userName}>
        {user.image ? (
          <Image source={{ uri: user.image }} style={styles.userImage} />
        ) : (
          <View style={styles.userImagePlaceholder}>
            <Ionicons name="person" size={20} color="#ccc" />
          </View>
        )}
      </View>
    );
  };
  const renderGrid = () => {
    return (
      <View style={[styles.gridContainer, { flexDirection: "column" }]}>
        <View style={styles.userColumn}>
          <View style={[styles.userName, styles.leftbufferCell]}>
            <Text>&#8203;&#8203;</Text>
          </View>
          {users.map((user, index) => renderUser(user, index))}
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scroll
        >
          <View style={{ flexDirection: "row" }}>
            {renderHoursColumn()}
            {renderHours()}
          </View>
        </ScrollView>
        {renderButtons()}
        <SuggestRaidModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          availability={availability}
          calculateSummary={calculateSummary}
          passeddate={getyyyymmdd(date)}
          suggestedStartTime={calculateSummary().startTime}
          suggestedEndTime={calculateSummary().endTime}
        />
      </View>
    );
  };
  const renderHoursColumn = () => {
    return (
      <View style={styles.hourColumn}>
        {Array(HOURS_IN_A_DAY)
          .fill(0)
          .map((_, hour) => (
            <View key={`${date}-${hour}`} style={styles.lefthourCell}>
              <TouchableOpacity>
                <Text
                  style={styles.lefthourCell}
                  onPress={() => handleHourRowPress(hour)}
                >
                  {hour}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    );
  };
  const renderButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonTextStyle}>Reset Selection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSetAvailability}>
          <Text style={styles.buttonTextStyle}>Confirm Selection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonTextStyle}>Suggest Raid</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header date={date} setDate={setDate} />
      <Summary
        availability={availability}
        calculateSummary={calculateSummary}
      />
      {renderGrid()}
    </View>
  );
};

export default AvailabilityWidget;
