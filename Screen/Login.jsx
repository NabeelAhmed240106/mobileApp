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
import axios from 'axios';
import { BASE_URI } from '../utils/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../utils/theme';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });
  const [focusedInput, setFocusedInput] = useState(null);

  let navigation = useNavigation();

  const loginHandle = async () => {
    try {
      if (!loginUser.email || !loginUser.password) {
        return Alert.alert('Validation', 'Email and password are required');
      }

      const res = await axios.post(`${BASE_URI}/api/login`, loginUser, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      });

      console.log('User Logged In Successfully...', res.data);
      
      const userData = res.data.data || res.data;
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      Alert.alert('Success', 'User Logged In Successfully', [{ text: 'OK' }]);

      navigation.navigate('Tabs');
    } catch (err) {
      console.log(
        'Login Error:',
        err?.response?.status,
        err?.response?.data || err.message,
      );
      const msg = err?.response?.data?.message || 'Invalid Credentials';
      Alert.alert('Error', msg, [{ text: 'OK' }]);
    }
  };

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <LinearGradient
            colors={[colors.accent.cyan, colors.accent.purple]}
            style={styles.iconCircle}
          >
            <Icon name="lock" size={28} color="#fff" />
          </LinearGradient>
        </View>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to manage your health journey</Text>

        <View style={styles.glassCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.cardGradient}
          >
            <View style={[
              styles.inputContainer,
              focusedInput === 'email' && styles.inputFocused
            ]}>
              <Icon name="mail" size={20} color={colors.accent.cyan} />
              <TextInput
                placeholder="Enter your Email"
                placeholderTextColor={colors.text.tertiary}
                style={styles.input}
                keyboardType="email-address"
                onChangeText={text =>
                  setLoginUser(prev => ({ ...prev, email: text }))
                }
                value={loginUser.email}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={[
              styles.inputContainer,
              focusedInput === 'password' && styles.inputFocused
            ]}>
              <Icon name="lock" size={20} color={colors.accent.cyan} />
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor={colors.text.tertiary}
                secureTextEntry={!passwordVisible}
                style={styles.input}
                onChangeText={text =>
                  setLoginUser(prev => ({ ...prev, password: text }))
                }
                value={loginUser.password}
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
              onPress={loginHandle}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[colors.accent.cyan, colors.accent.purple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              New member?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('signup')}
              >
                Register Now
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
    borderColor: colors.accent.cyan,
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
    color: colors.accent.cyan,
    fontWeight: '700',
  },

  decorativeCircle1: {
    position: 'absolute',
    top: 50,
    right: -60,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.accent.purple,
    opacity: 0.05,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 100,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.accent.cyan,
    opacity: 0.05,
  },
});
