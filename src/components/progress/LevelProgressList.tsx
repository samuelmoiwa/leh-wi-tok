import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, ProgressBar, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../context/ThemeContext';

const LevelProgressList = ({ progressData }: { progressData: any[] }) => {
  const { isDarkMode } = useAppTheme();

  return (
    <View style={styles.container}>
      {progressData.map((item, index) => {
        const progressValue = item.completedLessons / item.totalLessons;
        const isDone = progressValue === 1;

        return (
          <View key={index} style={[styles.levelItem, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }]}>
            <View style={[styles.iconBox, { backgroundColor: isDone ? '#C0266F' : 'rgba(192, 38, 111, 0.1)' }]}>
                <IconButton icon={item.icon || 'school'} iconColor={isDone ? '#fff' : '#C0266F'} size={24} />
            </View>

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={[styles.levelTitle, { color: isDarkMode ? '#fff' : '#111827' }]}>{item.level}</Text>
                    <View style={styles.percPill}>
                        <Text style={styles.percText}>{Math.round(progressValue * 100)}%</Text>
                    </View>
                </View>

                <ProgressBar progress={progressValue} color="#C0266F" style={styles.bar} />

                <Text style={styles.lessonCount}>
                    {item.completedLessons} of {item.totalLessons} lessons completed
                </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  levelItem: { flexDirection: 'row', padding: 16, borderRadius: 24, marginBottom: 15, alignItems: 'center' },
  iconBox: { width: 50, height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, marginLeft: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  levelTitle: { fontSize: 16, fontWeight: '800' },
  percPill: { backgroundColor: 'rgba(192, 38, 111, 0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  percText: { color: '#C0266F', fontSize: 11, fontWeight: '900' },
  bar: { height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.05)' },
  lessonCount: { fontSize: 12, color: '#9CA3AF', fontWeight: '600', marginTop: 8 }
});

export default LevelProgressList;
