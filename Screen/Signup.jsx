import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { BASE_URI } from '../utils/api';
import axios from 'axios';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../utils/theme';

export default function SignUpScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [focusedInput, setFocusedInput] = useState(null);

  let navigation = useNavigation();

  const signupHandle = async () => {
    try {
      console.log('Signup payload ->', signup);
      const test = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      console.log('Public test status:', test.status);
      const res = await axios.post(`${BASE_URI}/api/signup`, signup, { timeout: 15000 });
      console.log('Signup success ->', res.data);
      Alert.alert('Success', 'Account created');
      navigation.navigate('login');
    } catch (error) {
      console.log('Signup caught error ->', {
        message: error?.message,
        code: error?.code,
        config: error?.config && { url: error.config.url, method: error.config.method },
        hasRequest: !!error?.request,
        responseStatus: error?.response?.status,
        responseData: error?.response?.data,
      });
      Alert.alert('Error', error?.message || 'Signup failed');
    }
  };

  const handle_Navigation_login = () => {
    navigation.navigate('login');
  };

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <LinearGradient
            colors={[colors.accent.purple, colors.accent.cyan]}
            style={styles.iconCircle}
          >
            <Icon name="user-plus" size={28} color="#fff" />
          </LinearGradient>
        </View>

        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>Manage your health effortlessly</Text>

        <View style={styles.glassCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.cardGradient}
          >
            <View style={[
              styles.inputContainer,
              focusedInput === 'name' && styles.inputFocused
            ]}>
              <Icon name="user" size={20} color={colors.accent.purple} />
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor={colors.text.tertiary}
                style={styles.input}
                onChangeText={val => setSignup({ ...signup, name: val })}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={[
              styles.inputContainer,
              focusedInput === 'email' && styles.inputFocused
            ]}>
              <Icon name="mail" size={20} color={colors.accent.purple} />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={colors.text.tertiary}
                keyboardType="email-address"
                style={styles.input}
                onChangeText={val => setSignup({ ...signup, email: val })}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={[
              styles.inputContainer,
              focusedInput === 'password' && styles.inputFocused
            ]}>
              <Icon name="lock" size={20} color={colors.accent.purple} />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={colors.text.tertiary}
                secureTextEntry={!passwordVisible}
                style={styles.input}
                onChangeText={val => setSignup({ ...signup, password: val })}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.text.tertiary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={signupHandle}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[colors.accent.purple, colors.accent.cyan]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text
                style={styles.link}
                onPress={handle_Navigation_login}
              >
                Sign In
              </Text>
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingTop: spacing.xxl * 2,
  },

  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    ...typography.h2,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },

  glassCard: {
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.lg,
  },
  cardGradient: {
    padding: spacing.xl,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glass.light,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.glass.border,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    height: 56,
  },
  inputFocused: {
    borderColor: colors.accent.purple,
    borderWidth: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },

  button: {
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  buttonText: {
    ...typography.bodyBold,
    fontSize: 17,
  },

  footerText: {
    ...typography.caption,
    fontSize: 15,
    textAlign: 'center',
  },
  link: {
    color: colors.accent.purple,
    fontWeight: '700',
  },

  decorativeCircle1: {
    position: 'absolute',
    top: 50,
    right: -60,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.accent.cyan,
    opacity: 0.05,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 100,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.accent.purple,
    opacity: 0.05,
  },
});
