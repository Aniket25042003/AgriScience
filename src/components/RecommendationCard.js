import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecommendationCard = ({ crop, probability, rank }) => {
  // Different colors for different ranks
  const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];
  
  return (
    <View style={[styles.card, { borderColor: colors[rank - 1] || '#4CAF50' }]}>
      <Text style={styles.rank}>#{rank}</Text>
      <Text style={styles.crop}>{crop}</Text>
      <Text style={styles.probability}>Confidence: {(probability * 100).toFixed(2)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rank: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  crop: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  probability: {
    fontSize: 16,
    color: '#666',
  },
});

export default RecommendationCard;
