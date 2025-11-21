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
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../utils/theme';

const TAB_BAR_EXTRA = 70;

const Profile = () => {
  let navigation = useNavigation();

  const handle_to_FAQ_Screen = () => {
    navigation.navigate('FAQ');
  };

  const handle_to_Home_Screen_from_Profile = () => {
    navigation.navigate('Home');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('login');
  };

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: TAB_BAR_EXTRA }}
      >
        <View style={styles.headerCard}>
          <LinearGradient
            colors={[colors.accent.purple + '40', colors.accent.cyan + '30']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={handle_to_Home_Screen_from_Profile} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Profile & Settings</Text>
              <View style={{ width: 40 }} />
            </View>

            <View style={styles.profileImageWrapper}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editIcon}>
                <LinearGradient
                  colors={[colors.accent.cyan, colors.accent.blue]}
                  style={styles.editIconGradient}
                >
                  <Feather name="edit-2" size={16} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <Text style={styles.name}>Sarah</Text>
            <Text style={styles.patientID}>Patient ID: 123456</Text>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.card}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.cardGradient}
          >
            <View style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: colors.accent.cyan + '20' }]}>
                <Feather name="mail" size={20} color={colors.accent.cyan} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.smallLabel}>Email</Text>
                <Text style={styles.cardText}>Sophia.Carter@email.com</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: colors.accent.green + '20' }]}>
                <Feather name="phone" size={20} color={colors.accent.green} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.smallLabel}>Phone Number</Text>
                <Text style={styles.cardText}>(555) 123-4567</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: colors.accent.purple + '20' }]}>
                <Ionicons name="location" size={20} color={colors.accent.purple} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.smallLabel}>Address</Text>
                <Text style={styles.cardText}>123 Main St, Anytown, USA</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>App Preferences</Text>

        <TouchableOpacity onPress={handle_to_FAQ_Screen}>
          <View style={styles.card}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.cardGradient}
            >
              <View style={styles.row}>
                <View style={[styles.iconContainer, { backgroundColor: colors.accent.blue + '20' }]}>
                  <Ionicons name="help-circle-outline" size={20} color={colors.accent.blue} />
                </View>
                <Text style={styles.prefText}>Help & Support</Text>
                <Feather name="chevron-right" size={20} color={colors.text.tertiary} />
              </View>
            </LinearGradient>
          </View>
        </TouchableOpacity>

        <View style={styles.card}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.cardGradient}
          >
            <View style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: '#FF8A00' + '20' }]}>
                <Ionicons name="globe-outline" size={20} color="#FF8A00" />
              </View>
              <Text style={styles.prefText}>Language</Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.languageRight}>English</Text>
              <Feather name="chevron-right" size={20} color={colors.text.tertiary} />
            </View>
          </LinearGradient>
        </View>

        <TouchableOpacity
          style={styles.logoutWrapper}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[colors.status.error + '40', colors.status.error + '20']}
            style={styles.logoutButton}
          >
            <Feather name="log-out" size={20} color={colors.status.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.lg,
  },
  headerGradient: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.lg,
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

  profileImageWrapper: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.accent.cyan,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 16,
    overflow: 'hidden',
  },
  editIconGradient: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    ...typography.h2,
    fontSize: 26,
    marginBottom: spacing.xs,
  },
  patientID: {
    ...typography.caption,
    fontSize: 14,
  },

  sectionTitle: {
    ...typography.h4,
    fontSize: 18,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },

  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.sm,
  },
  cardGradient: {
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  smallLabel: {
    ...typography.caption,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  cardText: {
    ...typography.bodyBold,
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: colors.glass.border,
    marginVertical: spacing.md,
  },
  prefText: {
    ...typography.bodyBold,
    fontSize: 15,
    flex: 1,
  },
  languageRight: {
    ...typography.body,
    fontSize: 14,
    marginRight: spacing.sm,
  },

  logoutWrapper: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.status.error + '40',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  logoutText: {
    ...typography.bodyBold,
    fontSize: 16,
    color: colors.status.error,
  },
});
