import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Welcome() {
  const navigation = useNavigation();

  const handle_Navigation_to_Signup = () => {
    navigation.navigate('signup');
  };

  const handle_Navigation_to_Login = () => {
    navigation.navigate('login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.circleWrapper}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Your Health,{'\n'}Simplified</Text>

        <Text style={styles.subtitle}>
          Manage appointments and track your{'\n'}well-being with ease.
        </Text>

        <TouchableOpacity
          onPress={handle_Navigation_to_Signup}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Create your account"
        >
          <LinearGradient colors={['#00A8CC', '#0091EA']} style={styles.button}>
            <Text style={styles.buttonText}>Create Your Account</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={handle_Navigation_to_Login}
            accessibilityRole="link"
          >
            Sign In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#E9F3F5',
  },

  circleWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 120,
  },
  outerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  innerCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#008C8C',
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },

  button: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  footerText: {
    fontSize: 13,
    color: '#6B7280',
  },

  link: {
    color: '#0088CC',
    fontWeight: '600',
  },
});
