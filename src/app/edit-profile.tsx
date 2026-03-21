import * as ImagePicker from "expo-image-picker";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Menu,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { getProfile, initDatabase, saveProfile } from "../utils/db";
import { useAppTheme } from "../context/ThemeContext";

const ROLES = ["Student", "Teacher", "Parent", "Volunteer", "General User"];

const EditProfile = () => {
  const { isDarkMode } = useAppTheme();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // Dynamic Theme Colors
  const theme = {
    background: isDarkMode ? "#121212" : "#FFFFFF",
    surface: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    text: isDarkMode ? "#FFFFFF" : "#111827",
    subText: isDarkMode ? "#A1A1AA" : "#6B7280",
    inputBg: isDarkMode ? "#262626" : "transparent",
    border: isDarkMode ? "#333333" : "#F3F4F6",
    roleBg: isDarkMode ? "#262626" : "#F9FAFB",
    avatarBorder: isDarkMode ? "#333333" : "#FCE7F3",
  };

  useEffect(() => {
    initDatabase();
    const saved = getProfile() as any;
    if (saved) {
      setFullName(saved.fullName || "");
      setEmail(saved.email || "");
      setRole(saved.role || "Student");
      setAvatarUri(saved.avatarUri || null);
    }
  }, []);

  const pickAndCropImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setAvatarUri(result.assets[0].uri);
  };

  const handleSave = () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert("Required", "Please fill in your name and email.");
      return;
    }
    saveProfile(fullName, email, role, avatarUri);
    Alert.alert("Success", "Your profile has been updated! ✨");
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Dynamic Header Configuration */}
      <Stack.Screen
        options={{
          headerTitle: "Edit Profile",
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.background },
          headerTitleStyle: { color: theme.text, fontWeight: "800", fontSize: 22 },
          headerTintColor: "#C0266F", // Keeps your brand pink for the back button
        }}
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={pickAndCropImage} activeOpacity={0.8}>
            <View style={styles.avatarWrapper}>
              <Image
                source={
                  avatarUri
                    ? { uri: avatarUri }
                    : require("../../assets/images/user-avatar.jpg")
                }
                style={[styles.avatar, { borderColor: theme.avatarBorder }]}
              />
              <Surface style={styles.cameraBadge} elevation={4}>
                <IconButton icon="camera" iconColor="#FFFFFF" size={20} />
              </Surface>
            </View>
          </TouchableOpacity>
          <Text style={[styles.userName, { color: theme.text }]}>
            {fullName || "Your Name"}
          </Text>
          <Text style={[styles.userRole, { color: theme.subText }]}>
            {role}
          </Text>
        </View>

        {/* Form Section */}
        <Surface style={[styles.formContainer, { backgroundColor: theme.surface }]} elevation={1}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Personal Information
          </Text>

          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            mode="flat"
            textColor={theme.text}
            activeUnderlineColor="#C0266F"
            underlineColor={isDarkMode ? "#444" : "#E5E7EB"}
            style={[styles.input, { backgroundColor: theme.inputBg }]}
            contentStyle={styles.inputContent}
            left={
              <TextInput.Icon
                icon="account-outline"
                color={theme.subText}
                style={styles.iconShift}
              />
            }
          />

          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            mode="flat"
            textColor={theme.text}
            activeUnderlineColor="#C0266F"
            underlineColor={isDarkMode ? "#444" : "#E5E7EB"}
            style={[styles.input, { backgroundColor: theme.inputBg }]}
            contentStyle={styles.inputContent}
            left={
              <TextInput.Icon
                icon="email-outline"
                color={theme.subText}
                style={styles.iconShift}
              />
            }
          />

          <Divider style={[styles.divider, { backgroundColor: theme.border }]} />

          <Text style={[styles.label, { color: theme.subText }]}>Account Role</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => setMenuVisible(true)}
                style={[
                  styles.rolePicker,
                  { backgroundColor: theme.roleBg, borderColor: theme.border }
                ]}
              >
                <View style={styles.rolePickerLeft}>
                  <IconButton icon="shield-check-outline" iconColor={theme.subText} size={24} />
                  <Text style={[styles.roleText, { color: theme.text }]}>{role}</Text>
                </View>
                <IconButton icon="chevron-down" size={24} iconColor="#C0266F" />
              </TouchableOpacity>
            }
            contentStyle={{ backgroundColor: theme.surface }}
          >
            {ROLES.map((r) => (
              <Menu.Item
                key={r}
                onPress={() => { setRole(r); setMenuVisible(false); }}
                title={r}
                titleStyle={{ color: role === r ? "#C0266F" : theme.text }}
              />
            ))}
          </Menu>

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            contentStyle={styles.saveButtonContent}
            buttonColor="#C0266F"
            icon="check-circle-outline"
          >
            Update Profile
          </Button>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: "center", paddingVertical: 30 },
  avatarWrapper: { position: "relative", marginBottom: 16 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 4 },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#C0266F",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: { fontSize: 22, fontWeight: "800" },
  userRole: { fontSize: 14, marginTop: 4, textTransform: "uppercase", letterSpacing: 1 },
  formContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 24,
    marginBottom: 40,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12
      },
    }),
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  input: { marginBottom: 12, height: 64 },
  inputContent: { paddingLeft: 4, paddingTop: 12 },
  iconShift: { marginTop: 10 },
  divider: { marginVertical: 24, height: 1 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8, marginLeft: 4 },
  rolePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    paddingRight: 8,
    borderWidth: 1,
  },
  rolePickerLeft: { flexDirection: "row", alignItems: "center" },
  roleText: { fontSize: 16, fontWeight: "500" },
  saveButton: { marginTop: 30, borderRadius: 16, elevation: 0 },
  saveButtonContent: { height: 58, flexDirection: "row-reverse" },
});
