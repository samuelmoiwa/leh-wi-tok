import LottieView from "lottie-react-native";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@lehwitok/hasCompletedOnboarding';

const OnboardingScreen = () => {
  const markOnboardingComplete = async () => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    router.replace('/login');           // ← Changed from /home to /login
  } catch (error) {
    router.replace('/login');
  }
};

  // ────────────────────── Custom Buttons ──────────────────────
  const DoneButtonComponent = ({ ...props }) => (
    <TouchableOpacity {...props} style={{ marginRight: 20 }}>
      <Text style={{ color: "#FFFFFF", fontWeight: '700', fontSize: 18 }}>Done</Text>
    </TouchableOpacity>
  );

  const NextButtonComponent = ({ ...props }) => (
    <TouchableOpacity {...props} style={{ marginRight: 20 }}>
      <Text style={{ color: "#FFFFFF", fontWeight: '700', fontSize: 18 }}>Next</Text>
    </TouchableOpacity>
  );

  const SkipButtonComponent = ({ ...props }) => (
    <TouchableOpacity {...props} style={{ marginLeft: 20 }}>
      <Text style={{ color: "#FFFFFF", fontWeight: '700', fontSize: 18 }}>Skip</Text>
    </TouchableOpacity>
  );

  const DotComponent = ({ selected }: { selected: boolean }) => (
    <View
      style={{
        width: selected ? 25 : 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
        backgroundColor: selected ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
      }}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden translucent backgroundColor="transparent" />

      <Onboarding
        containerStyles={{ paddingBottom: 100 }}
        DoneButtonComponent={DoneButtonComponent}
        NextButtonComponent={NextButtonComponent}
        SkipButtonComponent={SkipButtonComponent}
        DotComponent={DotComponent}
        onDone={markOnboardingComplete}
        onSkip={markOnboardingComplete}
        pages={[
          {
            backgroundColor: "#C0266F",           // Updated to match first illustration (warm pink)
            image: (
              <View style={styles.lottieContainer}>
                <LottieView
                  source={require("../../assets/lottieFiles/greeting.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Leh Wi Tok",
            subtitle: "Learn Sierra Leonean Sign Language\nand bridge the communication gap",
          },
          {
            backgroundColor: "#6D28D9",           // Updated to match second illustration (rich purple)
            image: (
              <View style={styles.lottieContainer}>
                <LottieView
                  source={require("../../assets/lottieFiles/talking.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Connect Through Signs",
            subtitle: "Master everyday signs used in Sierra Leone\n— greetings, family, food & more",
          },
          {
            backgroundColor: "#0F766E",           // Updated to match rocket illustration (fresh teal)
            image: (
              <View style={styles.lottieContainer}>
                <LottieView
                  source={require("../../assets/lottieFiles/rocket.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Start Signing Today",
            subtitle: "Free progressive lessons, offline dictionary\nand progress tracking",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  lottieContainer: {
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
});
