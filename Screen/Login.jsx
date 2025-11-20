import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { BASE_URI } from '../utils/api';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [isChecked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.circleWrapper}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
      </View>

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to manage your health journey.</Text>

      <View style={styles.inputContainer}>
        <Icon name="mail" size={18} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Enter your Email"
          placeholderTextColor="grey"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={text =>
            setLoginUser(prev => ({ ...prev, email: text }))
          }
          value={loginUser.email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={18} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="grey"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          onChangeText={text =>
            setLoginUser(prev => ({ ...prev, password: text }))
          }
          value={loginUser.password}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={18}
            color="#888"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={loginHandle}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        New member?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('signup')}
        >
          Register Now
        </Text>
      </Text>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#E0F4F0',
    // gradient-like fade
  },
  circleWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 50,
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

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    width: '100%',
    height: 50,

    // shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    // shadow for Android
    elevation: 4,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },

  iconRight: {
    marginLeft: 8,
  },

  button: {
    backgroundColor: '#0F8F7A',
    borderRadius: 20,
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,

    shadowColor: '#0F8F7A',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },

    elevation: 6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footerText: {
    marginTop: 20,
    fontSize: 13,
    color: '#444',
  },

  loginLink: {
    color: '#0F8F7A',
    fontWeight: 'bold',
  },
});
