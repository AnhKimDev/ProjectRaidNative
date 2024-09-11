import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import styles from "./UserWidgetStyles";
import { groups, users } from "./data";

const UserWidget = () => {
  const username = "User 1"; // Replace with fetched username later
  const events = [
    { id: 1, title: "Event 1", date: "2023-03-01" },
    { id: 2, title: "Event 2", date: "2023-03-05" },
    { id: 3, title: "Event 3", date: "2023-03-10" },
    // Add more events here...
  ];

  const renderUserInfoContainer = () => {
    return (
      <View style={styles.userInfoContainer}>
        <View style={{ flex: 1, alignItems: "center", marginBottom: 20 }}>
          <Text style={styles.welcomeText}>Welcome back, {username}!</Text>
          <Image
            source={{ uri: `https://picsum.photos/300/300` }}
            style={styles.profilePicture}
          />
          {renderGroupsContainer()}
        </View>
      </View>
    );
  };

  const renderGroupsContainer = () => {
    return (
      <View style={styles.groupsContainer}>
        <Text style={styles.groupsText}>Groups:</Text>
        <View>
          {groups.map((group) => (
            <View key={group.groupId} style={styles.groupItem}>
              <Text style={styles.groupName}>{group.name}</Text>
              <View style={styles.groupMembersContainer}>
                {group.userIds.map((userId) => {
                  const user = users.find((user) => user.userId === userId);
                  return (
                    <View key={userId} style={styles.groupMemberItem}>
                      <Image
                        source={{
                          uri: user.image || "https://picsum.photos/300/300",
                        }}
                        style={styles.groupMemberImage}
                      />
                      <Text style={styles.groupMemberName}>{user.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderUpcomingEventsContainer = () => {
    return (
      <View style={styles.upcomingEventsContainer}>
        <Text style={styles.upcomingEventsTitle}>Upcoming Events</Text>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>{renderUserInfoContainer()}</View>
      <View style={styles.eventsContainer}>
        {renderUpcomingEventsContainer()}
      </View>
    </View>
  );
};

export default UserWidget;
