import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { BASE_URI } from '../utils/api';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../utils/theme';

const API_BASE = `${BASE_URI}/api/appointment`;

export default function Appointments({ navigation }) {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await axios.get(API_BASE);
      if (res.data) {
        const appointments = Array.isArray(res.data) ? res.data : res.data.data || [];
        const upcomingAppts = appointments.filter(apt => apt.status !== 'completed');
        const pastAppts = appointments.filter(apt => apt.status === 'completed');
        setUpcoming(upcomingAppts);
        setPast(pastAppts);
      }
    } catch (err) {
      console.log('Fetch failed', err.message);
    }
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener('focus', async () => {
      await fetchAppointments();
    });
    fetchAppointments();
    return unsub;
  }, [navigation, fetchAppointments]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return dateString;
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Delete Appointment',
      'Are you sure you want to delete this appointment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${API_BASE}/${id}`);
              fetchAppointments();
            } catch (err) {
              Alert.alert('Error', 'Failed to delete appointment');
            }
          },
        },
      ]
    );
  };

  const handleEdit = (item) => {
    navigation.navigate('Bookvisit', { appointment: item });
  };

  const handleMarkComplete = async (id) => {
    Alert.alert(
      'Mark as Complete',
      'Mark this appointment as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          onPress: async () => {
            try {
              await axios.patch(`${API_BASE}/${id}`, { status: 'completed' });
              fetchAppointments();
            } catch (err) {
              Alert.alert('Error', 'Failed to update appointment');
            }
          },
        },
      ]
    );
  };

  const renderUpcomingCard = () => {
    const item = upcoming.length > 0 ? upcoming[0] : null;

    if (!item) return (
       <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <TouchableOpacity 
            style={styles.scheduleButton}
            onPress={() => navigation.navigate('Bookvisit')}
          >
            <Feather name="plus" size={16} color={colors.accent.cyan} />
            <Text style={styles.scheduleButtonText}>Schedule New</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emptyCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
            style={styles.emptyGradient}
          >
            <Feather name="calendar" size={48} color={colors.text.tertiary} />
            <Text style={styles.emptyCardText}>No upcoming appointments</Text>
          </LinearGradient>
        </View>
      </View>
    );

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <TouchableOpacity 
            style={styles.scheduleButton}
            onPress={() => navigation.navigate('Bookvisit')}
          >
            <Feather name="plus" size={16} color={colors.accent.cyan} />
            <Text style={styles.scheduleButtonText}>Schedule New</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <LinearGradient
            colors={[colors.accent.cyan, colors.accent.blue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardHeader}>
              <View style={styles.doctorInfo}>
                <Image
                  source={{ uri: item.image || 'https://randomuser.me/api/portraits/women/44.jpg' }}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.cardSpecialty}>{item.specialty || 'Specialist'}</Text>
                  <Text style={styles.cardDoctorName}>{item.doctorName}</Text>
                </View>
              </View>
              <View style={styles.cardActions}>
                  <TouchableOpacity onPress={() => handleMarkComplete(item._id)} style={styles.actionButton}>
                      <Feather name="check" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
                      <Feather name="edit-2" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.actionButton}>
                      <Feather name="trash-2" size={20} color="#fff" />
                  </TouchableOpacity>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.chip}>
                <Feather name="calendar" size={16} color="#fff" />
                <Text style={styles.chipText}>{formatDate(item.date)}</Text>
              </View>
              <View style={styles.chip}>
                <Feather name="clock" size={16} color="#fff" />
                <Text style={styles.chipText}>{item.time}</Text>
              </View>
            </View>
          </LinearGradient>
          <View style={[styles.cardGlow, { shadowColor: colors.accent.cyan }]} pointerEvents="none" />
        </View>
      </View>
    );
  };

  const renderPastItem = ({ item }) => (
    <View style={styles.pastItem}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
        style={styles.pastGradient}
      >
        <View style={styles.pastContent}>
          <View style={[styles.iconContainer, { backgroundColor: colors.accent.purple + '20' }]}>
            <Feather name="user" size={24} color={colors.accent.purple} />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemDoctorName}>{item.doctorName}</Text>
            <Text style={styles.itemSpecialty}>{item.specialty || 'Specialist'}</Text>
            <Text style={styles.itemDate}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.itemActions}>
            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.miniAction}>
                <Feather name="edit-2" size={16} color={colors.accent.cyan} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.miniAction}>
                <Feather name="trash-2" size={16} color={colors.status.error} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Feather name="arrow-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="bell" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={past}
        keyExtractor={(item, index) => item._id || index.toString()}
        ListHeaderComponent={() => (
          <>
            {renderUpcomingCard()}
            {past.length > 0 && (
              <Text style={styles.sectionTitlePast}>Past Appointments</Text>
            )}
          </>
        )}
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        renderItem={renderPastItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
           
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  headerTitle: {
    ...typography.h3,
    fontSize: 22,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  sectionContainer: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    fontSize: 18,
  },
  sectionTitlePast: {
    ...typography.h4,
    fontSize: 18,
    marginBottom: spacing.md,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  scheduleButtonText: {
    ...typography.bodyBold,
    fontSize: 13,
    color: colors.accent.cyan,
  },

  card: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.lg,
  },
  cardGradient: {
    padding: spacing.lg,
  },
  cardGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.xl,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardSpecialty: {
    ...typography.caption,
    fontSize: 13,
    opacity: 0.9,
  },
  cardDoctorName: {
    ...typography.h4,
    fontSize: 18,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  chipText: {
    ...typography.bodyBold,
    fontSize: 13,
  },

  emptyCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  emptyGradient: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyCardText: {
    ...typography.body,
    marginTop: spacing.md,
  },

  pastItem: {
    marginBottom: spacing.sm,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  pastGradient: {
    padding: spacing.md,
  },
  pastContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  itemDetails: {
    flex: 1,
  },
  itemDoctorName: {
    ...typography.bodyBold,
    fontSize: 15,
    marginBottom: spacing.xs,
  },
  itemSpecialty: {
    ...typography.caption,
    fontSize: 13,
    marginBottom: spacing.xs,
  },
  itemDate: {
    ...typography.caption,
    fontSize: 12,
  },
  itemActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  miniAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    padding: spacing.lg,
  },
});
