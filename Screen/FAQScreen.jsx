import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../utils/theme';

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
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary]}
      style={styles.container}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <View style={styles.iconCircle}>
            <LinearGradient
              colors={[colors.accent.cyan, colors.accent.blue]}
              style={styles.iconGradient}
            >
              <Feather name="help-circle" size={40} color="#fff" />
            </LinearGradient>
          </View>
          <Text style={styles.title}>FAQs</Text>
          <Text style={styles.subTitle}>Find answers to common questions.</Text>
        </View>

        {faqs.map((item, index) => (
          <View key={index} style={styles.card}>
            <LinearGradient
              colors={
                openIndex === index
                  ? [colors.accent.cyan + '20', colors.accent.purple + '15']
                  : ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']
              }
              style={styles.cardGradient}
            >
              <TouchableOpacity
                style={styles.cardRow}
                onPress={() => toggle(index)}
              >
                <Text style={styles.question}>{item.q}</Text>
                <View
                  style={[
                    styles.iconButton,
                    openIndex === index && styles.iconButtonActive,
                  ]}
                >
                  <Feather
                    name={openIndex === index ? 'minus' : 'plus'}
                    size={18}
                    color={openIndex === index ? colors.text.primary : colors.accent.cyan}
                  />
                </View>
              </TouchableOpacity>

              {openIndex === index && (
                <>
                  <View style={styles.divider} />
                  <Text style={styles.answer}>{item.a}</Text>
                </>
              )}
            </LinearGradient>
          </View>
        ))}

        <View style={styles.contactCard}>
          <LinearGradient
            colors={[colors.accent.purple + '30', colors.accent.cyan + '20']}
            style={styles.contactGradient}
          >
            <Feather name="message-circle" size={32} color={colors.accent.cyan} />
            <Text style={styles.contactTitle}>Still need help?</Text>
            <Text style={styles.contactText}>
              Our support team is available 24/7 to assist you.
            </Text>
            <TouchableOpacity style={styles.contactButtonWrapper}>
              <LinearGradient
                colors={[colors.accent.cyan, colors.accent.blue]}
                style={styles.contactButton}
              >
                <Text style={styles.contactButtonText}>Contact Support</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerText: {
    ...typography.h3,
    fontSize: 20,
  },

  titleSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  iconCircle: {
    marginBottom: spacing.md,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  title: {
    ...typography.h2,
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  subTitle: {
    ...typography.body,
    textAlign: 'center',
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
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    ...typography.bodyBold,
    fontSize: 15,
    flex: 1,
    marginRight: spacing.sm,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonActive: {
    backgroundColor: colors.accent.cyan + '30',
    borderColor: colors.accent.cyan,
  },
  divider: {
    height: 1,
    backgroundColor: colors.glass.border,
    marginVertical: spacing.sm,
  },
  answer: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 20,
  },

  contactCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
    ...shadows.lg,
  },
  contactGradient: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  contactTitle: {
    ...typography.h4,
    fontSize: 20,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  contactText: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  contactButtonWrapper: {
    width: '100%',
  },
  contactButton: {
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  contactButtonText: {
    ...typography.bodyBold,
    fontSize: 15,
  },
});
