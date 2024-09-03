import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AvailabilityWidget from "../../components/AvailabilityWidget";

const Availability = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <AvailabilityWidget></AvailabilityWidget>
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({});
