import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { getRecommendations } from '../api/api';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const DataRetrievalScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  
  const [soilData, setSoilData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setSoilData({ ...soilData, [key]: value });
  };

  const validateInputs = () => {
    const requiredFields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'];
    const emptyFields = requiredFields.filter(field => soilData[field] === '');
    
    if (emptyFields.length > 0) {
      Alert.alert(
        'Missing Information',
        `Please fill in all fields to get accurate recommendations.`,
        [{ text: 'OK' }]
      );
      return false;
    }
    
    return true;
  };

  const handleImportData = async () => {
    try {
      setImportLoading(true);
      
      const db = getFirestore();
      const soilDataRef = collection(db, 'soilData');
      const latestDataQuery = query(soilDataRef, orderBy('timestamp', 'desc'), limit(1));
      
      const querySnapshot = await getDocs(latestDataQuery);
      
      if (!querySnapshot.empty) {
        const latestData = querySnapshot.docs[0].data();
        setSoilData({
          N: latestData.N.toString(),
          P: latestData.P.toString(),
          K: latestData.K.toString(),
          temperature: latestData.temperature.toString(),
          humidity: latestData.humidity.toString(),
          ph: latestData.ph.toString(),
          rainfall: latestData.rainfall.toString()
        });
        
        Alert.alert('Success', 'Latest soil data imported successfully!');
      } else {
        Alert.alert('Error', 'No soil data found in the database.');
      }
    } catch (error) {
      console.error('Error importing data:', error);
      Alert.alert('Error', 'Failed to import soil data. Please try again.');
    } finally {
      setImportLoading(false);
    }
  };

  const handleRecommend = async () => {
    if (!validateInputs()) return;
    
    try {
      setLoading(true);
      
      // Convert string values to numbers
      const numericData = {};
      Object.keys(soilData).forEach(key => {
        numericData[key] = parseFloat(soilData[key]);
      });
      
      console.log('Sending data:', numericData);
      
      // Get recommendations from API
      const recommendations = await getRecommendations(numericData);
      
      console.log('Received recommendations:', recommendations);
      
      if (!recommendations || !Array.isArray(recommendations)) {
        throw new Error('Invalid response from server');
      }
      
      // Navigate to recommendation screen with results
      navigation.replace('Recommendation', { recommendations });
    } catch (error) {
      console.error('Error in handleRecommend:', error);
      Alert.alert('Error', 'An error occurred while processing your data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Enter Soil & Environment Data</Text>
          <Text style={styles.subtitle}>Provide accurate information for better recommendations</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.importContainer}>
            <Button 
              title={importLoading ? "Importing..." : "Import Latest Data"} 
              onPress={handleImportData}
              color="#2196F3"
              disabled={importLoading}
            />
          </View>

          <View style={styles.sectionHeader}>
            <Ionicons name="nutrition" size={20} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Soil Nutrients (kg/ha)</Text>
          </View>
          
          <InputField
            label="Nitrogen (N)"
            value={soilData.N}
            onChangeText={(value) => handleInputChange('N', value)}
            placeholder="Enter nitrogen value"
            keyboardType="numeric"
          />
          
          <InputField
            label="Phosphorus (P)"
            value={soilData.P}
            onChangeText={(value) => handleInputChange('P', value)}
            placeholder="Enter phosphorus value"
            keyboardType="numeric"
          />
          
          <InputField
            label="Potassium (K)"
            value={soilData.K}
            onChangeText={(value) => handleInputChange('K', value)}
            placeholder="Enter potassium value"
            keyboardType="numeric"
          />

          <View style={styles.sectionHeader}>
            <Ionicons name="thermometer" size={20} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Environmental Factors</Text>
          </View>
          
          <InputField
            label="Temperature (°C)"
            value={soilData.temperature}
            onChangeText={(value) => handleInputChange('temperature', value)}
            placeholder="Enter temperature"
            keyboardType="numeric"
          />
          
          <InputField
            label="Humidity (%)"
            value={soilData.humidity}
            onChangeText={(value) => handleInputChange('humidity', value)}
            placeholder="Enter humidity"
            keyboardType="numeric"
          />
          
          <InputField
            label="pH Value"
            value={soilData.ph}
            onChangeText={(value) => handleInputChange('ph', value)}
            placeholder="Enter pH (0-14)"
            keyboardType="numeric"
          />
          
          <InputField
            label="Rainfall (mm)"
            value={soilData.rainfall}
            onChangeText={(value) => handleInputChange('rainfall', value)}
            placeholder="Enter annual rainfall"
            keyboardType="numeric"
          />

          <View style={styles.buttonContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Processing data...</Text>
              </View>
            ) : (
              <Button 
                title="Get Recommendations" 
                onPress={handleRecommend}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  form: {
    margin: 15,
    marginTop: 20,
    marginBottom: 30,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  importContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 10,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 25,
    marginBottom: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  loadingText: {
    marginTop: 10,
    color: '#4CAF50',
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  }
});

export default DataRetrievalScreen;
