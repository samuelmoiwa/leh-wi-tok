import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { ThemeProvider, useAppTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { initDatabase } from "../utils/db";

function AppContent() {
  const { theme, isDarkMode } = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: isDarkMode ? '#121212' : '#FFFFFF' },
          headerTintColor: "#C0266F",
          headerTitleStyle: { fontWeight: "700" },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: true, title: "Settings" }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: true, title: "Edit Profile" }} />
        <Stack.Screen name="lessons" options={{ headerShown: true, title: "Lessons" }} />
        <Stack.Screen name="dictionary" options={{ headerShown: true, title: "Dictionary" }} />
        <Stack.Screen name="tok" options={{ headerShown: true, title: "Tok - Translator" }} />
        <Stack.Screen name="progress" options={{ headerShown: true, title: "Progress Tracking" }} />
      </Stack>

      <Toast />
    </PaperProvider>
  );
}

export default function RootLayout() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    try {
      initDatabase();
      setIsDbReady(true);
    } catch (error) {
      console.log("Database init error:", error);
    }
  }, []);

  // 🔥 Prevent app from rendering before DB is ready
  if (!isDbReady) {
    return null; // or splash screen / loader
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
