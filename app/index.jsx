import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";
const Logo = require("./../assets/images/Logo.png");

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">This is index.jsx</Text>
      <StatusBar style="auto" />
      <Link href="/availability" style={{ color: "blue" }}>
        Go to Availability
      </Link>
    </View>
  );
}
