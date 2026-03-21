import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { Text, Avatar, IconButton } from 'react-native-paper';
import { useAppTheme } from '../context/ThemeContext';
import FeaturedCarousel from '../components/home/FeaturedCarousel';
import ProgressOverview from '../components/home/ProgressOverview';
import ContinueLearning from '../components/home/ContinueLearning';
import FabButton from '../components/FabButton';

export default function HomeScreen() {
  const { isDarkMode } = useAppTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FA' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Dynamic Header */}
      <View style={styles.header}>
        <View>
            <Text style={[styles.greeting, { color: isDarkMode ? '#A1A1AA' : '#6B7280' }]}>Hello, Moiwa 👋</Text>
            <Text style={[styles.welcome, { color: isDarkMode ? '#FFFFFF' : '#111827' }]}>Let's learn sign!</Text>
        </View>
        <IconButton icon="bell-outline" size={24} style={styles.bell} />
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
  bell: { backgroundColor: 'rgba(192, 38, 111, 0.05)', borderRadius: 12 }
});
