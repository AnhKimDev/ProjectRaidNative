import { StyleSheet, Text, View } from "react-native";
import React from "react";

import UserWidget from "../../components/UserWidget/UserWidget";

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <UserWidget />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
