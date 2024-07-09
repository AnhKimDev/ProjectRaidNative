import { StyleSheet, Text, View } from "react-native";
import { Tabs, Redirect } from "expo-router";

const TabIcon = ({ icon, color, name, focused }) => {
  return <View></View>;
};

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Text>TabsLayout</Text>
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
