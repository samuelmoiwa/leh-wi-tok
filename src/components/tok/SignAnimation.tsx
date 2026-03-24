import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../context/ThemeContext';

const SignAnimation = ({ sign }: { sign: { word: string; animation: any } }) => {
  const { isDarkMode } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }]}>
       <View style={styles.badge}>
         <Text style={styles.badgeText}>Visual Output</Text>
       </View>
       <LottieView source={sign.animation} autoPlay loop style={styles.lottie} />
       <Text style={[styles.signWord, { color: isDarkMode ? '#fff' : '#111827' }]}>
          {sign.word}
       </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 32, padding: 20, alignItems: 'center', marginBottom: 30, elevation: 1 },
  badge: { backgroundColor: 'rgba(192, 38, 111, 0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, marginBottom: 5 },
  badgeText: { color: '#C0266F', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },
  lottie: { width: 260, height: 260 },
  signWord: { fontSize: 34, fontWeight: '900', letterSpacing: -1, marginTop: -10 },
});

export default SignAnimation;
