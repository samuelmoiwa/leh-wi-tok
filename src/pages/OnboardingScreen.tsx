import LottieView from "lottie-react-native";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"; // 1. Import StatusBar
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = () => {

  const DoneButtonComponent = ({ ...props }) => {
    return (
      <TouchableOpacity {...props} style={{ marginRight: 20 }}>
        <Text style={{ color: "#FFFFFF" }}>Done</Text>
      </TouchableOpacity>
    );
  };

  const NextButtonComponent = ({ ...props }) => {
    return (
      <TouchableOpacity {...props} style={{ marginRight: 20 }}>
        <Text style={{ color: "#FFFFFF" }}>Next</Text>
      </TouchableOpacity>
    );
  };

  const SkipButtonComponent = ({ ...props }) => {
    return (
      <TouchableOpacity {...props} style={{ marginLeft: 20 }}>
        <Text style={{ color: "#FFFFFF" }}>Skip</Text>
      </TouchableOpacity>
    );
  };

  const DotComponent = ({ selected }: { selected: boolean }) => {
    return (
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
  };

  const onDone = () => {
    // Handle what happens after onboarding is done
    console.log("Onboarding completed!");
  }

  const onSkip = () => {
    // Handle what happens when onboarding is skipped
    console.log("Onboarding skipped!");
  }

  return (
    <View style={styles.container}>
      {/* 2. Hide the App/Status Bar */}
      <StatusBar hidden={true} translucent backgroundColor="transparent" />

      <Onboarding
        // 3. Ensure the container stretches to the very edges
        containerStyles={{ paddingBottom: 100 }}
        DoneButtonComponent={DoneButtonComponent}
        NextButtonComponent={NextButtonComponent}
        SkipButtonComponent={SkipButtonComponent}
        DotComponent={DotComponent}
        onDone={onDone}
        onSkip={onSkip}
        pages={[
          {
            backgroundColor: "#AC3470",
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
            title: "Welcome!",
            subtitle: "Ready to start your journey?",
          },
          {
            backgroundColor: "#870F7D",
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
            title: "Connect",
            subtitle: "Talk to anyone, anywhere.",
          },
          {
            backgroundColor: "#21988F",
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
            title: "Launch",
            subtitle: "Boost your productivity today.",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the entire screen height and width
  },
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
