import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { ThemeProvider, useAppTheme } from "../context/ThemeContext";

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
        <Stack.Screen name="lessons" options={{ headerShown: true, title: "Lessons", }}/>
        <Stack.Screen name="dictionary" options={{ headerShown: true, title: "Dictionary" }} />
        <Stack.Screen name="tok" options={{ headerShown: true, title: "Tok - Translator" }} />
      </Stack>
      {/* Toast is outside the stack to stay on top */}
      <Toast />
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
