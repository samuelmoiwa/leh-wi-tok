import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { useAppTheme } from '../../context/ThemeContext';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onTranslate: () => void;
}

const TranslatorInput = ({ value, onChangeText, onTranslate }: Props) => {
  const { isDarkMode } = useAppTheme();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type text to translate..."
        value={value}
        onChangeText={onChangeText}
        mode="flat"
        multiline
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        placeholderTextColor={isDarkMode ? '#4B5563' : '#9CA3AF'}
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF', color: isDarkMode ? '#fff' : '#000' }
        ]}
      />
      <TouchableOpacity activeOpacity={0.9} onPress={onTranslate} style={styles.btn}>
        <Text style={styles.btnText}>Translate to Sign</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 30 },
  input: {
    height: 110,
    borderRadius: 24,
    paddingHorizontal: 18,
    fontSize: 16,
    textAlignVertical: 'top',
    paddingTop: 15,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  btn: {
    backgroundColor: '#C0266F',
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    marginHorizontal: 15,
    shadowColor: '#C0266F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '800' }
});

export default TranslatorInput;
