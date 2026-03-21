import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import FabButton from '../components/FabButton';
import { useAppTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { isDarkMode } = useAppTheme();

  const theme = {
    background: isDarkMode ? '#121212' : '#F8F9FA',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#A1A1AA' : '#666666',
    accent: isDarkMode ? 'rgba(192, 38, 111, 0.1)' : 'rgba(192, 38, 111, 0.05)',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={[styles.glow, { backgroundColor: theme.accent }]} />

      <View style={styles.content}>
        <Surface style={styles.iconCircle} elevation={0}>
           <Text style={{ fontSize: 40 }}>🏠</Text>
        </Surface>

        <Text style={[styles.title, { color: theme.text }]}>
          Welcome to Leh Wi Tok
        </Text>

        <View style={[styles.badge, { backgroundColor: isDarkMode ? '#1E1E1E' : '#E5E7EB' }]}>
          <Text style={[styles.subtitle, { color: theme.subText }]}>
            Onboarding Completed ✨
          </Text>
        </View>
      </View>

      {/* FAB is only rendered here */}
      <FabButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  glow: { position: 'absolute', top: -100, width: 400, height: 400, borderRadius: 200 },
  content: { alignItems: 'center', paddingHorizontal: 30 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20, borderWidth: 1, borderColor: 'rgba(192, 38, 111, 0.2)',
  },
  title: { fontSize: 32, fontWeight: '800', marginBottom: 12, textAlign: 'center' },
  badge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  subtitle: { fontSize: 15, fontWeight: '600' },
});
