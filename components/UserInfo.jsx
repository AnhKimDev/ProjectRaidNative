import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./UserInfoStyles";

const username = "User 1";

const UserInfo = () => {
  return (
    <View style={styles.userInfoContainer}>
      <Text style={styles.welcomeText}>Welcome back, {username}!</Text>
      <Image
        source={{ uri: "https://picsum.photos/150/150" }}
        style={styles.profilePicture}
      />
    </View>
  );
};

export default UserInfo;
