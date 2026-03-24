import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import { useAppTheme } from '../../context/ThemeContext';

interface Props {
  overallProgress: number;
  totalCompleted: number;
}

const OverallProgress = ({ overallProgress, totalCompleted }: Props) => {
  const { isDarkMode } = useAppTheme();

  return (
    <View style={[styles.heroCard, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }]}>
      <View style={styles.circleWrapper}>
        <Progress.Circle
          size={160}
          progress={overallProgress / 100}
          thickness={14}
          color="#C0266F"
          unfilledColor={isDarkMode ? '#2C2C2E' : '#F3F4F6'}
          borderWidth={0}
          strokeCap="round"
        />
        <View style={styles.absoluteCenter}>
          <Text style={[styles.percentText, { color: isDarkMode ? '#fff' : '#111827' }]}>
            {overallProgress}%
          </Text>
          <Text style={styles.subText}>Completed</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: isDarkMode ? '#fff' : '#111827' }]}>{totalCompleted}</Text>
          <Text style={styles.statLabel}>Lessons Done</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: isDarkMode ? '#fff' : '#111827' }]}>🔥 12</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    margin: 20,
    borderRadius: 35,
    padding: 30,
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
      android: { elevation: 5 }
    })
  },
  circleWrapper: { position: 'relative', justifyContent: 'center', alignItems: 'center' },
  absoluteCenter: { position: 'absolute', alignItems: 'center' },
  percentText: { fontSize: 42, fontWeight: '900', letterSpacing: -1 },
  subText: { fontSize: 14, fontWeight: '700', color: '#C0266F', textTransform: 'uppercase', marginTop: -5 },
  statsRow: { flexDirection: 'row', marginTop: 30, alignItems: 'center', width: '100%' },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 12, color: '#9CA3AF', fontWeight: '600', marginTop: 2 },
  divider: { width: 1, height: 30, backgroundColor: '#E5E7EB', opacity: 0.5 }
});

export default OverallProgress;
