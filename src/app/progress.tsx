import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useAppTheme } from '../context/ThemeContext';
import OverallProgress from '../components/progress/OverallProgress';
import LevelProgressList from '../components/progress/LevelProgressList';
import { getAllProgress } from '../utils/db';

const ProgressScreen = () => {
  const { isDarkMode } = useAppTheme();
  const router = useRouter();
  const [progressData, setProgressData] = useState<any[]>([]);

  useEffect(() => {
    const loadProgress = async () => {
      const data = await getAllProgress();
      // Mocking data if DB is empty for UI testing
      setProgressData(data.length > 0 ? data : [
        { level: 'Beginner', completedLessons: 8, totalLessons: 10, icon: 'school' },
        { level: 'Intermediate', completedLessons: 3, totalLessons: 12, icon: 'trending-up' },
        { level: 'Advanced', completedLessons: 0, totalLessons: 15, icon: 'star' },
      ]);
    };
    loadProgress();
  }, []);

  const totalCompleted = progressData.reduce((sum, l) => sum + l.completedLessons, 0);
  const totalLessons = progressData.reduce((sum, l) => sum + l.totalLessons, 0);
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FA' }]} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconButton icon="chevron-left" iconColor="#C0266F" size={28} style={{ margin: 0 }} />
          <Text style={styles.backText}>Home</Text>
        </TouchableOpacity>
        <Text style={[styles.navTitle, { color: isDarkMode ? '#fff' : '#111827' }]}>My Progress</Text>
        <IconButton icon="share-variant" iconColor="#C0266F" size={22} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <OverallProgress overallProgress={overallProgress} totalCompleted={totalCompleted} />

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#111827' }]}>Course Breakdown</Text>
        </View>

        <LevelProgressList progressData={progressData} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginLeft: -5 },
  backText: { color: '#C0266F', fontSize: 16, fontWeight: '600', marginLeft: -12 },
  navTitle: { fontSize: 18, fontWeight: '800' },
  sectionHeader: { paddingHorizontal: 20, marginTop: 10, marginBottom: 15 },
  sectionTitle: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
});

export default ProgressScreen;
