import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../utils/theme';

const { width } = Dimensions.get('window');

export default function Welcome() {
  const navigation = useNavigation();

  const handle_Navigation_to_Signup = () => {
    navigation.navigate('signup');
  };

  const handle_Navigation_to_Login = () => {
    navigation.navigate('login');
  };

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary, colors.background.tertiary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoWrapper}>
          <LinearGradient
            colors={[colors.accent.cyan, colors.accent.purple]}
            style={styles.outerCircle}
          >
            <View style={styles.innerCircle} />
          </LinearGradient>
          <View style={[styles.glowCircle, { shadowColor: colors.accent.cyan }]} />
        </View>

        <View style={styles.glassCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.cardGradient}
          >
            <Text style={styles.title}>
              Your Health,{'\n'}
              <Text style={styles.titleAccent}>Simplified</Text>
            </Text>

            <Text style={styles.subtitle}>
              Manage appointments and track your{'\n'}well-being with ease.
            </Text>

            <TouchableOpacity
              onPress={handle_Navigation_to_Signup}
              activeOpacity={0.85}
              style={styles.buttonWrapper}
            >
              <LinearGradient
                colors={[colors.accent.cyan, colors.accent.purple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Create Your Account</Text>
              </LinearGradient>
              <View style={[styles.buttonGlow, { shadowColor: colors.accent.cyan }]} />
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text
                style={styles.link}
                onPress={handle_Navigation_to_Login}
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xxl * 2,
  },

  logoWrapper: {
    alignItems: 'center',
    marginBottom: spacing.xxl * 2,
    position: 'relative',
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background.primary,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  glowCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 10,
  },

  glassCard: {
    width: '100%',
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.lg,
  },
  cardGradient: {
    padding: spacing.xl,
    alignItems: 'center',
  },

  title: {
    ...typography.h1,
    fontSize: 34,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  titleAccent: {
    color: colors.accent.cyan,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },

  buttonWrapper: {
    width: '100%',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  button: {
    width: '100%',
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  buttonText: {
    ...typography.bodyBold,
    fontSize: 17,
  },
  buttonGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.xl,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },

  footerText: {
    ...typography.caption,
    fontSize: 15,
  },
  link: {
    color: colors.accent.cyan,
    fontWeight: '700',
  },

  decorativeCircle1: {
    position: 'absolute',
    top: 100,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.accent.purple,
    opacity: 0.1,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 150,
    left: -70,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.accent.cyan,
    opacity: 0.08,
  },
});
