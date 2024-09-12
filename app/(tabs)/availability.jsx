import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AvailabilityWidget from "./../../components/Availability/AvailabilityWidget";

const Availability = () => {
  return (
    <View style={{ flex: 1 }}>
      <AvailabilityWidget />
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({});
