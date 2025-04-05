import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RecommendationCard from '../components/RecommendationCard';

const RecommendationScreen = ({ route, navigation }) => {
  const { recommendations } = route.params || { 
    recommendations: [
      { crop: 'Rice', probability: 0.85 },
      { crop: 'Wheat', probability: 0.72 },
      { crop: 'Maize', probability: 0.65 }
    ] 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Recommended Crops</Text>
      <Text style={styles.subtitle}>Based on your soil and climate data</Text>
      
      <ScrollView style={styles.scrollView}>
        {recommendations.map((item, index) => (
          <RecommendationCard
            key={index}
            crop={item.crop}
            probability={item.probability}
            rank={index + 1}
          />
        ))}
      </ScrollView>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          These recommendations are based on your soil composition and local climate conditions.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.replace('DataRetrieval')}
        >
          <Ionicons name="refresh" size={20} color="white" />
          <Text style={styles.buttonText}>Try Different Data</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.homeButton]} 
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={20} color="white" />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
  },
  infoText: {
    color: '#2E7D32',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  homeButton: {
    backgroundColor: '#388E3C',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default RecommendationScreen;
