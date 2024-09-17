import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PlanningWidget from "../../components/Planning/PlanningWidget";

const Planning = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#191970" }}>
      <PlanningWidget />
    </View>
  );
};

export default Planning;

const styles = StyleSheet.create({});
