import { useRouter } from "expo-router";
import React, { useState, useCallback } from "react"; // Added hooks
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Surface, Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native"; // Added for auto-refresh
import { useAppTheme } from "../../context/ThemeContext";
import { getProfile } from "../../utils/db"; // Ensure this is exported from your db utils

const UserProfile = () => {
  const router = useRouter();
  const { isDarkMode } = useAppTheme();

  // 1. Create state to hold the profile data
  const [profile, setProfile] = useState({
    fullName: "Abdulai Samuel",
    email: "samuel.abdulai@example.com",
    role: "Student",
    avatarUri: null as string | null,
  });

  // 2. Use focus effect to re-load data from DB when returning to this screen
  useFocusEffect(
    useCallback(() => {
      const saved = getProfile() as any;
      if (saved) {
        setProfile({
          fullName: saved.fullName || "Abdulai Samuel",
          email: saved.email || "samuel.abdulai@example.com",
          role: saved.role || "Student",
          avatarUri: saved.avatarUri || null,
        });
      }
    }, [])
  );

  const theme = {
    bg: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    text: isDarkMode ? "#F9FAFB" : "#111827",
    sub: isDarkMode ? "#9CA3AF" : "#6B7280",
    dec: isDarkMode ? "rgba(192, 38, 111, 0.15)" : "#FCE7F3"
  };

  return (
    <Surface style={[styles.container, { backgroundColor: theme.bg }]} elevation={2}>
      <View style={[styles.bgDecoration, { backgroundColor: theme.dec }]} />

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          {/* 3. Render the dynamic avatar */}
          <Avatar.Image
            size={100}
            source={
              profile.avatarUri
                ? { uri: profile.avatarUri }
                : require("../../../assets/images/user-avatar.jpg")
            }
          />
          <View style={[styles.avatarRing, { borderColor: "#C0266F", opacity: isDarkMode ? 0.4 : 0.2 }]} />
        </View>

        <View style={styles.infoSection}>
          {/* 4. Render the dynamic name and email */}
          <Text style={[styles.name, { color: theme.text }]}>
            {profile.fullName}
          </Text>
          <Text style={[styles.email, { color: theme.sub }]}>
            {profile.email}
          </Text>

          <View style={styles.badgeContainer}>
            <View style={[styles.roleBadge, { backgroundColor: isDarkMode ? "#064E3B" : "#ECFDF5" }]}>
              <Text style={[styles.roleText, { color: isDarkMode ? "#34D399" : "#059669" }]}>
                {profile.role}
              </Text>
            </View>
            <Text style={[styles.locationText, { color: theme.sub }]}> • Sierra Leone</Text>
          </View>
        </View>

        <Button
          mode="contained"
          icon="pencil-outline"
          onPress={() => router.push("/edit-profile")}
          style={styles.editButton}
          buttonColor="#C0266F"
        >
          Edit Profile
        </Button>
      </View>
    </Surface>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginTop: 24,
    borderRadius: 28,
    overflow: "hidden",
  },
  bgDecoration: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.5,
  },
  content: { alignItems: "center", paddingVertical: 30, paddingHorizontal: 20 },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarRing: {
    position: "absolute",
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
  },
  infoSection: { alignItems: "center", marginBottom: 24 },
  name: { fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  email: { fontSize: 15, marginTop: 4 },
  badgeContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  roleBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  roleText: { fontSize: 11, fontWeight: "800", textTransform: "uppercase" },
  locationText: { fontSize: 14, fontWeight: "500" },
  editButton: { width: "100%", borderRadius: 16 },
});
