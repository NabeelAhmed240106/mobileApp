import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { BASE_URI } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Bookvisit({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('2024-12-05');
  const [selectedDoctor, setSelectedDoctor] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);
  const [creating, setCreating] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState(''); 
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Evelyn Reed',
      specialty: 'Cardiologist',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: '4.9 (128 reviews)',
    },
    {
      id: 2,
      name: 'Dr. Marcus Chen',
      specialty: 'Dermatologist',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: '4.8 (97 reviews)',
    },
  ];

  const morningSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
  ];
  const afternoonSlots = [
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
  ];

  const handle_to_confirm = async () => {
    try {
      if (!selectedDate || !selectedDoctor || !selectedTime) {
        return Alert.alert(
          'Validation',
          'Please select date, doctor and time before confirming.',
        );
      }

      setCreating(true);

      const getUserIdFromStorage = async () => {
        const candidateKeys = ['user', 'userInfo', 'auth', 'userData', 'token'];
        for (const key of candidateKeys) {
          try {
            const raw = await AsyncStorage.getItem(key);
            if (!raw) continue;
            try {
              const parsed = JSON.parse(raw);
              const id =
                parsed._id ||
                parsed.id ||
                parsed.userId ||
                (parsed.user && (parsed.user._id || parsed.user.id));
              if (id) return id;
            } catch (e) {
              continue;
            }
          } catch (e) {
            console.log('AsyncStorage read error for key', key, e);
          }
        }
        return null;
      };

      const userId = await getUserIdFromStorage();
      console.log('Bookvisit: resolved userId =', userId);

      if (!userId) {
        setCreating(false);
        return Alert.alert(
          'Not authenticated',
          'Please login to book an appointment.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Login',
              onPress: () => navigation.navigate('login'),
            },
          ],
        );
      }

      const doctor = doctors.find(d => d.id === selectedDoctor) || {};

      const payload = {
        userId,
        doctorName: doctor.name || 'Unknown',
        specialty: doctor.specialty || '',
        date: selectedDate,
        time: selectedTime,
        image: doctor.image || '',
      };

      const candidates = [
        `${BASE_URI}/api/appointment`,
        `${BASE_URI}/api/appointments`,
        `${BASE_URI}/appointments`,
        `${BASE_URI}/appointment`,
      ];

      let created = null;
      let lastErr = null;
      for (const url of candidates) {
        try {
          console.log('Trying create appointment at', url, payload);
          const res = await axios.post(url, payload, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
          });
          created = res.data;
          console.log('Created appointment:', res.data);
          break;
        } catch (err) {
          lastErr = err;
          console.log(
            'Create attempt failed for',
            url,
            err?.response?.status,
            err?.response?.data || err.message,
          );
        }
      }

      setCreating(false);

      if (!created) {
        const status = lastErr?.response?.status;
        const msg =
          lastErr?.response?.data?.message ||
          lastErr?.message ||
          'Unable to create appointment';
        return Alert.alert(
          'Error',
          `Request failed${status ? ` (status ${status})` : ''}\n${msg}`,
        );
      }

      try {
        navigation.navigate('Confirm', {
          appointment: created?.data || created,
          returnTo: 'Bookvisit',
        });
      } catch (e) {
        console.log('Navigate to Confirm failed:', e);
        Alert.alert('Success', 'Appointment created successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      setCreating(false);
      console.log('Create appointment error', err);
      Alert.alert('Error', err?.message || 'Failed to create appointment');
    }
  };

  const BASE = BASE_URI.replace(/\/+$/, '');
  const API_CANDIDATES = [
    `${BASE}/api/appointment`,
    `${BASE}/api/appointments`,
    `${BASE}/appointments`,
    `${BASE}/appointment`,
  ];

  const submit = async () => {
    if (!doctorName || !date || !time) {
      Alert.alert('Validation', 'Doctor, date and time are required');
      return;
    }
    setLoading(true);
    const payload = { doctorName, specialty, date, time };
    try {
      for (const url of API_CANDIDATES) {
        try {
          const res = await axios.post(url, payload, { timeout: 10000 });
          if (res?.status === 200 || res?.status === 201 || res?.data) {
            const created = res?.data?.data || res?.data;
            setLoading(false);
            navigation.navigate('Appointments', { newAppointment: created });
            return;
          }
        } catch (err) {
          console.log('POST failed', url, err?.response?.status || err?.message);
        }
      }

      // fallback: add local pending appointment (no blocking modal)
      const temp = {
        _id: `temp-${Date.now()}`,
        doctorName,
        specialty,
        date,
        time,
        status: 'upcoming',
        _pending: true, // mark as needing sync
      };
      setLoading(false);
      navigation.navigate('Appointments', { newAppointment: temp });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Appointment</Text>
        <AntDesign name="bells" size={22} />
      </View>

      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Date</Text>
        <Text style={styles.tab}>Doctor</Text>
        <Text style={styles.tab}>Time</Text>
      </View>

      <Text style={styles.sectionTitle}>Choose a Date</Text>

      <Calendar
        current={selectedDate}
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#3AAAF8',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#3AAAF8',
          todayTextColor: '#3AAAF8',
          arrowColor: '#3AAAF8',
        }}
        style={styles.calendar}
      />

      <Text style={styles.sectionTitle}>Select Your Doctor</Text>

      <View style={styles.doctorRow}>
        {doctors.map(doc => (
          <TouchableOpacity
            key={doc.id}
            style={[
              styles.doctorCard,
              selectedDoctor === doc.id && styles.selectedDoctor,
            ]}
            onPress={() => setSelectedDoctor(doc.id)}
          >
            <Image source={{ uri: doc.image }} style={styles.doctorImage} />
            <Text style={styles.doctorName}>{doc.name}</Text>
            <Text style={styles.doctorSpecialty}>{doc.specialty}</Text>

            <View style={styles.ratingRow}>
              <AntDesign name="star" size={14} color="#F5B148" />
              <Text style={styles.ratingText}>{doc.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Available Time Slots</Text>

      <Text style={styles.timeSection}>● Morning</Text>
      <View style={styles.timeRow}>
        {morningSlots.map(time => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeSlot,
              selectedTime === time && styles.selectedTime,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === time && styles.selectedTimeText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.timeSection}>● Afternoon</Text>
      <View style={styles.timeRow}>
        {afternoonSlots.map(time => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeSlot,
              selectedTime === time && styles.selectedTime,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === time && styles.selectedTimeText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Or, Enter Details Manually</Text>

      <TextInput
        placeholder="Doctor Name"
        value={doctorName}
        onChangeText={setDoctorName}
        style={styles.input}
      />
      <TextInput
        placeholder="Specialty"
        value={specialty}
        onChangeText={setSpecialty}
        style={styles.input}
      />
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Time (e.g. 10:00 AM)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={submit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.confirmText}>Book Appointment</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f6f9fc' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: '600' },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: { fontSize: 16, color: '#777' },
  activeTab: {
    color: '#3AAAF8',
    borderBottomWidth: 2,
    borderBottomColor: '#3AAAF8',
    paddingBottom: 5,
  },

  sectionTitle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },

  calendar: {
    borderRadius: 20,
    elevation: 3,
    paddingBottom: 10,
  },

  doctorRow: { flexDirection: 'row', gap: 12 },

  doctorCard: {
    width: '47%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 15,
    elevation: 3,
  },
  selectedDoctor: {
    borderWidth: 2,
    borderColor: '#3AAAF8',
    backgroundColor: '#EAF6FF',
  },

  doctorImage: { width: 55, height: 55, borderRadius: 40, alignSelf: 'center' },

  doctorName: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  doctorSpecialty: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },

  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  ratingText: { color: '#777', fontSize: 13 },

  timeSection: { fontSize: 16, fontWeight: '600', marginTop: 10 },

  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 10,
  },

  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 17,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  selectedTime: {
    backgroundColor: '#3AAAF8',
  },
  timeText: { fontSize: 14 },
  selectedTimeText: { color: '#fff', fontWeight: '600' },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  confirmBtn: {
    backgroundColor: '#3AAAF8',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  confirmText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
