import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Ionicons,
} from "react-native";
import styles from "./AvailabilityWidgetStyles";

const HOURS_IN_A_DAY = 24;

const renderUser = (availabilityItem, userIndex, users) => {
  const user = users.find((user) => user.userID === availabilityItem.userID);
  if (user) {
    return (
      <View key={availabilityItem.userID} style={styles.userName}>
        {user.image ? (
          <Image
            source={{ uri: user.image }}
            style={[styles.userImage, { height: 40, width: 40 }]} // Add fixed height and width
          />
        ) : (
          <View style={styles.userImagePlaceholder}>
            <Ionicons name="person" size={20} color="#ccc" />
          </View>
        )}
      </View>
    );
  } else {
    return null;
  }
};

const renderHoursColumn = () => {
  return (
    <View style={styles.hourColumn}>
      {Array(HOURS_IN_A_DAY)
        .fill(0)
        .map((_, hour) => (
          <Text key={hour} style={styles.lefthourCell}>
            {hour}
          </Text>
        ))}
    </View>
  );
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
const renderHourCell = (hour, user, index) => {
  const availabilityStatus = getAvailabilityStatus(index, user);
  return (
    <TouchableOpacity
      key={`${user.userID}-${index}`}
      style={[styles.hourCell, availabilityStatus]}
      onPress={() => handleHourPress(date, index, user.userID)}
    >
      <Text style={styles.hourText}>{hour}</Text>
    </TouchableOpacity>
  );
};

const renderHours = (users) => {
  return users.map((user, userIndex) => (
    <View key={user.userID} style={styles.hourColumn}>
      {Array(HOURS_IN_A_DAY)
        .fill(0)
        .map((hour, index) => renderHourCell(hour, user, index))}
    </View>
  ));
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTextStyle}>Suggest Raid</Text>
      </TouchableOpacity>
    </View>
  );
};

const Grid = ({
  availability,
  users,
  handleHourPress,
  handleReset,
  handleSetAvailability,
  getAvailabilityStatus,
  date,
}) => {
  return (
    <View style={[styles.gridContainer, { flexDirection: "column" }]}>
      <View style={styles.userColumn}>
        <View style={[styles.userName, styles.leftbufferCell]}>
          <Text>&#8203;&#8203;</Text>
        </View>
        {availability.map((availabilityItem, userIndex) =>
          renderUser(availabilityItem, userIndex, users)
        )}
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scroll
      >
        <View style={{ flexDirection: "row" }}>
          {renderHoursColumn()}
          {renderHours(users)}
        </View>
      </ScrollView>
      {renderButtons()}
    </View>
  );
};

export default Grid;
