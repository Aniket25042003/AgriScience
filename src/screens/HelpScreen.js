import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const faqs = [
    {
      question: "How do I use this app?",
      answer: "Enter your soil and environment data on the Data Entry screen, then click 'Recommend' to get crop suggestions based on your inputs."
    },
    {
      question: "What do N, P, K stand for?",
      answer: "N is Nitrogen, P is Phosphorus, and K is Potassium. These are the three primary nutrients required for plant growth and are commonly found in fertilizers."
    },
    {
      question: "How accurate are the recommendations?",
      answer: "The recommendations are based on a machine learning model trained on agricultural data. While they provide good guidance, local expertise and specific conditions should also be considered."
    },
    {
      question: "What units should I use for the inputs?",
      answer: "Use the following units: N, P, K in kg/ha (kilograms per hectare), temperature in °C (Celsius), humidity in %, pH on a scale of 0-14, and rainfall in mm."
    },
    {
      question: "How do I measure soil nutrients (N, P, K)?",
      answer: "You can get your soil tested at local agricultural extension offices or by using commercial soil testing kits available at garden centers."
    },
    {
      question: "Can I save my soil data for future use?",
      answer: "Currently, the app doesn't support saving soil data, but we're working on adding this feature in a future update."
    },
    {
      question: "What if I don't know some of the values?",
      answer: "For the most accurate recommendations, all values should be provided. However, you can use average values for your region if specific measurements aren't available."
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Help & Frequently Asked Questions</Text>
        <Text style={styles.subtitle}>Find answers to common questions about using the Crop Recommendation App</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About the App</Text>
        <Text style={styles.paragraph}>
          This app uses machine learning to recommend suitable crops based on soil composition and environmental factors. 
          By analyzing your inputs for nitrogen (N), phosphorus (P), potassium (K), temperature, humidity, pH level, and rainfall, 
          we can suggest crops that are likely to thrive in those conditions.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        {faqs.map((faq, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.faqItem}
            onPress={() => toggleFaq(index)}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Ionicons 
                name={expandedFaq === index ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#4CAF50" 
              />
            </View>
            
            {expandedFaq === index && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        <Text style={styles.paragraph}>
          If you need additional help or have questions not covered here, please contact our support team at:
        </Text>
        <Text style={styles.contactEmail}>support@croprecommendation.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  faqAnswer: {
    fontSize: 15,
    color: '#666',
    marginTop: 10,
    lineHeight: 22,
  },
  contactEmail: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HelpScreen;
