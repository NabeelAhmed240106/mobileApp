import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../utils/theme';

const reports = [
  {
    date: '08/15/2023',
    title: 'Complete Blood Count',
    type: 'PDF - 2.1 MB',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLDAL6_c-VFfLtBAbRqpaBRZGHH2EAoRawQ&s',
  },
  {
    date: '07/22/2023',
    title: 'Chest X-Ray',
    type: 'IMG - 4.5 MB',
    image: 'https://medlineplus.gov/images/Xray_share.jpg',
  },
  {
    date: '06/05/2023',
    title: 'Lipid Panel Results',
    type: 'PDF - 1.8 MB',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1iasKwTQ1Q738aOftSA5Nzc8h63iKvTSJPA&s',
  },
  {
    date: '05/18/2023',
    title: 'Brain MRI Scan',
    type: 'DICOM - 15.2 MB',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkvgiO6LfvpQsx4rI3LCZ-iWs1OBCjicCBNg&s',
  },
];

const keyInfo = [
  {
    icon: 'heart',
    title: 'Hypertension',
    subtitle: 'Diagnosed on Jan 15, 2023',
    color: colors.status.error,
  },
  {
    icon: 'clipboard',
    title: 'Lisinopril 10mg',
    subtitle: 'Prescribed on Jan 15, 2023',
    color: colors.accent.cyan,
  },
];

export default function Record() {
  let navigation = useNavigation();

  const handle_navigation_to_home_screen_from_record = () => {
    navigation.navigate('Home');
  };

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handle_navigation_to_home_screen_from_record}
          style={styles.iconButton}
        >
          <Feather name="arrow-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Records</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="more-vertical" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Uploaded Reports</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Feather name="filter" size={18} color={colors.accent.cyan} />
            </TouchableOpacity>
          </View>

          <View style={styles.reportGrid}>
            {reports.map((item, index) => (
              <View key={index} style={styles.reportCard}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
                  style={styles.reportGradient}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.reportImage}
                  />

                  <View style={styles.dateBadge}>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>

                  <Text style={styles.reportTitle}>{item.title}</Text>
                  <Text style={styles.reportType}>{item.type}</Text>

                  <TouchableOpacity style={styles.downloadButton}>
                    <Feather name="download" size={16} color={colors.accent.cyan} />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Information</Text>

          {keyInfo.map((item, index) => (
            <View key={index} style={styles.infoCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
                style={styles.infoGradient}
              >
                <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                  <Feather name={item.icon} size={20} color={item.color} />
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>{item.title}</Text>
                  <Text style={styles.infoSubtitle}>{item.subtitle}</Text>
                </View>

                <Feather name="chevron-right" size={20} color={colors.text.tertiary} />
              </LinearGradient>
            </View>
          ))}
        </View>

        <View style={{ height: 90 }} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
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

  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
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
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  reportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reportCard: {
    width: '48%',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.sm,
  },
  reportGradient: {
    padding: spacing.sm,
    position: 'relative',
  },
  reportImage: {
    width: '100%',
    height: 110,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  dateBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
  },
  dateText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  reportTitle: {
    ...typography.bodyBold,
    fontSize: 13,
    marginBottom: spacing.xs,
  },
  reportType: {
    ...typography.caption,
    fontSize: 11,
  },
  downloadButton: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.sm,
  },
  infoGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  iconBox: {
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
  infoTitle: {
    ...typography.bodyBold,
    fontSize: 15,
    marginBottom: spacing.xs,
  },
  infoSubtitle: {
    ...typography.caption,
    fontSize: 12,
  },
});
