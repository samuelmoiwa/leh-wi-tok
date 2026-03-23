import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Text, FAB, Searchbar, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useAppTheme } from '../context/ThemeContext';
import WordCard from '../components/dictionary/WordCard';
import AddWordModal from '../components/dictionary/AddWordModal';
import { initDatabase, getAllWords, searchWords, deleteWord } from '../utils/db';
import Toast from 'react-native-toast-message';

const CATEGORIES = ['All', 'Greetings', 'Animals', 'Food', 'Colors', 'Family', 'Numbers'];

const DictionaryScreen = () => {
  const { isDarkMode } = useAppTheme();
  const router = useRouter();
  const [words, setWords] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    initDatabase();
    loadWords();
  }, []);

  const loadWords = async () => {
    const result = await getAllWords();
    setWords(result);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    const result = query.length > 0 ? await searchWords(query) : await getAllWords();
    setWords(result);
  };

  const filteredWords = selectedCategory === 'All'
    ? words
    : words.filter(w => w.category === selectedCategory);

  const handleDelete = async (id: number) => {
    await deleteWord(id);
    Toast.show({
      type: 'success',
      text1: 'Deleted',
      text2: 'Sign removed from dictionary'
    });
    loadWords();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FA' }]} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* --- TOP NAVIGATION BAR --- */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconButton icon="chevron-left" iconColor="#C0266F" size={28} style={{ margin: 0 }} />
          <Text style={styles.backText}>Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#111827' }]}>Dictionary</Text>
        <Searchbar
          placeholder="Search signs..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: isDarkMode ? '#1E1E1E' : '#fff' }]}
          iconColor="#C0266F"
          elevation={0}
        />
      </View>

      <View style={styles.chipWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => {
            const isActive = selectedCategory === item;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={[
                  styles.customChip,
                  { backgroundColor: isActive ? '#C0266F' : (isDarkMode ? '#2C2C2E' : '#E5E7EB') }
                ]}
              >
                <Text style={[styles.chipText, { color: isActive ? '#fff' : (isDarkMode ? '#A1A1AA' : '#6B7280') }]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <FlatList
        data={filteredWords}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <WordCard word={item} onDelete={() => handleDelete(item.id)} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No signs added yet.</Text>}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        color="#FFFFFF"
      />

      <AddWordModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onAdd={loadWords}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topNav: {
    paddingHorizontal: 8,
    marginTop: Platform.OS === 'ios' ? -5 : 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  backText: {
    color: '#C0266F',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: -15,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10
  },
  headerTitle: { fontSize: 32, fontWeight: '900', letterSpacing: -1, marginBottom: 15 },
  searchBar: { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  chipWrapper: { marginVertical: 15 },
  customChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  chipText: { fontSize: 14, fontWeight: '700' },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  emptyText: { textAlign: 'center', marginTop: 50, opacity: 0.5 },
  fab: { position: 'absolute', bottom: 30, right: 30, borderRadius: 20, backgroundColor: '#C0266F' },
});

export default DictionaryScreen;
