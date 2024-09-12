import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./UserWidgetStyles";
import UserInfo from "./UserInfo";
import Groups from "./Groups";
import UpcomingEvents from "./UpcomingEvents";

const UserWidget = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <UserInfo />
        <Groups />
      </View>
      <View style={styles.container}>
        <UpcomingEvents />
      </View>
    </ScrollView>
  );
};

export default UserWidget;
