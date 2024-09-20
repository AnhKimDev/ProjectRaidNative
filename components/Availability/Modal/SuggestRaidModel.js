import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import styles from "./SuggestRaidModalStyles";
import TimePicker from "./TimePicker";
import MockDatabaseAdapter from "../../../api/adapter/mock-database-adapter";

const SuggestRaidModal = ({
  visible,
  onClose,
  availability,
  calculateSummary,
  passeddate,
  suggestedStartTime,
  suggestedEndTime,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [startTime, setStartTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState(new Date(Date.now()));

  const handleTimeSelected = (selectedStartTime, selectedEndTime) => {
    setStartTime(selectedStartTime);
    setEndTime(selectedEndTime);
  };

  useEffect(() => {
    //console.log(suggestedStartTime, suggestedEndTime);
    setStartTime(suggestedStartTime);
    setEndTime(suggestedEndTime);
  }, [suggestedStartTime, suggestedEndTime]);

  const handleSuggestRaid = () => {
    const suggestedBy = "user-1"; // Replace with the actual user ID or name
    const userIDs = ["user-1", "user-2", "user-3"]; // Replace with the actual user IDs
    const groupIDs = ["group-1"]; // Replace with the actual group IDs

    let formatTime = (date) => {
      return (
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0")
      );
    };

    let formattedStartTime = formatTime(new Date());
    let formattedEndTime = formatTime(new Date());

    if (startTime instanceof Date && endTime instanceof Date) {
      formattedStartTime = formatTime(startTime);
      formattedEndTime = formatTime(endTime);
    }

    console.log(
      "Suggest Raid:",
      title,
      passeddate,
      formattedStartTime,
      formattedEndTime,
      suggestedBy,
      userIDs,
      groupIDs,
      description
    );

    MockDatabaseAdapter.createEvent(
      title,
      passeddate,
      formattedStartTime,
      formattedEndTime,
      suggestedBy,
      userIDs,
      groupIDs,
      description
    );
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Suggest Raid</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Date:</Text>
            <Text style={styles.dateValue}>{date.toLocaleDateString()}</Text>
          </View>
          <View style={styles.timeContainer}>
            <TimePicker
              calculateSummary={calculateSummary}
              onTimeSelected={handleTimeSelected}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSuggestRaid}>
              <Text style={styles.buttonText}>Suggest Raid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SuggestRaidModal;
