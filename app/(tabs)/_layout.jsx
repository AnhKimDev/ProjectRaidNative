import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import Home from "./Home";
import Availability from "./Availability";
import Planning from "./Planning";
import Info from "./Info";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

const screenOptions = {
  activeTintColor: "#006600",
  inactiveTintColor: "#8e8e93",
};

const tabs = [
  { name: "Home", icon: "home", component: Home },
  { name: "Availability", icon: "calendar", component: Availability },
  { name: "Planning", icon: "list", component: Planning },
  { name: "Info", icon: "information-circle", component: Info },
  { name: "Settings", icon: "settings", component: Settings },
];

const TabsLayout = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={tab.icon} size={24} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
