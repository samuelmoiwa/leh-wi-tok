import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Surface, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../context/ThemeContext';

const mockLessons = [
  { id: '1', title: 'Greetings', progress: 0.75, color: '#FFEDF5', iconColor: '#C0266F' },
  { id: '2', title: 'Numbers', progress: 0.40, color: '#EEF2FF', iconColor: '#4F46E5' },
  { id: '3', title: 'Family', progress: 0.90, color: '#ECFDF5', iconColor: '#10B981' },
];

const ContinueLearning = () => {
  const { isDarkMode } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#111827' }]}>Continue Learning</Text>
      <FlatList
        horizontal
        data={mockLessons}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        renderItem={({ item }) => (
          <Surface style={[styles.card, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }]} elevation={1}>
            <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#2D1622' : item.color }]}>
                <IconButton icon="play-circle" iconColor={item.iconColor} size={28} />
            </View>
            <Text style={[styles.lessonTitle, { color: isDarkMode ? '#fff' : '#111827' }]}>{item.title}</Text>
            <Text style={styles.progressText}>{(item.progress * 100)}% complete</Text>
          </Surface>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 25, marginBottom: 100 },
  title: { fontSize: 18, fontWeight: '800', marginLeft: 16, marginBottom: 15 },
  card: { width: 150, borderRadius: 24, padding: 16, marginRight: 12, alignItems: 'flex-start' },
  iconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  lessonTitle: { fontSize: 16, fontWeight: '700' },
  progressText: { fontSize: 12, opacity: 0.6, marginTop: 4, fontWeight: '500' },
});

export default ContinueLearning;
