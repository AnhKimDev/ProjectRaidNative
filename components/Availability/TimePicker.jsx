import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import styles from "./TimePickerStyles";

const TimePicker = ({ calculateSummary }) => {
  let startTimeRef = useRef(null);
  let endTimeRef = useRef(null);

  const [startTime, setStartTime] = useState(() => {
    const suggestedStartTime = calculateSummary().startTime;
    startTimeRef.current = suggestedStartTime ? suggestedStartTime : new Date();
    return startTimeRef.current;
  });

  const [endTime, setEndTime] = useState(() => {
    const suggestedEndTime = calculateSummary().endTime;
    endTimeRef.current = suggestedEndTime ? suggestedEndTime : new Date();
    return endTimeRef.current;
  });

  const [showPicker, setShowPicker] = useState({
    startHour: false,
    startMinute: false,
    endHour: false,
    endMinute: false,
  });

  const { startTime: suggestedStartTime, endTime: suggestedEndTime } =
    calculateSummary();
  console.log("in timepicker", suggestedStartTime, suggestedEndTime);

  const openStartHourPicker = () => {
    setShowPicker({ ...showPicker, startHour: true });
    DateTimePickerAndroid.open({
      value: startTimeRef.current,
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        setShowPicker({ ...showPicker, startHour: false });
        startTimeRef.current = selectedDate;
        setStartTime(startTimeRef.current);
      },
    });
  };

  const openStartMinutePicker = () => {
    setShowPicker({ ...showPicker, startMinute: true });
    DateTimePickerAndroid.open({
      value: suggestedStartTime ? suggestedStartTime : startTime,
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        setShowPicker({ ...showPicker, startMinute: false });
        setStartTime((prevTime) => {
          return new Date(
            prevTime.getFullYear(),
            prevTime.getMonth(),
            prevTime.getDate(),
            prevTime.getHours(),
            selectedDate.getMinutes()
          );
        });
      },
    });
  };

  const openEndHourPicker = () => {
    setShowPicker({ ...showPicker, endHour: true });
    DateTimePickerAndroid.open({
      value: endTimeRef.current,
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        setShowPicker({ ...showPicker, endHour: false });
        endTimeRef.current = selectedDate;
        setEndTime(endTimeRef.current);
      },
    });
  };

  const openEndMinutePicker = () => {
    setShowPicker({ ...showPicker, endMinute: true });
    DateTimePickerAndroid.open({
      value: suggestedEndTime ? suggestedEndTime : endTime,
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        setShowPicker({ ...showPicker, endMinute: false });
        setEndTime((prevTime) => {
          return new Date(
            prevTime.getFullYear(),
            prevTime.getMonth(),
            prevTime.getDate(),
            prevTime.getHours(),
            selectedDate.getMinutes()
          );
        });
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
