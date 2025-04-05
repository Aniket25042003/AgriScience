import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appName}>Crop Recommendation</Text>
        <Text style={styles.tagline}>Find the perfect crop for your soil</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="leaf" size={24} color="#4CAF50" />
            <Text style={styles.cardTitle}>Get Started</Text>
          </View>
          <Text style={styles.cardText}>
            Enter your soil and environmental data to receive personalized crop recommendations
            based on scientific analysis.
          </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('DataRetrieval')}
          >
            <Text style={styles.buttonText}>Enter Soil Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Features</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="analytics" size={24} color="#4CAF50" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Smart Analysis</Text>
              <Text style={styles.featureText}>
                Our app uses machine learning to analyze soil composition and environmental factors.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="list" size={24} color="#4CAF50" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Multiple Recommendations</Text>
              <Text style={styles.featureText}>
                Get top 3 crop recommendations with confidence scores.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="information-circle" size={24} color="#4CAF50" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Helpful Information</Text>
              <Text style={styles.featureText}>
                Access detailed help and FAQs about soil parameters and crop selection.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.helpButton}
          onPress={() => navigation.navigate('Help')}
        >
          <Ionicons name="help-circle" size={24} color="#4CAF50" />
          <Text style={styles.helpButtonText}>Help & FAQ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out" size={20} color="#FF5722" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 30,
    paddingTop: 50, // Increased to account for status bar
    alignItems: 'center',
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  appName: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    marginVertical: 5,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginLeft: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 15,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  featuresContainer: {
    padding: 20,
    paddingBottom: 40, // Added extra padding at the bottom for spacing
  },
  featuresTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 15,
    color: '#333',
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
    marginLeft: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingBottom: 35,
    backgroundColor: '#f5f5f5',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
  },
  helpButtonText: {
    color: '#4CAF50',
    marginLeft: 5,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBE9E7',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
  },
  signOutText: {
    color: '#FF5722',
    marginLeft: 5,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
});

export default HomeScreen;
