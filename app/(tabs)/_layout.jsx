import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import Home from "./Home";
import Availability from "./Availability";
import Planning from "./Planning";
import Info from "./Info";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Availability") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Planning") {
            iconName = focused ? "clipboard" : "clipboard-outline";
          } else if (route.name === "Info") {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#006600",
        inactiveTintColor: "#8e8e93",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Availability" component={Availability} />
      <Tab.Screen name="Planning" component={Planning} />
      <Tab.Screen name="Info" component={Info} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
