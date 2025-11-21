import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { BASE_URI } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../utils/theme';

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

export default function Bookvisit({ navigation, route }) {
  const appointmentToEdit = route.params?.appointment;
  const isEditMode = !!appointmentToEdit;

  const [selectedDate, setSelectedDate] = useState(appointmentToEdit?.date || '2024-12-05');
  const [selectedDoctor, setSelectedDoctor] = useState(1);
  const [selectedTime, setSelectedTime] = useState(appointmentToEdit?.time || null);
  const [loading, setLoading] = useState(false);

  const morningSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
  ];
  const afternoonSlots = [
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  ];

  useEffect(() => {
    if (isEditMode) {
      const doc = doctors.find(d => d.name === appointmentToEdit.doctorName);
      if (doc) {
        setSelectedDoctor(doc.id);
      }
    }
  }, [isEditMode, appointmentToEdit]);

  const submit = async () => {
    const doc = doctors.find(d => d.id === selectedDoctor);

    if (!doc || !selectedDate || !selectedTime) {
      Alert.alert('Validation', 'Doctor, date and time are required');
      return;
    }

    setLoading(true);

    try {
      const userString = await AsyncStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      
      const userId = user?.user?._id || user?._id || user?.id;
      
      if (!userId) {
          Alert.alert('Error', 'Please login again to book an appointment');
          setLoading(false);
          return;
      }

      const payload = {
        doctorName: doc.name,
        specialty: doc.specialty,
        date: selectedDate,
        time: selectedTime,
        image: doc.image,
        userId: userId
      };

      const API_URL = `${BASE_URI}/api/appointment`;

      if (isEditMode) {
        const appointmentId = appointmentToEdit._id || appointmentToEdit.id;
        
        if (!appointmentId) {
            throw new Error('Appointment ID is missing');
        }

        await axios.patch(`${API_URL}/${appointmentId}`, payload);
        Alert.alert('Success', 'Appointment updated successfully', [
            { text: 'OK', onPress: () => navigation.navigate('Appointments') }
        ]);
      } else {
        await axios.post(API_URL, payload);
        Alert.alert('Success', 'Appointment booked successfully', [
            { text: 'OK', onPress: () => navigation.navigate('Appointments') }
        ]);
      }
    } catch (err) {
      console.log('Submit failed', err?.response?.status || err?.message);
      console.log('Error details:', err?.response?.data);
      Alert.alert('Error', 'Failed to save appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditMode ? 'Edit Appointment' : 'Schedule Appointment'}
          </Text>
          <TouchableOpacity style={styles.bellButton}>
            <Feather name="bell" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Choose a Date</Text>
        
        <View style={styles.calendarCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.calendarGradient}
          >
            <Calendar
              current={selectedDate}
              onDayPress={day => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: colors.accent.cyan,
                },
              }}
              theme={{
                calendarBackground: 'transparent',
                textSectionTitleColor: colors.text.secondary,
                selectedDayBackgroundColor: colors.accent.cyan,
                selectedDayTextColor: colors.text.primary,
                todayTextColor: colors.accent.purple,
                dayTextColor: colors.text.primary,
                textDisabledColor: colors.text.disabled,
                monthTextColor: colors.text.primary,
                arrowColor: colors.accent.cyan,
                textDayFontWeight: '500',
                textMonthFontWeight: '700',
                textDayHeaderFontWeight: '600',
              }}
            />
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>Select Your Doctor</Text>

        <View style={styles.doctorRow}>
          {doctors.map(doc => (
            <TouchableOpacity
              key={doc.id}
              style={styles.doctorCardWrapper}
              onPress={() => setSelectedDoctor(doc.id)}
            >
              <LinearGradient
                colors={
                  selectedDoctor === doc.id
                    ? [colors.accent.cyan + '30', colors.accent.purple + '20']
                    : ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']
                }
                style={[
                  styles.doctorCard,
                  selectedDoctor === doc.id && styles.selectedDoctor,
                ]}
              >
                <Image source={{ uri: doc.image }} style={styles.doctorImage} />
                <Text style={styles.doctorName}>{doc.name}</Text>
                <Text style={styles.doctorSpecialty}>{doc.specialty}</Text>

                <View style={styles.ratingRow}>
                  <Feather name="star" size={14} color={colors.accent.cyan} />
                  <Text style={styles.ratingText}>{doc.rating}</Text>
                </View>
                
                {selectedDoctor === doc.id && (
                  <View style={styles.checkmark}>
                    <Feather name="check" size={16} color={colors.text.primary} />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Available Time Slots</Text>

        <Text style={styles.timeSection}>Morning</Text>
        <View style={styles.timeRow}>
          {morningSlots.map(time => (
            <TouchableOpacity
              key={time}
              onPress={() => setSelectedTime(time)}
            >
              <LinearGradient
                colors={
                  selectedTime === time
                    ? [colors.accent.cyan, colors.accent.blue]
                    : ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']
                }
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTime,
                ]}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}
                >
                  {time}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.timeSection}>Afternoon</Text>
        <View style={styles.timeRow}>
          {afternoonSlots.map(time => (
            <TouchableOpacity
              key={time}
              onPress={() => setSelectedTime(time)}
            >
              <LinearGradient
                colors={
                  selectedTime === time
                    ? [colors.accent.cyan, colors.accent.blue]
                    : ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']
                }
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTime,
                ]}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}
                >
                  {time}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.confirmBtnWrapper}
          onPress={submit}
          disabled={loading}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[colors.accent.cyan, colors.accent.purple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmBtn}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmText}>
                {isEditMode ? 'Update Appointment' : 'Book Appointment'}
              </Text>
            )}
          </LinearGradient>
          <View style={[styles.buttonGlow, { shadowColor: colors.accent.cyan }]} />
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h3,
    fontSize: 20,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionTitle: {
    ...typography.h4,
    fontSize: 18,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },

  calendarCard: {
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.md,
  },
  calendarGradient: {
    padding: spacing.sm,
  },

  doctorRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  doctorCardWrapper: {
    flex: 1,
  },
  doctorCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.glass.border,
    position: 'relative',
    ...shadows.md,
  },
  selectedDoctor: {
    borderColor: colors.accent.cyan,
    ...shadows.glow(colors.accent.cyan),
  },
  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.glass.border,
  },
  doctorName: {
    ...typography.bodyBold,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  doctorSpecialty: {
    ...typography.caption,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    ...typography.caption,
    fontSize: 11,
  },
  checkmark: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent.cyan,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeSection: {
    ...typography.bodyBold,
    fontSize: 15,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    color: colors.accent.cyan,
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  timeSlot: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.glass.border,
    minWidth: 90,
    alignItems: 'center',
  },
  selectedTime: {
    borderColor: colors.accent.cyan,
    ...shadows.glow(colors.accent.cyan),
  },
  timeText: {
    ...typography.body,
    fontSize: 13,
  },
  selectedTimeText: {
    ...typography.bodyBold,
    fontSize: 13,
  },

  confirmBtnWrapper: {
    margin: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
    position: 'relative',
  },
  confirmBtn: {
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  confirmText: {
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
});
