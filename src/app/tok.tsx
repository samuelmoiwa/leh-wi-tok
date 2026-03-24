import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity, // Ensure this is here
    View,
    Platform
} from "react-native";
import { IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import SignAnimation from "../components/tok/SignAnimation";
import TranslationHistory from "../components/tok/TranslationHistory";
import TranslatorInput from "../components/tok/TranslatorInput";
import { useAppTheme } from "../context/ThemeContext";

const TokScreen = () => {
  const { isDarkMode } = useAppTheme();
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [translatedSign, setTranslatedSign] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleTranslate = () => {
    if (!inputText.trim()) {
      Toast.show({
        type: "info",
        text1: "Empty Input",
        text2: "Please type something to translate.",
      });
      return;
    }

    // Mock Database for Animations
    const mockSigns: Record<string, { word: string; animation: any }> = {
      hello: {
        word: "Hello",
        animation: require("../../assets/lottieFiles/greeting.json"),
      },
      "thank you": {
        word: "Thank You",
        animation: require("../../assets/lottieFiles/talking.json"),
      },
      "good morning": {
        word: "Good Morning",
        animation: require("../../assets/lottieFiles/rocket.json"),
      },
    };

    const lower = inputText.toLowerCase().trim();
    const result = mockSigns[lower] || {
      word: inputText,
      animation: require("../../assets/lottieFiles/greeting.json"),
    };

    setTranslatedSign(result);

    const newEntry = {
      id: Date.now(),
      text: inputText,
      signWord: result.word,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setHistory((prev) => [newEntry, ...prev].slice(0, 5));

    Toast.show({
      type: "success",
      text1: "Translated!",
      text2: `Showing sign for "${result.word}"`,
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#F8F9FA" },
      ]}
      edges={["top"]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      {/* Custom Top Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconButton
            icon="chevron-left"
            iconColor="#C0266F"
            size={28}
            style={styles.noMargin}
          />
          <Text style={styles.backText}>Home</Text>
        </TouchableOpacity>

        <Text style={[styles.navTitle, { color: isDarkMode ? "#fff" : "#111827" }]}>
          Translator
        </Text>

        <View style={{ width: 60 }} /> {/* Spacer to balance the back button */}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        <TranslatorInput
          value={inputText}
          onChangeText={setInputText}
          onTranslate={handleTranslate}
        />

        {translatedSign && <SignAnimation sign={translatedSign} />}

        <TranslationHistory history={history} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    height: 50, // Added height for touch stability
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 80
  },
  backText: {
    color: "#C0266F",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: -10, // Adjust spacing between icon and text
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: 'center'
  },
  scrollBody: { padding: 20 },
  noMargin: { margin: 0 },
});

export default TokScreen;
