import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./UserWidgetStyles";
import UserInfo from "./UserInfo";
import UserGroups from "./UserGroups";
import UpcomingEvents from "./UpcomingEvents";

const UserWidget = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <UserInfo />
        <UserGroups />
      </View>
      <View style={styles.container}>
        <View style={styles.upcomingEventsContainer}>
          <UpcomingEvents />
        </View>
      </View>
    </ScrollView>
  );
};

export default UserWidget;
