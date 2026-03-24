import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router'; // Important for navigation control
import ResponsiveLessonGrid from '../components/lessons/ResponsiveLessonGrid';
import { useAppTheme } from '../context/ThemeContext';

const LEVELS = ['Beginner', 'Basic', 'Intermediate', 'Advanced'];

const mockLessons = {
  Beginner: [
    { id: '1', title: 'Greetings & Intro', thumbnail: require('../../assets/images/greeting.png'), progress: 100, duration: '12 min', isLocked: false },
    { id: '2', title: 'Numbers 1-10', thumbnail: require('../../assets/images/numbers.png'), progress: 85, duration: '8 min', isLocked: false },
    { id: '3', title: 'Primary Colors', thumbnail: require('../../assets/images/progress.png'), progress: 45, duration: '10 min', isLocked: false },
    { id: '4', title: 'Alphabet A-M', thumbnail: require('../../assets/images/dictionary.png'), progress: 10, duration: '15 min', isLocked: false },
    { id: '5', title: 'Alphabet N-Z', thumbnail: require('../../assets/images/dictionary.png'), progress: 0, duration: '15 min', isLocked: false },
  ],
  Basic: [
    { id: '6', title: 'Family Members', thumbnail: require('../../assets/images/family.png'), progress: 20, duration: '15 min', isLocked: false },
    { id: '7', title: 'Common Foods', thumbnail: require('../../assets/images/food.png'), progress: 0, duration: '12 min', isLocked: false },
    { id: '8', title: 'Daily Routine', thumbnail: require('../../assets/images/progress.png'), progress: 0, duration: '18 min', isLocked: false },
    { id: '9', title: 'Days of the Week', thumbnail: require('../../assets/images/numbers.png'), progress: 0, duration: '7 min', isLocked: false },
    { id: '10', title: 'Telling Time', thumbnail: require('../../assets/images/numbers.png'), progress: 0, duration: '14 min', isLocked: true },
  ],
  Intermediate: [
    { id: '11', title: 'At the Market', thumbnail: require('../../assets/images/food.png'), progress: 0, duration: '20 min', isLocked: true },
    { id: '12', title: 'Emotions & Feelings', thumbnail: require('../../assets/images/greeting.png'), progress: 0, duration: '15 min', isLocked: true },
    { id: '13', title: 'Weather Patterns', thumbnail: require('../../assets/images/progress.png'), progress: 0, duration: '12 min', isLocked: true },
    { id: '14', title: 'Emergency Signs', thumbnail: require('../../assets/images/family.png'), progress: 0, duration: '10 min', isLocked: true },
    { id: '15', title: 'Travel & Directions', thumbnail: require('../../assets/images/dictionary.png'), progress: 0, duration: '25 min', isLocked: true },
  ],
  Advanced: [
    { id: '16', title: 'Medical Terms', thumbnail: require('../../assets/images/progress.png'), progress: 0, duration: '30 min', isLocked: true },
    { id: '17', title: 'Legal Basics', thumbnail: require('../../assets/images/dictionary.png'), progress: 0, duration: '35 min', isLocked: true },
    { id: '18', title: 'Workplace Talk', thumbnail: require('../../assets/images/greeting.png'), progress: 0, duration: '22 min', isLocked: true },
    { id: '19', title: 'Storytelling I', thumbnail: require('../../assets/images/family.png'), progress: 0, duration: '40 min', isLocked: true },
    { id: '20', title: 'Abstract Concepts', thumbnail: require('../../assets/images/progress.png'), progress: 0, duration: '45 min', isLocked: true },
  ],
};

const LessonsScreen = () => {
  const { isDarkMode } = useAppTheme();
  const router = useRouter();
  const [activeLevel, setActiveLevel] = useState('Beginner');

  const theme = {
    bg: isDarkMode ? '#121212' : '#F8F9FA',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    tabUnselected: isDarkMode ? '#2C2C2E' : '#E5E7EB',
  };

 const handleLessonPress = (lesson: any) => {
  router.push({
    pathname: "/lesson-detail",
    params: {
      id: lesson.id,
      title: lesson.title,
      progress: lesson.progress,
      duration: lesson.duration
    }
  });
};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* 1. HIDE DEFAULT HEADER: This removes the pink 'home Lessons' space at the top */}
      <Stack.Screen options={{ headerShown: false }} />

      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* 2. CUSTOM MINI NAVIGATION: Cleaner "Back" button */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconButton icon="chevron-left" iconColor="#C0266F" size={28} />
          <Text style={styles.backText}>Home</Text>
        </TouchableOpacity>
      </View>

      {/* 3. TIGHTENED HEADER SECTION */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Course Path</Text>
        <Text style={styles.headerSubtitle}>Follow the trail to mastery</Text>
      </View>

      {/* LEVEL TABS */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {LEVELS.map((level) => {
            const isActive = activeLevel === level;
            return (
              <TouchableOpacity
                key={level}
                activeOpacity={0.7}
                onPress={() => setActiveLevel(level)}
                style={[
                  styles.tab,
                  { backgroundColor: isActive ? '#C0266F' : theme.tabUnselected }
                ]}
              >
                <Text style={[
                  styles.tabText,
                  { color: isActive ? '#fff' : (isDarkMode ? '#A1A1AA' : '#6B7280') }
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ResponsiveLessonGrid
        lessons={mockLessons[activeLevel as keyof typeof mockLessons] || []}
        onLessonPress={handleLessonPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topNav: {
    paddingHorizontal: 8,
    marginTop: Platform.OS === 'ios' ? -5 : 0, // Pull up closer to notch on iOS
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  backText: {
    color: '#C0266F',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: -15, // Negative margin to align with the arrow
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 5, // Tightened from original 15
    paddingBottom: 10
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: -2
  },
  tabsScroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '700',
    fontSize: 14
  },
});

export default LessonsScreen;
