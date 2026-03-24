import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import { router } from 'expo-router';
import { useAppTheme } from '../context/ThemeContext';
import { useIsFocused } from '@react-navigation/native';

const FabButton = () => {
  const { isDarkMode } = useAppTheme();
  const isFocused = useIsFocused(); // This is the "Kill Switch"
  const [open, setOpen] = useState(false);

  // If the user navigates to Settings or Edit Profile, this returns null
  if (!isFocused) return null;

  const activePink = '#C0266F';
  const darkSurface = '#27272A';
  const lightSurface = '#FFFFFF';

  const actions = [
    {
      icon: 'cog-outline',
      label: 'Settings',
      onPress: () => {
        setOpen(false);
        router.push('/settings');
      },
      style: { backgroundColor: isDarkMode ? darkSurface : lightSurface },
      labelStyle: { color: isDarkMode ? '#FFFFFF' : '#111827' },
    },
    {
      icon: 'chart-line',
      label: 'Progress',
      onPress: () => {
        setOpen(false);
        router.push('/progress');
      },
      style: { backgroundColor: isDarkMode ? darkSurface : lightSurface },
      labelStyle: { color: isDarkMode ? '#FFFFFF' : '#111827' },
    },
    {
      icon: 'translate',
      label: 'Tok (Translator)',
      onPress: () => {
        setOpen(false);
        router.push('/tok');
      },
      style: { backgroundColor: isDarkMode ? darkSurface : lightSurface },
      labelStyle: { color: isDarkMode ? '#FFFFFF' : '#111827' },
    },
    {
      icon: 'book-search',
      label: 'Dictionary',
      onPress: () => {
        setOpen(false);
        router.push('/dictionary');
      },
      style: { backgroundColor: isDarkMode ? darkSurface : lightSurface },
      labelStyle: { color: isDarkMode ? '#FFFFFF' : '#111827' },
    },
    {
      icon: 'book-open-page-variant',
      label: 'Lessons',
      onPress: () => {
        setOpen(false);
        router.push('/lessons');
      },
      style: { backgroundColor: isDarkMode ? darkSurface : lightSurface },
      labelStyle: { color: isDarkMode ? '#FFFFFF' : '#111827' },
    },
  ];

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={true}
        icon={open ? 'close' : 'menu'}
        actions={actions}
        onStateChange={({ open: isOpen }) => setOpen(isOpen)}
        fabStyle={[styles.fab, { backgroundColor: activePink }]}
        style={styles.container}
        backdropColor={isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.7)'}
        color="#FFFFFF"
      />
    </Portal>
  );
};

export default FabButton;

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  fab: {
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#C0266F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
