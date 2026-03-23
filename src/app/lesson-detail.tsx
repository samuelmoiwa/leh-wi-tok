import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { Text, IconButton, ProgressBar, Button, Surface } from 'react-native-paper';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../context/ThemeContext';

const LessonDetailScreen = () => {
  const { isDarkMode } = useAppTheme();
  const router = useRouter();
  const { title, progress, duration } = useLocalSearchParams();
  const progressVal = parseFloat(progress as string) / 100;

  const theme = {
    bg: isDarkMode ? '#121212' : '#F8F9FA',
    card: isDarkMode ? '#1C1C1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#A1A1AA' : '#6B7280',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header Navigation */}
      <View style={styles.header}>
        <IconButton icon="chevron-left" size={28} iconColor="#C0266F" onPress={() => router.back()} />
        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>Lesson Details</Text>
        <IconButton icon="share-variant-outline" size={24} iconColor={theme.subText} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Media Preview Area */}
        <Surface style={styles.videoContainer} elevation={4}>
          <Image
            source={require('../../assets/images/greeting.png')}
            style={styles.previewImage}
          />
          <View style={styles.playOverlay}>
            <TouchableOpacity style={styles.playButton}>
              <IconButton icon="play" iconColor="#fff" size={42} />
            </TouchableOpacity>
          </View>
        </Surface>

        {/* Content Info */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={[styles.lessonTitle, { color: theme.text }]}>{title}</Text>
            <Surface style={styles.durationBadge} elevation={0}>
                <Text style={styles.durationText}>{duration}</Text>
            </Surface>
          </View>

          <Text style={[styles.description, { color: theme.subText }]}>
            In this lesson, you will master the foundational signs for everyday interactions.
            We cover greetings, introductions, and polite phrases to help you start conversations
            confidently in sign language.
          </Text>

          {/* Progress Section */}
          <Surface style={[styles.progressCard, { backgroundColor: theme.card }]} elevation={1}>
            <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: theme.text }]}>Your Progress</Text>
                <Text style={styles.percentText}>{progress}%</Text>
            </View>
            <ProgressBar progress={progressVal} color="#C0266F" style={styles.bar} />
            <Text style={styles.hintText}>Finish the video to unlock the next quiz!</Text>
          </Surface>

          {/* Curriculum Preview */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>What's inside</Text>
          <ModuleItem title="Introduction to Hand Shapes" time="2:30" completed={true} />
          <ModuleItem title="The 'Hello' Sign Variation" time="4:15" completed={progressVal > 0.5} />
          <ModuleItem title="Common Polite Phrases" time="5:45" completed={false} />
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View style={[styles.footer, { backgroundColor: theme.bg, borderTopColor: isDarkMode ? '#2C2C2E' : '#E5E7EB' }]}>
        <Button
          mode="contained"
          buttonColor="#C0266F"
          style={styles.mainButton}
          contentStyle={styles.buttonContent}
          onPress={() => console.log('Starting Lesson...')}
        >
          {progressVal > 0 ? "Continue Learning" : "Start Lesson"}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const ModuleItem = ({ title, time, completed }: any) => {
    const { isDarkMode } = useAppTheme();
    return (
        <View style={styles.moduleRow}>
            <IconButton
                icon={completed ? "check-circle" : "play-circle-outline"}
                iconColor={completed ? "#10B981" : "#C0266F"}
                size={22}
            />
            <Text style={[styles.moduleTitle, { color: isDarkMode ? '#E5E7EB' : '#374151' }]}>{title}</Text>
            <Text style={styles.moduleTime}>{time}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8 },
  headerTitle: { fontSize: 18, fontWeight: '800', flex: 1, textAlign: 'center' },
  scrollContent: { paddingBottom: 100 },
  videoContainer: { margin: 20, height: 220, borderRadius: 30, overflow: 'hidden', backgroundColor: '#000' },
  previewImage: { width: '100%', height: '100%', opacity: 0.8 },
  playOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  playButton: { backgroundColor: 'rgba(192, 38, 111, 0.9)', borderRadius: 40, width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  infoSection: { paddingHorizontal: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  lessonTitle: { fontSize: 24, fontWeight: '900', flex: 1, marginRight: 10 },
  durationBadge: { backgroundColor: 'rgba(192, 38, 111, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  durationText: { color: '#C0266F', fontWeight: '800', fontSize: 12 },
  description: { fontSize: 15, lineHeight: 22, marginBottom: 25 },
  progressCard: { padding: 20, borderRadius: 24, marginBottom: 30 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressLabel: { fontWeight: '800', fontSize: 16 },
  percentText: { color: '#C0266F', fontWeight: '900' },
  bar: { height: 8, borderRadius: 4 },
  hintText: { marginTop: 12, fontSize: 12, opacity: 0.6, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  moduleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  moduleTitle: { flex: 1, fontSize: 14, fontWeight: '600' },
  moduleTime: { fontSize: 12, opacity: 0.5, fontWeight: '700' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, borderTopWidth: 1 },
  mainButton: { borderRadius: 16, elevation: 0 },
  buttonContent: { paddingVertical: 8 },
});

export default LessonDetailScreen;
