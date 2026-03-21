import React, { useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, StatusBar
} from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { router, Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useAppTheme } from '../context/ThemeContext';

export default function Signup() {
  const { isDarkMode } = useAppTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dynamic Theme Colors
  const theme = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#A1A1AA' : '#6B7280',
    inputBg: isDarkMode ? '#1E1E1E' : 'transparent',
    accent: '#C0266F',
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Required Fields',
        text2: 'Please fill in all the details to continue. 👋',
      });
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Match Error',
        text2: 'Passwords do not match. Please try again.',
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Account Created! 🎉',
        text2: 'Welcome to the Leh Wi Tok community.',
      });
      router.replace('/home');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={[styles.accentLine, { backgroundColor: theme.accent }]} />
          <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: theme.subText }]}>
            Join the Leh Wi Tok community today
          </Text>
        </View>

        {/* Signup Form */}
        <View style={styles.form}>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="flat"
            activeUnderlineColor={theme.accent}
            textColor={theme.text}
            style={[styles.input, { backgroundColor: theme.inputBg }]}
            left={<TextInput.Icon icon="account-outline" color={theme.subText} />}
          />

          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="flat"
            activeUnderlineColor={theme.accent}
            textColor={theme.text}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { backgroundColor: theme.inputBg }]}
            left={<TextInput.Icon icon="email-outline" color={theme.subText} />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            mode="flat"
            activeUnderlineColor={theme.accent}
            textColor={theme.text}
            style={[styles.input, { backgroundColor: theme.inputBg }]}
            left={<TextInput.Icon icon="lock-outline" color={theme.subText} />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                color={theme.accent}
              />
            }
          />

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            mode="flat"
            activeUnderlineColor={theme.accent}
            textColor={theme.text}
            style={[styles.input, { backgroundColor: theme.inputBg }]}
            left={<TextInput.Icon icon="lock-check-outline" color={theme.subText} />}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                color={theme.accent}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleSignup}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={styles.buttonContent}
            buttonColor={theme.accent}
            labelStyle={styles.buttonLabel}
          >
            {loading ? '' : 'Create Account'}
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.subText }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
    paddingTop: Platform.OS === 'ios' ? 80 : 60
  },
  header: { marginBottom: 40, alignItems: 'flex-start' },
  accentLine: {
    width: 40,
    height: 5,
    borderRadius: 3,
    marginBottom: 16
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 8,
    letterSpacing: -1
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24
  },
  form: { width: '100%' },
  input: {
    marginBottom: 14,
    height: 64,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  button: {
    borderRadius: 16,
    marginTop: 24,
    elevation: 4,
    shadowColor: '#C0266F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonContent: { height: 60 },
  buttonLabel: { fontSize: 18, fontWeight: '700' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  footerText: { fontSize: 15 },
  link: { color: '#C0266F', fontSize: 15, fontWeight: '800' },
});
