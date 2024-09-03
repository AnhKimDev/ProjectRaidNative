import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Slider from "react-native-slider";
import { styles } from "./PlanningWidgetStyles";

const PlanningWidget = () => {
  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowButton}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>06.05.2024 - 12.05.2024</Text>
        <TouchableOpacity style={styles.arrowButton}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {days.map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day}</Text>
          <Slider
            style={styles.slider}
            minimumValue={14}
            maximumValue={24}
            step={1}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#2196F3"
            value={20}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Set Time</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlanningWidget;
