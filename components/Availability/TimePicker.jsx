import React, { useState } from "react";
import { View, Text } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import styles from "./TimePickerStyles";

const TimePicker = () => {
  const [startTime, setStartTime] = useState(new Date()); // Create a useState hook for the start time
  const [endTime, setEndTime] = useState(new Date()); // Create a useState hook for the end time
  const [showStartHourPicker, setShowStartHourPicker] = useState(false);
  const [showStartMinutePicker, setShowStartMinutePicker] = useState(false);
  const [showEndHourPicker, setShowEndHourPicker] = useState(false);
  const [showEndMinutePicker, setShowEndMinutePicker] = useState(false);

  const openStartHourPicker = () => {
    DateTimePickerAndroid.open({
      value: startTime,
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        setShowStartHourPicker(false);
        setStartTime(selectedDate);
      },
    });
  };

  const openStartMinutePicker = () => {
    DateTimePickerAndroid.open({
      value: startTime,
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        setShowStartMinutePicker(false);
        setStartTime(selectedDate);
      },
    });
  };

  const openEndHourPicker = () => {
    DateTimePickerAndroid.open({
      value: endTime,
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        setShowEndHourPicker(false);
        setEndTime(selectedDate);
      },
    });
  };

  const openEndMinutePicker = () => {
    DateTimePickerAndroid.open({
      value: endTime,
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        setShowEndMinutePicker(false);
        setEndTime(selectedDate);
      },
    });
  };

  return (
    <View style={styles.timeContainer}>
      <Text style={styles.timeLabel}>Start Time:</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.hourText} onPress={openStartHourPicker}>
          {startTime.getHours().toString().padStart(2, "0")}
        </Text>
        <Text>:</Text>
        <Text style={styles.minuteText} onPress={openStartMinutePicker}>
          {startTime.getMinutes().toString().padStart(2, "0")}
        </Text>
      </View>

      <Text style={styles.timeLabel}>End Time:</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.hourText} onPress={openEndHourPicker}>
          {endTime.getHours().toString().padStart(2, "0")}
        </Text>
        <Text>:</Text>
        <Text style={styles.minuteText} onPress={openEndMinutePicker}>
          {endTime.getMinutes().toString().padStart(2, "0")}
        </Text>
      </View>
    </View>
  );
};

export default TimePicker;
