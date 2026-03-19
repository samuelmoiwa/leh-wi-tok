import OnboardingScreen from "@/pages/OnboardingScreen";
import Home from "@/pages/Home";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      {/* 2. This hides the header/app bar for this specific screen */}
      <Stack.Screen options={{ headerShown: false }} />

      <OnboardingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
