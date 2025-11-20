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
import Icon from 'react-native-vector-icons/Feather';

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
  },
  {
    icon: 'clipboard',
    title: 'Lisinopril 10mg',
    subtitle: 'Prescribed on Jan 15, 2023',
  },
];

export default function Record() {
  let navigation = useNavigation();

  const handle_navigation_to_home_screen_from_record = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handle_navigation_to_home_screen_from_record}
        >
          <Icon name="arrow-left" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Records</Text>
        <Icon name="more-vertical" size={22} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Uploaded Reports</Text>
            <Icon name="filter" size={20} />
          </View>

          <View style={styles.reportGrid}>
            {reports.map((item, index) => (
              <View key={index} style={styles.reportCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.reportImage}
                />

                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>

                <Text style={styles.reportTitle}>{item.title}</Text>
                <Text style={styles.reportType}>{item.type}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Information</Text>

          {keyInfo.map((item, index) => (
            <View key={index} style={styles.infoCard}>
              <View style={styles.iconBox}>
                <Icon name={item.icon} size={20} color="#FF6B6B" />
              </View>

              <View>
                <Text style={styles.infoTitle}>{item.title}</Text>
                <Text style={styles.infoSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: '#F5F7FA',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  section: { paddingHorizontal: 15, marginTop: 10 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  reportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  reportCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },

  reportImage: {
    width: '100%',
    height: 110,
    borderRadius: 12,
  },

  dateBadge: {
    backgroundColor: '#0009',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 6,
    position: 'absolute',
    top: 10,
    left: 10,
  },

  dateText: { color: '#fff', fontSize: 10, fontWeight: '600' },

  reportTitle: { marginTop: 10, fontWeight: '700', fontSize: 14 },
  reportType: { fontSize: 12, color: '#888' },

  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  infoTitle: { fontSize: 16, fontWeight: '600' },
  infoSubtitle: { fontSize: 12, color: '#777' },

  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 10,
  },
});
