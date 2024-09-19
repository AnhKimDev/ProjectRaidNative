import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import styles from "./SuggestRaidModalStyles";
import TimePicker from "./TimePicker";

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
  const [startTime, setStartTime] = useState(() => {});
  const [endTime, setEndTime] = useState(() => {});

  const handleTimeSelected = (selectedStartTime, selectedEndTime) => {
    setStartTime(selectedStartTime);
    setEndTime(selectedEndTime);
  };

  const handleSuggestRaid = () => {
    const suggestedBy = "user-1"; // Replace with the actual user ID or name
    const userIDs = ["user-1", "user-2", "user-3"]; // Replace with the actual user IDs
    const groupIDs = ["group-1"]; // Replace with the actual group IDs

    const formattedStartTime =
      startTime.getHours().toString().padStart(2, "0") +
      ":" +
      startTime.getMinutes().toString().padStart(2, "0");
    const formattedEndTime =
      endTime.getHours().toString().padStart(2, "0") +
      ":" +
      endTime.getMinutes().toString().padStart(2, "0");

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
