import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../context/ThemeContext';

const TranslationHistory = ({ history }: { history: any[] }) => {
  const { isDarkMode } = useAppTheme();
  if (history.length === 0) return null;

  return (
    <View>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#111827' }]}>Recent Phrases</Text>
      {history.map((item) => (
        <View key={item.id} style={[styles.item, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }]}>
          <View style={styles.iconBox}>
             <IconButton icon="translate" iconColor="#C0266F" size={20} />
          </View>
          <View style={{ flex: 1 }}>
             <Text style={[styles.orig, { color: isDarkMode ? '#E5E7EB' : '#374151' }]}>{item.text}</Text>
             <Text style={styles.trans}>Result: {item.signWord}</Text>
          </View>
          <Text style={styles.time}>{item.timestamp}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '900', marginBottom: 15, letterSpacing: -0.5 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 22, marginBottom: 12 },
  iconBox: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(192, 38, 111, 0.08)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  orig: { fontSize: 15, fontWeight: '700' },
  trans: { fontSize: 13, color: '#C0266F', fontWeight: '600', marginTop: 2 },
  time: { fontSize: 11, opacity: 0.4, fontWeight: '800' }
});

export default TranslationHistory;
