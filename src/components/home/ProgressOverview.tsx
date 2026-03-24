import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, Surface, ProgressBar, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../context/ThemeContext';

const ProgressOverview = () => {
  const { isDarkMode } = useAppTheme();

  const theme = {
    surface: isDarkMode ? '#1C1C1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    border: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.03)',
    ringTrack: isDarkMode ? '#2C2C2E' : '#F3F4F6',
  };

  return (
    <Surface
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          borderWidth: isDarkMode ? 1 : 0
        }
      ]}
      elevation={isDarkMode ? 0 : 2}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Weekly Activity</Text>
        <IconButton icon="dots-horizontal" size={20} iconColor={isDarkMode ? '#A1A1AA' : '#6B7280'} />
      </View>

      <View style={styles.content}>
        <View style={styles.mainStat}>
            {/* Background Ring Track */}
            <View style={[styles.ring, { borderColor: theme.ringTrack }]}>
                <Text style={[styles.bigNumber, { color: '#C0266F' }]}>68%</Text>
                <Text style={[styles.label, { color: isDarkMode ? '#A1A1AA' : '#6B7280' }]}>Done</Text>
                {/* Active Progress Overlay (Simulated via border) */}
                <View style={[styles.ringActive, { borderColor: '#C0266F' }]} />
            </View>
        </View>

        <View style={styles.details}>
            <StatItem label="Beginner" val={0.85} color="#C0266F" isDarkMode={isDarkMode} />
            <StatItem label="Vocabulary" val={0.45} color="#8B5CF6" isDarkMode={isDarkMode} />
        </View>
      </View>
    </Surface>
  );
};

const StatItem = ({ label, val, color, isDarkMode }: any) => (
    <View style={styles.statItem}>
        <View style={styles.statLabelRow}>
            <Text style={[styles.statLabelText, { color: isDarkMode ? '#E5E7EB' : '#374151' }]}>{label}</Text>
            <Text style={[styles.statPercent, { color }]}>{(val * 100).toFixed(0)}%</Text>
        </View>
        <ProgressBar
          progress={val}
          color={color}
          style={[styles.bar, { backgroundColor: isDarkMode ? '#2C2C2E' : '#E5E7EB' }]}
        />
    </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 28,
    marginTop: 10,
    ...Platform.select({
        ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12 },
        android: { elevation: 3 }
    })
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  content: { flexDirection: 'row', alignItems: 'center' },
  mainStat: { width: 100, alignItems: 'center' },
  ring: { width: 90, height: 90, borderRadius: 45, borderWidth: 6, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  ringActive: { position: 'absolute', width: 90, height: 90, borderRadius: 45, borderWidth: 6, borderLeftColor: 'transparent', borderBottomColor: 'transparent', transform: [{ rotate: '45deg' }] },
  bigNumber: { fontSize: 22, fontWeight: '900' },
  label: { fontSize: 10, textTransform: 'uppercase', fontWeight: '700' },
  details: { flex: 1, marginLeft: 25 },
  statItem: { marginBottom: 15 },
  statLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  statLabelText: { fontSize: 13, fontWeight: '600' },
  statPercent: { fontSize: 13, fontWeight: '700' },
  bar: { height: 6, borderRadius: 3 },
});

export default ProgressOverview;
