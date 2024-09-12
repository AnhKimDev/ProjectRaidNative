// components/Groups.js
import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./GroupsStyles";
import { groups, users } from "../data";

const getRandomImageId = () => Math.floor(Math.random() * 1084);

const Groups = () => {
  return (
    <View style={styles.groupsContainer}>
      <Text style={styles.groupsText}>Groups:</Text>
      <View style={{ flex: 1 }}>
        {groups.map((group) => (
          <View key={group.groupId} style={styles.groupItem}>
            <Text style={styles.groupName}>{group.name}</Text>
            <ScrollView horizontal={true} style={styles.groupMembersContainer}>
              {group.userIds.map((userId) => {
                const user = users.find((user) => user.userId === userId);
                return (
                  <View key={userId} style={styles.groupMemberItem}>
                    <Image
                      source={{
                        uri:
                          user.image ||
                          `https://picsum.photos/40/40?image=${getRandomImageId()}`,
                      }}
                      style={styles.groupMemberImage}
                    />
                    <Text style={styles.groupMemberName}>{user.name}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Groups;
