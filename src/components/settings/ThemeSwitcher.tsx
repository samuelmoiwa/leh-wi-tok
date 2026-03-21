// src/components/ThemeSwitcher.tsx
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Surface, Switch, Text } from "react-native-paper";
import { useAppTheme } from "../../context/ThemeContext";

const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useAppTheme();

  // Dynamic Colors
  const bgColor = isDarkMode ? "#1E1E1E" : "#FFFFFF";
  const textColor = isDarkMode ? "#FFFFFF" : "#111827";
  const subTextColor = isDarkMode ? "#A1A1AA" : "#6B7280";
  const iconBg = isDarkMode ? "#27272A" : "#FCE7F3";

  return (
    <Surface
      style={[styles.container, { backgroundColor: bgColor }]}
      elevation={1}
    >
      <TouchableOpacity
        onPress={toggleTheme}
        activeOpacity={0.85}
        style={styles.touchable}
      >
        <View style={styles.row}>
          <View style={[styles.iconBg, { backgroundColor: iconBg }]}>
            <IconButton
              icon={isDarkMode ? "weather-night" : "white-balance-sunny"}
              iconColor={isDarkMode ? "#FBBF24" : "#C0266F"}
              size={26}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: textColor }]}>
              Display Mode
            </Text>
            <Text style={[styles.subtitle, { color: subTextColor }]}>
              {isDarkMode ? "Dark theme is active" : "Light theme is active"}
            </Text>
          </View>

          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            color="#C0266F"
            style={
              Platform.OS === "ios" ? { transform: [{ scale: 0.85 }] } : {}
            }
          />
        </View>
      </TouchableOpacity>
    </Surface>
  );
};

export default ThemeSwitcher;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
  touchable: { paddingVertical: 16, paddingHorizontal: 16 },
  row: { flexDirection: "row", alignItems: "center" },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { flex: 1, marginLeft: 16 },
  title: { fontSize: 17, fontWeight: "700" },
  subtitle: { fontSize: 13, marginTop: 2 },
});
