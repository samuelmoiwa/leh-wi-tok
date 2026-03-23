import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
// Fix: Import from context instead of react-native
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, IconButton } from 'react-native-paper';
import { useAppTheme } from '../context/ThemeContext';
import FeaturedCarousel from '../components/home/FeaturedCarousel';
import ProgressOverview from '../components/home/ProgressOverview';
import ContinueLearning from '../components/home/ContinueLearning';
import FabButton from '../components/FabButton';

export default function HomeScreen() {
  const { isDarkMode } = useAppTheme();

  return (
    // edges={['top']} ensures it doesn't add padding to the bottom where the FAB is
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FA' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.header}>
        <View>
            <Text style={[styles.greeting, { color: isDarkMode ? '#A1A1AA' : '#6B7280' }]}>Hello, Moiwa 👋</Text>
            <Text style={[styles.welcome, { color: isDarkMode ? '#FFFFFF' : '#111827' }]}>Let's learn sign!</Text>
        </View>
        <IconButton
          icon="bell-outline"
          size={24}
          style={[styles.bell, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FCE7F3' }]}
          iconColor="#C0266F"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FeaturedCarousel />
        <ProgressOverview />
        <ContinueLearning />
      </ScrollView>

      <FabButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  greeting: { fontSize: 14, fontWeight: '600' },
  welcome: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  bell: { borderRadius: 12 }
});
