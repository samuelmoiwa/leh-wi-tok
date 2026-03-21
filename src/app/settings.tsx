// src/app/settings.tsx
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper"; // Ensure Text is imported
import ThemeSwitcher from "../components/settings/ThemeSwitcher";
import UserProfile from "../components/settings/UserProfile";
import { useAppTheme } from "../context/ThemeContext";

const Settings = () => {
  const { isDarkMode } = useAppTheme();

  const bgColor = isDarkMode ? "#121212" : "#F8F9FA";
  const headerColor = isDarkMode ? "#121212" : "#FFFFFF";
  const textColor = isDarkMode ? "#FFFFFF" : "#111827";
  const subTextColor = isDarkMode ? "#A1A1AA" : "#6B7280";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Stack.Screen
        options={{
          headerTitle: "Settings",
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: headerColor },
          headerTitleStyle: {
            color: textColor,
            fontWeight: "800",
            fontSize: 22,
          },
          headerTintColor: "#C0266F",
        }}
      />

      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <UserProfile />

        {/* Fixed Section Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.textWrap}>
            <View style={[styles.dot, { backgroundColor: "#C0266F" }]} />
            <View style={{ width: 8 }} />
            {/* FIXED: Wrapped 'Preferences' in <Text> and moved styles here */}
            <Text style={[styles.sectionLabel, { color: subTextColor }]}>
              Preferences
            </Text>
          </View>
        </View>

        <ThemeSwitcher />
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  sectionHeader: {
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  textWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
