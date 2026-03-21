// src/components/UserProfile.tsx
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Surface, Text } from "react-native-paper";
import { useAppTheme } from "../../context/ThemeContext";

const UserProfile = () => {
  const router = useRouter();
  const { isDarkMode } = useAppTheme();

  const bgColor = isDarkMode ? "#1E1E1E" : "#FFFFFF";
  const textColor = isDarkMode ? "#F9FAFB" : "#111827";
  const subTextColor = isDarkMode ? "#9CA3AF" : "#6B7280";
  const decColor = isDarkMode ? "rgba(192, 38, 111, 0.15)" : "#FCE7F3";

  return (
    <Surface
      style={[styles.container, { backgroundColor: bgColor }]}
      elevation={2}
    >
      <View style={[styles.bgDecoration, { backgroundColor: decColor }]} />

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={100}
            source={require("../../../assets/images/user-avatar.jpg")}
          />
          <View
            style={[
              styles.avatarRing,
              { borderColor: "#C0266F", opacity: isDarkMode ? 0.4 : 0.2 },
            ]}
          />
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.name, { color: textColor }]}>
            Abdulai Samuel
          </Text>
          <Text style={[styles.email, { color: subTextColor }]}>
            samuel.abdulai@example.com
          </Text>

          <View style={styles.badgeContainer}>
            <View
              style={[
                styles.roleBadge,
                { backgroundColor: isDarkMode ? "#064E3B" : "#ECFDF5" },
              ]}
            >
              <Text
                style={[
                  styles.roleText,
                  { color: isDarkMode ? "#34D399" : "#059669" },
                ]}
              >
                Student
              </Text>
            </View>
            <Text style={[styles.locationText, { color: subTextColor }]}>
              {" "}
              • Sierra Leone
            </Text>
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
