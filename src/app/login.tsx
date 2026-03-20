import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity,
    KeyboardAvoidingView, Platform, ScrollView, Image
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router, Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
             {/* Fixed: Image component with proper styling */}
             <Image
                source={require('../../assets/images/logofile.png')}
                style={styles.logoImage}
                resizeMode="contain"
             />
           </View>
           <Text style={styles.title}>Leh We Tok</Text>
           <Text style={styles.subtitle}>Sign in to continue your journey</Text>
        </View>

        {/* Login Form Card */}
        <View style={styles.card}>
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="flat"
            activeUnderlineColor="#C0266F"
            textColor='#303133'
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="email-outline" color="#6B7280" />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            mode="flat"
            activeUnderlineColor="#C0266F"
            textColor='#303133'
            style={styles.input}
            left={<TextInput.Icon icon="lock-outline" color="#6B7280" />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                color="#C0266F"
              />
            }
          />

          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={styles.buttonContent}
            buttonColor="#C0266F"
          >
            {loading ? '' : 'Sign In'}
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 100, // Slightly larger to fit a real logo
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden', // Ensures image stays inside the circle
  },
  logoImage: {
    width: '70%',
    height: '70%',
  },
  title: { fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#6B7280', textAlign: 'center' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20 },
  input: { backgroundColor: 'transparent', marginBottom: 12 },
  forgotContainer: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotText: { color: '#6B7280', fontSize: 13, fontWeight: '500' },
  button: { borderRadius: 14, elevation: 0 },
  buttonContent: { height: 56 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { color: '#6B7280', fontSize: 15 },
  link: { color: '#C0266F', fontSize: 15, fontWeight: 'bold' },
});
