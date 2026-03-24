import React, { useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, Image, StatusBar
} from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { router, Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useAppTheme } from '../context/ThemeContext';

export default function Login() {
  const { isDarkMode } = useAppTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dynamic Theme Colors
  const theme = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#A1A1AA' : '#6B7280',
    inputBg: isDarkMode ? '#262626' : 'transparent',
    logoBg: isDarkMode ? '#2D1622' : '#FCE7F3', // Subtle pink tint for dark mode
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Credentials',
        text2: 'Please enter both email and password. 🔑',
      });
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'The email address format is incorrect.',
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Welcome Back! 👋',
        text2: 'Successfully signed into Leh Wi Tok.',
      });
      router.replace('/home');
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Header Section */}
        <View style={styles.header}>
          <Surface style={[styles.logoCircle, { backgroundColor: theme.logoBg }]} elevation={0}>
             <Image
                source={require('../../assets/images/logofile.png')}
                style={styles.logoImage}
                resizeMode="contain"
             />
           </Surface>
           <Text style={[styles.title, { color: theme.text }]}>Leh We Tok</Text>
           <Text style={[styles.subtitle, { color: theme.subText }]}>Sign in to continue your journey</Text>
        </View>

        {/* Login Form Section */}
        <View style={styles.card}>
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="flat"
            activeUnderlineColor="#C0266F"
            textColor={theme.text}
            placeholderTextColor={theme.subText}
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
            activeUnderlineColor="#C0266F"
            textColor={theme.text}
            placeholderTextColor={theme.subText}
            style={[styles.input, { backgroundColor: theme.inputBg }]}
            left={<TextInput.Icon icon="lock-outline" color={theme.subText} />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                color="#C0266F"
              />
            }
          />

          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={[styles.forgotText, { color: theme.subText }]}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={styles.buttonContent}
            buttonColor="#C0266F"
            labelStyle={styles.buttonLabel}
          >
            {loading ? '' : 'Sign In'}
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.subText }]}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 28 },
  header: { alignItems: 'center', marginBottom: 40 },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  logoImage: {
    width: '75%',
    height: '75%',
  },
  title: { fontSize: 30, fontWeight: '900', marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, textAlign: 'center', lineHeight: 22 },
  card: { width: '100%' },
  input: {
    marginBottom: 16,
    height: 64,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  forgotContainer: { alignSelf: 'flex-end', marginBottom: 28, paddingVertical: 4 },
  forgotText: { fontSize: 14, fontWeight: '600' },
  button: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#C0266F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonContent: { height: 60 },
  buttonLabel: { fontSize: 18, fontWeight: '700', letterSpacing: 0.5 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { fontSize: 15 },
  link: { color: '#C0266F', fontSize: 15, fontWeight: '800' },
});
