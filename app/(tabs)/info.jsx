import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Notification from "../../components/Notification/Notification";
import UpcomingEvents from "../../components/UserWidget/UpcomingEvents";

const Info = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#191970" }}>
      <View style={styles.container}>
        <View style={styles.InnerContainer}>
          <UpcomingEvents />
        </View>
      </View>
      <View style={styles.container}>
        <Notification
          title={"title"}
          description={"description"}
          passedDate={new Date()}
          startTime={new Date()}
          endTime={new Date()}
        />
      </View>
    </View>
  );
};

export default Info;
import {
  colors,
  textShadow,
  borderRadius,
  padding,
  margin,
} from "../../constants/constants";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.primary,
    padding,
    borderRadius: 20,
    margin,
    borderColor: colors.black,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  InnerContainer: {
    flexGrow: 1,
    padding: 16,
    margin: 4,
    borderRadius: 8,
    maxHeight: 400,
    overflow: "hidden",
  },
});
