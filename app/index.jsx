import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Logo from "./../assets/images/Logo.png";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#191970",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          color: "white",
          textShadowColor: "black",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 2,
        }}
      >
        Welcome to Project Raid
      </Text>

      <Image
        source={Logo}
        style={{
          width: 350,
          height: 350,
          borderRadius: 8,
        }}
      />

      <StatusBar style="auto" />
      <TouchableOpacity
        style={{
          backgroundColor: "#3C4C6C",
          padding: 16,
          borderRadius: 8,
        }}
      >
        <Link
          href="/(tabs)/availability"
          style={{
            fontSize: 24,
            color: "white",
          }}
        >
          Skip Login
        </Link>
      </TouchableOpacity>
    </View>
  );
}
