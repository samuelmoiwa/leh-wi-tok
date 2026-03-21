import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, ProgressBar, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../context/ThemeContext';

const ProgressOverview = () => {
  const { isDarkMode } = useAppTheme();
  const theme = {
    surface: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
  };

  return (
    <Surface style={[styles.card, { backgroundColor: theme.surface }]} elevation={1}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Weekly Activity</Text>
        <IconButton icon="dots-horizontal" size={20} />
      </View>

      <View style={styles.content}>
        <View style={styles.mainStat}>
            <View style={styles.ring}>
                <Text style={styles.bigNumber}>68%</Text>
                <Text style={styles.label}>Done</Text>
            </View>
        </View>

        <View style={styles.details}>
            <StatItem label="Beginner" val={0.85} color="#C0266F" icon="school-outline" />
            <StatItem label="Vocabulary" val={0.45} color="#8B5CF6" icon="book-alphabet" />
        </View>
      </View>
    </Surface>
  );
};

const StatItem = ({ label, val, color, icon }: any) => (
    <View style={styles.statItem}>
        <View style={styles.statLabelRow}>
            <Text style={styles.statLabelText}>{label}</Text>
            <Text style={[styles.statPercent, { color }]}>{(val * 100).toFixed(0)}%</Text>
        </View>
        <ProgressBar progress={val} color={color} style={styles.bar} />
    </View>
);

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, padding: 20, borderRadius: 28, marginTop: 10 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  content: { flexDirection: 'row', alignItems: 'center' },
  mainStat: { width: 100, alignItems: 'center' },
  ring: { width: 90, height: 90, borderRadius: 45, borderWidth: 6, borderColor: '#C0266F', justifyContent: 'center', alignItems: 'center' },
  bigNumber: { fontSize: 24, fontWeight: '900', color: '#C0266F' },
  label: { fontSize: 10, textTransform: 'uppercase', opacity: 0.6, fontWeight: '700' },
  details: { flex: 1, marginLeft: 25 },
  statItem: { marginBottom: 15 },
  statLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  statLabelText: { fontSize: 13, fontWeight: '600', opacity: 0.7 },
  statPercent: { fontSize: 13, fontWeight: '700' },
  bar: { height: 6, borderRadius: 3 },
});

export default ProgressOverview;
