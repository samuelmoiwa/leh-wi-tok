import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../context/ThemeContext';

const WordCard = ({ word, onDelete }: { word: any; onDelete: () => void }) => {
  const { isDarkMode } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }]}>
      <Image
        source={word.illustrationUri ? { uri: word.illustrationUri } : require('../../../assets/images/greeting.png')}
        style={styles.image}
      />
      <View style={styles.cardInfo}>
        <View style={styles.row}>
          <Text style={[styles.word, { color: isDarkMode ? '#fff' : '#111827' }]}>{word.word}</Text>
          <IconButton icon="delete-outline" size={20} iconColor="#EF4444" onPress={onDelete} />
        </View>
        <Text style={[styles.definition, { color: isDarkMode ? '#A1A1AA' : '#6B7280' }]} numberOfLines={2}>
          {word.definition}
        </Text>
        <View style={styles.tag}>
            <Text style={styles.tagText}>{word.category}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', borderRadius: 24, padding: 12, marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 },
      android: { elevation: 2 }
    })
  },
  image: { width: 90, height: 90, borderRadius: 18, backgroundColor: '#F3F4F6' },
  cardInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  word: { fontSize: 18, fontWeight: '800' },
  definition: { fontSize: 13, lineHeight: 18 },
  tag: { alignSelf: 'flex-start', backgroundColor: 'rgba(192, 38, 111, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 8 },
  tagText: { color: '#C0266F', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
});

export default WordCard;
