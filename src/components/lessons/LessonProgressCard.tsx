import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, Platform } from 'react-native';
import { Circle as ProgressCircle } from 'react-native-progress';
import { useAppTheme } from '../../context/ThemeContext';
import { IconButton, Surface } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

interface Props {
  title: string;
  thumbnail: any;
  progress: number;
  duration: string;
  isLocked: boolean;
  onPress: () => void;
}

const LessonProgressCard = ({ title, thumbnail, progress, duration, isLocked, onPress }: Props) => {
  const { isDarkMode } = useAppTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const theme = {
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#A1A1AA' : '#6B7280',
    border: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
  };

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <TouchableOpacity
      onPress={isLocked ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={styles.touchable}
    >
      <Animated.View style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border, transform: [{ scale }] }
      ]}>
        <View style={styles.imageContainer}>
          <Image source={thumbnail} style={styles.thumbnail} />
          {isLocked ? (
            <View style={styles.lockOverlay}>
              <Surface style={styles.lockCircle} elevation={4}>
                <IconButton icon="lock" iconColor="#C0266F" size={24} />
              </Surface>
            </View>
          ) : (
            <View style={styles.playBadge}>
               <IconButton icon="play" iconColor="#fff" size={20} />
            </View>
          )}
        </View>

        <View style={styles.info}>
          <View style={styles.textLeft}>
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{title}</Text>
            <View style={styles.metaRow}>
                <IconButton icon="clock-outline" size={14} iconColor={theme.subText} style={styles.miniIcon} />
                <Text style={[styles.duration, { color: theme.subText }]}>{duration}</Text>
            </View>
          </View>

          <View style={styles.progressWrapper}>
            <ProgressCircle
              progress={progress / 100}
              size={44}
              thickness={4}
              color="#C0266F"
              unfilledColor={isDarkMode ? '#2C2C2E' : '#F3F4F6'}
              borderWidth={0}
            />
            <Text style={[styles.progressText, { color: theme.text }]}>{progress}%</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: { flex: 1, margin: 8 },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 },
      android: { elevation: 3 }
    })
  },
  imageContainer: { height: 120, position: 'relative' },
  thumbnail: { width: '100%', height: '100%' },
  lockOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  lockCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  playBadge: { position: 'absolute', bottom: 10, right: 10, backgroundColor: '#C0266F', borderRadius: 12 },
  info: { padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textLeft: { flex: 1, marginRight: 10 },
  title: { fontSize: 15, fontWeight: '800' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: -4 },
  miniIcon: { margin: 0, padding: 0, width: 20 },
  duration: { fontSize: 12, fontWeight: '600' },
  progressWrapper: { justifyContent: 'center', alignItems: 'center' },
  progressText: { position: 'absolute', fontSize: 10, fontWeight: '800' },
});

export default LessonProgressCard;
