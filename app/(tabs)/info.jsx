import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Notification from "../../components/Notification/Notification";

const Info = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#191970" }}>
      <Text>Info</Text>
      <Notification
        title={"title"}
        description={"description"}
        passedDate={new Date()}
        startTime={new Date()}
        endTime={new Date()}
      />
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({});
