import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router, Stack } from 'expo-router';
import Toast from 'react-native-toast-message'; // Import Toast

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async () => {
    // Validation Logic with Toast
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Required Fields',
        text2: 'Please fill in all the details to continue. 👋',
        position: 'top',
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

    // Simulate API Call
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the Leh Wi Tok community today</Text>
        </View>

        <View style={styles.card}>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="flat"
            activeUnderlineColor="#C0266F"
            style={styles.input}
            left={<TextInput.Icon icon="account-outline" color="#6B7280" />}
          />

          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="flat"
            activeUnderlineColor="#C0266F"
            keyboardType="email-address"
            style={styles.input}
            left={<TextInput.Icon icon="email-outline" color="#6B7280" />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="flat"
            activeUnderlineColor="#C0266F"
            style={styles.input}
            left={<TextInput.Icon icon="lock-outline" color="#6B7280" />}
          />

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            mode="flat"
            activeUnderlineColor="#C0266F"
            style={styles.input}
            left={<TextInput.Icon icon="lock-check-outline" color="#6B7280" />}
          />

          <Button
            mode="contained"
            onPress={handleSignup}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={styles.buttonContent}
            buttonColor="#C0266F"
          >
            {loading ? '' : 'Create Account'}
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingTop: 60 },
  header: { marginBottom: 32, alignItems: 'flex-start' },
  title: { fontSize: 32, fontWeight: '800', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20 },
  input: { backgroundColor: 'transparent', marginBottom: 10 },
  button: { borderRadius: 14, marginTop: 20, elevation: 0 },
  buttonContent: { height: 58 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40, marginBottom: 20 },
  footerText: { color: '#6B7280', fontSize: 15 },
  link: { color: '#C0266F', fontSize: 15, fontWeight: 'bold' },
});
