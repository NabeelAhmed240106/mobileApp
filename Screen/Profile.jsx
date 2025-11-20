import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TAB_BAR_EXTRA = 70;

const Profile = () => {
  let navigation = useNavigation();

  const handle_to_FAQ_Screen = () => {
    navigation.navigate('FAQ');
  };

  const handle_to_Home_Screen_from_Profile = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: TAB_BAR_EXTRA }}
    >
      <LinearGradient colors={['#C7ECFF', '#E8FFEF']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handle_to_Home_Screen_from_Profile}>
            <Ionicons name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile & Settings</Text>
          <View style={{ width: 26 }}></View>
        </View>

        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="edit-2" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Sarah</Text>
        <Text style={styles.patientID}>Patient ID: 123456</Text>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Personal Information</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={[styles.iconContainer, { backgroundColor: '#D8F1FF' }]}>
            <Icon name="mail" size={22} color="#1E90FF" />
          </View>
          <View>
            <Text style={styles.smallLabel}>Email</Text>
            <Text style={styles.cardText}>Sophia.Carter@email.com</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.iconContainer, { backgroundColor: '#CFFAE3' }]}>
            <Icon name="phone" size={22} color="#1DB954" />
          </View>
          <View>
            <Text style={styles.smallLabel}>Phone Number</Text>
            <Text style={styles.cardText}>(555) 123-4567</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.iconContainer, { backgroundColor: '#F7D7FF' }]}>
            <Ionicons name="location" size={22} color="#A02DE5" />
          </View>
          <View>
            <Text style={styles.smallLabel}>Address</Text>
            <Text style={styles.cardText}>123 Main St, Anytown, USA</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>App Preferences</Text>

      <View style={styles.card}>
        <TouchableOpacity onPress={handle_to_FAQ_Screen}>
          <View style={styles.row}>
            <View
              style={[styles.iconContainer, { backgroundColor: '#DDEAFF' }]}
            >
              <Ionicons name="help-circle-outline" size={22} color="#2A4DFF" />
            </View>
            <Text style={styles.prefText}>Help & Support</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={[styles.iconContainer, { backgroundColor: '#FFE7C4' }]}>
            <Ionicons name="globe-outline" size={22} color="#FF8A00" />
          </View>
          <Text style={styles.prefText}>Language</Text>

          <View style={{ flex: 1 }} />
          <Text style={styles.languageRight}>English</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FBFF',
  },

  header: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  profileImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editIcon: {
    backgroundColor: '#14B8A6',
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 5,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
  },
  patientID: {
    fontSize: 13,
    color: '#777',
    marginBottom: 10,
  },

  sectionTitle: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '700',
    color: '#4A4A4A',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 15,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  smallLabel: {
    fontSize: 13,
    color: '#777',
  },

  cardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  prefText: {
    fontSize: 16,
    fontWeight: '600',
  },

  languageRight: {
    fontSize: 15,
    color: '#666',
    marginRight: 8,
  },
});
