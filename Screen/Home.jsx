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
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../utils/theme';

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
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: TAB_BAR_EXTRA }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.name}>Sarah</Text>
          </View>
          <TouchableOpacity onPress={handle_FAQ_Screen} style={styles.bellButton}>
            <Feather name="bell" size={24} color={colors.text.primary} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.appointmentCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.appointmentGradient}
          >
            <Text style={styles.upcomingLabel}>Upcoming Appointment</Text>
            
            <View style={styles.doctorRow}>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/47.jpg',
                }}
                style={styles.profilePic}
              />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>Dr. Evelyn Reed</Text>
                <Text style={styles.speciality}>Cardiologist</Text>
              </View>
            </View>

            <View style={styles.dateBox}>
              <LinearGradient
                colors={[colors.accent.cyan, colors.accent.blue]}
                style={styles.dateGradient}
              >
                <AntDesign name="calendar" size={16} color="#fff" />
                <Text style={styles.dateText}>Mon, 23 Oct · 10:30 AM</Text>
              </LinearGradient>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.rescheduleBtn}
                onPress={handle_schedule}
              >
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handle_Navigation}
                style={styles.detailsBtnWrapper}
              >
                <LinearGradient
                  colors={[colors.accent.cyan, colors.accent.blue]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.detailsBtn}
                >
                  <Text style={styles.detailsText}>View Details</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={handle_Navigation}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.actionGradient}
            >
              <View style={[styles.iconCircle, { backgroundColor: colors.accent.cyan + '20' }]}>
                <Feather name="plus-circle" size={28} color={colors.accent.cyan} />
              </View>
              <Text style={styles.actionText}>Book Visit</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={handle_Navigation_Find_Doctor}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.actionGradient}
            >
              <View style={[styles.iconCircle, { backgroundColor: colors.accent.purple + '20' }]}>
                <Feather name="search" size={28} color={colors.accent.purple} />
              </View>
              <Text style={styles.actionText}>Find Doctor</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={handle_Navigation_Record}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.actionGradient}
            >
              <View style={[styles.iconCircle, { backgroundColor: colors.accent.blue + '20' }]}>
                <AntDesign name="book" size={28} color={colors.accent.blue} />
              </View>
              <Text style={styles.actionText}>My Records</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.actionGradient}
            >
              <View style={[styles.iconCircle, { backgroundColor: colors.accent.pink + '20' }]}>
                <Feather name="message-square" size={28} color={colors.accent.pink} />
              </View>
              <Text style={styles.actionText}>Messages</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Health Statistics</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.statGradient}
            >
              <Text style={styles.statLabel}>Heart Rate</Text>
              <Text style={styles.statValue}>
                72 <Text style={{ color: colors.accent.cyan, fontSize: 18 }}>BPM</Text>
              </Text>
              <Text style={styles.statChange}>▲ 2%</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.statGradient}
            >
              <Text style={styles.statLabel}>Blood Pressure</Text>
              <Text style={styles.statValue}>120/80</Text>
              <Text style={[styles.statChange, { color: colors.status.error }]}>▼ 1%</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.statGradient}
            >
              <Text style={styles.statLabel}>Steps</Text>
              <Text style={styles.statValue}>8,450</Text>
              <Text style={styles.statChange}>▲ 5%</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.statGradient}
            >
              <Text style={styles.statLabel}>Sleep</Text>
              <Text style={styles.statValue}>7h 30m</Text>
              <Text style={styles.statChange}>▲ 3%</Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.medCard}>
          <LinearGradient
            colors={[colors.accent.purple + '30', colors.accent.cyan + '20']}
            style={styles.medGradient}
          >
            <Text style={styles.medTitle}>Next Medication</Text>
            <Text style={styles.medText}>Metformin 500mg • Take at 8:00 PM</Text>

            <TouchableOpacity style={styles.medButtonWrapper}>
              <LinearGradient
                colors={[colors.accent.purple, colors.accent.cyan]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.medButton}
              >
                <Text style={styles.medButtonText}>Mark as taken</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Home;

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
  greeting: {
    ...typography.body,
    fontSize: 16,
  },
  name: {
    ...typography.h2,
    fontSize: 28,
  },
  bellButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.cyan,
  },

  appointmentCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.lg,
  },
  appointmentGradient: {
    padding: spacing.lg,
  },
  upcomingLabel: {
    ...typography.caption,
    color: colors.accent.cyan,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.accent.cyan,
  },
  doctorInfo: {
    marginLeft: spacing.md,
  },
  doctorName: {
    ...typography.h4,
    fontSize: 18,
  },
  speciality: {
    ...typography.caption,
    fontSize: 14,
  },
  dateBox: {
    marginBottom: spacing.md,
  },
  dateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm + 2,
    borderRadius: borderRadius.md,
  },
  dateText: {
    marginLeft: spacing.sm,
    color: colors.text.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rescheduleBtn: {
    flex: 1,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  rescheduleText: {
    ...typography.bodyBold,
    fontSize: 14,
  },
  detailsBtnWrapper: {
    flex: 1,
  },
  detailsBtn: {
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  detailsText: {
    ...typography.bodyBold,
    fontSize: 14,
  },

  sectionTitle: {
    ...typography.h3,
    fontSize: 20,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  actionCard: {
    width: '48%',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.md,
  },
  actionGradient: {
    paddingVertical: spacing.lg + 4,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionText: {
    ...typography.bodyBold,
    fontSize: 14,
  },

  statsGrid: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  statCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  statGradient: {
    padding: spacing.md,
  },
  statLabel: {
    ...typography.caption,
    fontSize: 13,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.h3,
    fontSize: 26,
    marginBottom: spacing.xs,
  },
  statChange: {
    ...typography.caption,
    color: colors.status.success,
    fontSize: 13,
  },

  medCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.lg,
  },
  medGradient: {
    padding: spacing.lg,
  },
  medTitle: {
    ...typography.h4,
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  medText: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  medButtonWrapper: {
    marginTop: spacing.sm,
  },
  medButton: {
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  medButtonText: {
    ...typography.bodyBold,
    fontSize: 15,
  },
});
