import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./UserGroupsStyles";
import CosmosdbAdapterInstance from "../../api/adapter/cosmosdb-adapter";

const getRandomImageId = () => Math.floor(Math.random() * 1084);
const currentUserID = "user-1";

const UserGroups = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loaddata = async () => {
      console.log("trying to fetch groups");
      const groupsData =
        await CosmosdbAdapterInstance.getGroupsByUserID(currentUserID);
      console.log("fetch groups successful");
      //groupsData.forEach((group) => console.log(`Group:`, group));
      const groupIDs = groupsData.map((group) => group.groupID);
      console.log("trying to fetch users from each group");
      const usersIDs =
        await CosmosdbAdapterInstance.getUsersByGroupIDs(groupIDs);

      const userData = await Promise.all(
        usersIDs.map((userID, index) => {
          return CosmosdbAdapterInstance.getUserByUserID(userID).then(
            (user) => ({
              ...user,
              key: `${userID}-${groupIDs[index]}`, // generate a unique key based on group membership
            })
          );
        })
      );

      //console.log(userData);
      setGroups(groupsData);
      setUsers(userData);
      console.log("fetching users from group successful");
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
                  <View key={user.key} style={styles.groupMemberItem}>
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
