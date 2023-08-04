import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Ball from "./src/ball";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text> on your app!</Text> */}
      <StatusBar style="auto" />
      <Ball />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
