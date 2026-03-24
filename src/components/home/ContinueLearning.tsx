import React from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { Text, Surface, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../context/ThemeContext';

// Ensure this is OUTSIDE the component function
const mockLessons = [
  { id: '1', title: 'Greetings', progress: 0.75, color: '#FFEDF5', iconColor: '#C0266F' },
  { id: '2', title: 'Numbers', progress: 0.40, color: '#EEF2FF', iconColor: '#4F46E5' },
  { id: '3', title: 'Family', progress: 0.90, color: '#ECFDF5', iconColor: '#10B981' },
];

const ContinueLearning = () => {
  const { isDarkMode } = useAppTheme();

  const theme = {
    card: isDarkMode ? '#1C1C1E' : '#FFFFFF',
    title: isDarkMode ? '#FFFFFF' : '#111827',
    border: isDarkMode ? 'rgba(255,255,255,0.08)' : 'transparent',
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.title }]}>Continue Learning</Text>
      <FlatList
        horizontal
        data={mockLessons}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Surface
            style={[
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }
            ]}
            elevation={isDarkMode ? 0 : 1}
          >
            <View style={[styles.iconBox, { backgroundColor: isDarkMode ? 'rgba(192, 38, 111, 0.15)' : item.color }]}>
                <IconButton icon="play-circle" iconColor={item.iconColor} size={28} style={{ margin: 0 }} />
            </View>
            <Text style={[styles.lessonTitle, { color: theme.title }]}>{item.title}</Text>
            <View style={styles.progressContainer}>
                <View style={[styles.miniBar, { backgroundColor: isDarkMode ? '#2C2C2E' : '#F3F4F6' }]}>
                    <View style={[styles.miniProgress, { width: `${item.progress * 100}%`, backgroundColor: item.iconColor }]} />
                </View>
                <Text style={[styles.progressText, { color: isDarkMode ? '#A1A1AA' : '#6B7280' }]}>
                    {(item.progress * 100).toFixed(0)}%
                </Text>
            </View>
          </Surface>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 25, marginBottom: 100 },
  title: { fontSize: 18, fontWeight: '800', marginLeft: 16, marginBottom: 15 },
  card: {
    width: 155,
    borderRadius: 24,
    padding: 16,
    marginRight: 12,
    alignItems: 'flex-start',
    ...Platform.select({
        ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8 },
        android: { elevation: 2 }
    })
  },
  iconBox: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  lessonTitle: { fontSize: 15, fontWeight: '700', letterSpacing: -0.2 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  miniBar: { flex: 1, height: 4, borderRadius: 2, marginRight: 8, overflow: 'hidden' },
  miniProgress: { height: '100%', borderRadius: 2 },
  progressText: { fontSize: 11, fontWeight: '700' },
});

export default ContinueLearning;
