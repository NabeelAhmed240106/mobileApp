import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const TAB_BAR_EXTRA = 50;

function Home() {
  let navigation = useNavigation();

  const handle_Navigation = () => {
    navigation.navigate('Appointments');
  };
  const handle_Navigation_Find_Doctor = () => {
    navigation.navigate('Bookvisit');
  };

  const handle_Navigation_Record = () => {
    navigation.navigate('Record');
  };

  const handle_schedule = () => {
    navigation.navigate('Bookvisit');
  };

  const handle_FAQ_Screen = () => {
    navigation.navigate('FAQ');
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: TAB_BAR_EXTRA }}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.hello}>Hello, Sarah</Text>
        <TouchableOpacity onPress={handle_FAQ_Screen}>
          <Feather name="bell" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.appointmentCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/men/47.jpg',
            }}
            style={styles.profilePic}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.upcoming}>Upcoming Appointment</Text>
            <Text style={styles.doctorName}>Dr. Evelyn Reed</Text>
            <Text style={styles.speciality}>Cardiologist</Text>
          </View>
        </View>

        <View style={styles.dateBox}>
          <AntDesign name="calendar" size={18} color="#41a5ff" />
          <Text style={styles.dateText}>Mon, 23 Oct · 10:30 AM</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.rescheduleBtn}
            onPress={handle_schedule}
          >
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={handle_Navigation}
          >
            <Text style={styles.detailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.squareButton}
          onPress={handle_Navigation}
        >
          <Feather name="plus-circle" size={30} color="#41a5ff" />
          <Text style={styles.squareText}>Book Visit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.squareButton}
          onPress={handle_Navigation_Find_Doctor}
        >
          <Feather name="search" size={30} color="#41a5ff" />
          <Text style={styles.squareText}>Find Doctor</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.squareButton}
          onPress={handle_Navigation_Record}
        >
          <AntDesign name="book" size={30} color="#41a5ff" />
          <Text style={styles.squareText}>My Records</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.squareButton}>
          <Feather name="message-square" size={30} color="#41a5ff" />
          <Text style={styles.squareText}>Messages</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Health Statistics</Text>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Heart Rate</Text>
        <Text style={styles.statValue}>
          72 <Text style={{ color: '#41a5ff' }}>BPM</Text>
        </Text>
        <Text style={styles.statChange}>Last 24h ▲ 2%</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Blood Pressure</Text>
        <Text style={styles.statValue}>120/80</Text>
        <Text style={[styles.statChange, { color: 'red' }]}>Last 24h ▼ 1%</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Steps</Text>
        <Text style={styles.statValue}>8,450</Text>
        <Text style={styles.statChange}>Today ▲ 5%</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Sleep</Text>
        <Text style={styles.statValue}>7h 30m</Text>
        <Text style={styles.statChange}>Last Night ▲ 3%</Text>
      </View>

      <View style={styles.medCard}>
        <Text style={styles.medTitle}>Next Medication</Text>
        <Text style={styles.medText}>Metformin 500mg • Take at 8:00 PM</Text>

        <TouchableOpacity style={styles.medButton}>
          <Text style={styles.medButtonText}>Mark as taken</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f9fc',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  hello: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },

  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  upcoming: {
    color: '#41a5ff',
    fontSize: 12,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: '700',
  },

  speciality: {
    fontSize: 13,
    color: 'gray',
  },

  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#e9f5ff',
    padding: 10,
    borderRadius: 12,
  },

  dateText: {
    marginLeft: 10,
    color: '#41a5ff',
    fontWeight: '600',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  rescheduleBtn: {
    backgroundColor: '#e9e9e9',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },

  detailsBtn: {
    backgroundColor: '#41a5ff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },

  rescheduleText: {
    color: '#000',
    fontWeight: '600',
  },

  detailsText: {
    color: '#fff',
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  squareButton: {
    width: '48%',
    backgroundColor: '#fff',
    paddingVertical: 25,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  squareText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 18,
    marginBottom: 10,
    elevation: 2,
  },

  statLabel: {
    color: 'gray',
    fontSize: 13,
  },

  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
  },

  statChange: {
    fontSize: 13,
    color: 'green',
  },

  medCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 50,
  },

  medTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  medText: {
    color: 'gray',
    marginVertical: 5,
  },

  medButton: {
    backgroundColor: '#41a5ff',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  medButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

