import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import Logo from "./../assets/images/Logo.png";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 24 }}>Welcome to Project Raid</Text>
      <Image source={Logo} style={{ width: 350, height: 350 }} />

      <StatusBar style="auto" />
      <Link href="/Availability" style={{ fontSize: 24 }}>
        Go to Availability
      </Link>
    </View>
  );
}
