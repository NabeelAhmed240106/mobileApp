import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const FAQScreen = () => {
  const navigation = useNavigation();

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How do I schedule an appointment?',
      a: "You can schedule an appointment directly through the app under the 'Appointments' section.",
    },
    {
      q: 'Can I view my medical records?',
      a: "Yes, your medical records are available in the 'Records' tab.",
    },
    {
      q: 'How do I contact my doctor?',
      a: 'You can contact your doctor through the chat or call options available in the app.',
    },
    {
      q: 'What if I need to cancel?',
      a: 'You can cancel an appointment from the appointment details screen.',
    },
    {
      q: 'Is my data secure?',
      a: 'Yes, all your data is encrypted and securely stored.',
    },
  ];

  const toggle = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
        >
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help & Support</Text>
      </View>

      <Text style={styles.title}>FAQs</Text>
      <Text style={styles.subTitle}>Find answers to common questions.</Text>

      {faqs.map((item, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity
            style={styles.cardRow}
            onPress={() => toggle(index)}
          >
            <Text style={styles.question}>{item.q}</Text>
            <Icon
              name={openIndex === index ? 'minus' : 'plus'}
              size={20}
              color="#2F80ED"
            />
          </TouchableOpacity>

          {openIndex === index && <Text style={styles.answer}>{item.a}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    width: '85%',
  },
  answer: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
