import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Modal, TextInput, Button, Text, Portal, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { addWord } from '../../utils/db';
import { useAppTheme } from '../../context/ThemeContext';
import Toast from 'react-native-toast-message';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onAdd: () => void;
}

const CATEGORIES = ['Greetings', 'Animals', 'Food', 'Colors', 'Family', 'Numbers'];

const AddWordModal = ({ visible, onDismiss, onAdd }: Props) => {
  const { isDarkMode } = useAppTheme();
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [category, setCategory] = useState('Greetings');
  const [illustrationUri, setIllustrationUri] = useState<string | null>(null);

  const theme = {
    card: isDarkMode ? '#1C1C1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    inputBg: isDarkMode ? '#2C2C2E' : '#F3F4F6',
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) setIllustrationUri(result.assets[0].uri);
  };

  const handleAdd = async () => {
    if (!word.trim() || !definition.trim()) {
      notify.error('Missing Info', 'Please provide a word and definition');
      return;
    }
    try {
      await addWord(word.trim(), definition.trim(), category, illustrationUri);
      setWord(''); setDefinition(''); setIllustrationUri(null);
      onAdd();
      onDismiss();
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Database Error',
        text2: 'Could not save the sign.'
      });
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modal, { backgroundColor: theme.card }]}>
        <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Add New Sign</Text>
            <IconButton icon="close" size={20} onPress={onDismiss} style={styles.closeBtn} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image Picker Area */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={pickImage}
            style={[styles.imagePicker, { backgroundColor: theme.inputBg }]}
          >
            {illustrationUri ? (
              <Image source={{ uri: illustrationUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholder}>
                <IconButton icon="camera-plus" iconColor="#C0266F" size={32} />
                <Text style={styles.placeholderText}>Add Illustration</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            label="Word / Sign"
            value={word}
            onChangeText={setWord}
            mode="flat"
            style={[styles.input, { backgroundColor: 'transparent' }]}
            activeUnderlineColor="#C0266F"
          />

          <TextInput
            label="Definition"
            value={definition}
            onChangeText={setDefinition}
            mode="flat"
            multiline
            numberOfLines={3}
            style={[styles.input, { backgroundColor: 'transparent' }]}
            activeUnderlineColor="#C0266F"
          />

          {/* Category Selector */}
          <Text style={[styles.label, { color: theme.text }]}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={[
                  styles.catChip,
                  { backgroundColor: category === cat ? '#C0266F' : theme.inputBg }
                ]}
              >
                <Text style={[styles.catText, { color: category === cat ? '#fff' : (isDarkMode ? '#A1A1AA' : '#6B7280') }]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Button
            mode="contained"
            onPress={handleAdd}
            style={styles.addButton}
            contentStyle={styles.btnContent}
          >
            Save to Dictionary
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 24,
    margin: 20,
    borderRadius: 32,
    maxHeight: '85%',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
      android: { elevation: 10 }
    })
  },
  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  closeBtn: { position: 'absolute', right: -10 },
  imagePicker: {
    height: 160,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#C0266F',
    borderStyle: 'dashed',
    overflow: 'hidden',
    marginBottom: 20
  },
  previewImage: { width: '100%', height: '100%' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#C0266F', fontWeight: '700', marginTop: -5 },
  input: { marginBottom: 15, fontSize: 16 },
  label: { fontSize: 14, fontWeight: '800', marginTop: 10, marginBottom: 12, textTransform: 'uppercase', opacity: 0.6 },
  catScroll: { marginBottom: 25 },
  catChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, marginRight: 8 },
  catText: { fontSize: 13, fontWeight: '700' },
  addButton: { borderRadius: 16, backgroundColor: '#C0266F', marginTop: 10 },
  btnContent: { paddingVertical: 8 },
});

export default AddWordModal;
