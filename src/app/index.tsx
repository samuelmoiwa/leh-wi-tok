import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '@/pages/OnboardingScreen';

const ONBOARDING_KEY = '@lehwitok/hasCompletedOnboarding';

export default function Index() {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasCompleted = await AsyncStorage.getItem(ONBOARDING_KEY);
        if (hasCompleted === 'true') {
          router.replace('/home');
        } else {
          setIsFirstTime(true);
        }
      } catch (error) {
        console.error('Onboarding check failed:', error);
        setIsFirstTime(true);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isFirstTime === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return isFirstTime ? <OnboardingScreen /> : null;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#AC3470',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
