// src/components/HomeScreen.tsx
import { View, Text, StyleSheet } from 'react-native';
import FabButton from '../components/FabButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Welcome to Leh Wi Tok</Text>
      <Text style={styles.subtitle}>You have completed onboarding!</Text>

      {/* Beautiful Floating Action Button Menu */}
      <FabButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666' },
});
