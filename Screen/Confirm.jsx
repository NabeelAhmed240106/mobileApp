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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Confirm = () => {
  const navigation = useNavigation();

  const handle_confirm_screen_to_Appointment = () => {
    navigation.navigate('Appointments');
  };

  // const handle_to_home_Screen = () => {
  //   navigation.navigate('Home');
  // };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#C5F0FF', '#EAF9FF']} style={styles.header}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            try {
              navigation.navigate('Home');
            } catch (e) {
              navigation.navigate('Home');
            } 
          }}
        >
          <AntDesign name="close" size={22} color="#333" />
        </TouchableOpacity>
        <Icon name="check-circle" size={60} color="#21C08B" />
        <Text style={styles.title}>Appointment Confirmed</Text>
        <Text style={styles.subTitle}>
          Your appointment with Dr. Emily Carter has been successfully booked.
        </Text>
      </LinearGradient>

      <View style={styles.card}>
        <View style={styles.row}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Dr. Emily Carter</Text>
            <Text style={styles.role}>General Practitioner</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Icon name="calendar" size={22} color="#21C08B" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.value}>Mon, July 15th at 2:00 PM</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Icon name="map-pin" size={22} color="#21C08B" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>123 Health Clinic, Suite 200</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.calendarButton}
        onPress={handle_confirm_screen_to_Appointment}
      >
        <AntDesign name="calendar" size={20} color="#fff" />
        <Text style={styles.calendarText}>Add to Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.viewButton}
        onPress={handle_confirm_screen_to_Appointment}
      >
        <Text style={styles.viewText}>View all appointments</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 15,
    color: '#000',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginTop: -40,
    elevation: 6,
    shadowColor: '#000',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    height: 55,
    width: 55,
    borderRadius: 100,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  role: {
    color: '#888',
    fontSize: 14,
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  label: {
    color: '#888',
    fontSize: 13,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
  },

  calendarButton: {
    backgroundColor: '#12B886',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  calendarText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },

  viewButton: {
    backgroundColor: '#EEF1F6',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    alignItems: 'center',
  },
  viewText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#697077',
  },

  bottomTab: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
});
