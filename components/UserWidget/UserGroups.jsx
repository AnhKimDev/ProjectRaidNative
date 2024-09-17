// UserGroups.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./UserGroupsStyles";
import MockDatabaseAdapter from "../../api/adapter/mock-database-adapter";

const getRandomImageId = () => Math.floor(Math.random() * 1084);
const currentUserID = "user-1";
const UserGroups = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loaddata = async () => {
      const groupsData =
        await MockDatabaseAdapter.getGroupsByUserID(currentUserID);
      //console.log("groupsData:", groupsData);
      //groupsData.forEach((group) => console.log(`Group:`, group));
      const groupIDs = groupsData.map((group) => group.groupID);

      const usersData = await MockDatabaseAdapter.getUsersByGroupIDs(groupIDs);

      setGroups(groupsData);
      setUsers(usersData);
    };

    loaddata();
  }, []);
  return (
    <View style={styles.groupsContainer}>
      <Text style={styles.groupsText}>Groups:</Text>
      <View style={{ flex: 1 }}>
        {groups.map((group) => (
          <View key={group.groupID} style={styles.groupItem}>
            <Text style={styles.groupName}>{group.name}</Text>
            <ScrollView horizontal={true} style={styles.groupMembersContainer}>
              {users
                .filter((user) => group.userIDs.includes(user.userID))
                .map((user) => (
                  <View key={user.userID} style={styles.groupMemberItem}>
                    <Image
                      source={{
                        uri:
                          user?.image ||
                          `https://picsum.photos/40/40?image=${getRandomImageId()}`,
                      }}
                      style={styles.groupMemberImage}
                    />
                    <Text style={styles.groupMemberName}>{user?.name}</Text>
                  </View>
                ))}
            </ScrollView>
          </View>
        ))}
      </View>
    </View>
  );
};

export default UserGroups;
