import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <>
<PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    </PaperProvider>
    <Toast />
    </>

  );
}
