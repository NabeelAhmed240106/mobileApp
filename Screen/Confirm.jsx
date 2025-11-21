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
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../utils/theme';

const Confirm = () => {
  const navigation = useNavigation();

  const handle_confirm_screen_to_Appointment = () => {
    navigation.navigate('Appointments');
  };

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
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
            <Feather name="x" size={24} color={colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.successIconWrapper}>
            <LinearGradient
              colors={[colors.status.success, colors.accent.green]}
              style={styles.successIcon}
            >
              <Feather name="check" size={60} color="#fff" />
            </LinearGradient>
            <View style={[styles.iconGlow, { shadowColor: colors.status.success }]} />
          </View>

          <Text style={styles.title}>Appointment Confirmed!</Text>
          <Text style={styles.subTitle}>
            Your appointment with Dr. Emily Carter has been successfully booked.
          </Text>
        </View>

        <View style={styles.card}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.cardGradient}
          >
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

            <View style={styles.divider} />

            <View style={styles.section}>
              <View style={[styles.iconContainer, { backgroundColor: colors.accent.cyan + '20' }]}>
                <Feather name="calendar" size={20} color={colors.accent.cyan} />
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.label}>Date & Time</Text>
                <Text style={styles.value}>Mon, July 15th at 2:00 PM</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={[styles.iconContainer, { backgroundColor: colors.accent.purple + '20' }]}>
                <Feather name="map-pin" size={20} color={colors.accent.purple} />
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.label}>Location</Text>
                <Text style={styles.value}>123 Health Clinic, Suite 200</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <TouchableOpacity
          style={styles.calendarButtonWrapper}
          onPress={handle_confirm_screen_to_Appointment}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[colors.status.success, colors.accent.green]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.calendarButton}
          >
            <Feather name="calendar" size={20} color="#fff" />
            <Text style={styles.calendarText}>Add to Calendar</Text>
          </LinearGradient>
          <View style={[styles.buttonGlow, { shadowColor: colors.status.success }]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewButton}
          onPress={handle_confirm_screen_to_Appointment}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.viewGradient}
          >
            <Text style={styles.viewText}>View all appointments</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: spacing.xxl * 2,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  closeBtn: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconWrapper: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  iconGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 15,
  },
  title: {
    ...typography.h2,
    fontSize: 28,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subTitle: {
    ...typography.body,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },

  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.lg,
  },
  cardGradient: {
    padding: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent.cyan,
  },
  name: {
    ...typography.h4,
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  role: {
    ...typography.caption,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: colors.glass.border,
    marginBottom: spacing.md,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  sectionContent: {
    flex: 1,
  },
  label: {
    ...typography.caption,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  value: {
    ...typography.bodyBold,
    fontSize: 15,
  },

  calendarButtonWrapper: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    position: 'relative',
  },
  calendarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.xl,
    gap: spacing.sm,
  },
  calendarText: {
    ...typography.bodyBold,
    fontSize: 16,
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
  viewButton: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  viewGradient: {
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
  },
  viewText: {
    ...typography.bodyBold,
    fontSize: 15,
  },
});
