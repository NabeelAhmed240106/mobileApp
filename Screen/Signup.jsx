import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  InteractionManager,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { BASE_URI } from '../utils/api';
import axios from 'axios';

export default function SignUpScreen() {
  const [isChecked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
  });

  let navigation = useNavigation();

  const signupHandle = async () => {
    try {
      console.log('Signup payload ->', signup);
      // test call to public API to verify device network
      const test = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      console.log('Public test status:', test.status);
      // real request
      const res = await axios.post(`${BASE_URI}/api/signup`, signup, { timeout: 15000 });
      console.log('Signup success ->', res.data);
      Alert.alert('Success', 'Account created');
      navigation.navigate('login'); // match route name exactly
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Manage your health effortlessly</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={18} color="#9CA3AF" style={styles.icon} />
        <TextInput
          placeholder="Enter your full name"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          onChangeText={val => setSignup({ ...signup, name: val })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="mail" size={18} color="#9CA3AF" style={styles.icon} />
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          style={styles.input}
          onChangeText={val => setSignup({ ...signup, email: val })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={18} color="#9CA3AF" style={styles.icon} />
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          onChangeText={val => setSignup({ ...signup, password: val })}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={18}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>

 

      <TouchableOpacity style={styles.button} onPress={signupHandle}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By creating an account, you agree to our{' '}
        <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={handle_Navigation_login}>
          Log In
        </Text>
      </Text>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 15,
    paddingHorizontal: 12,
    height: 52,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },

  button: {
    width: '100%',
    backgroundColor: '#4C9AFF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  terms: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },

  link: {
    color: '#0EA5E9',
    fontWeight: '600',
  },

  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
  },

  loginLink: {
    color: '#0EA5E9',
    fontWeight: '600',
  },
});
