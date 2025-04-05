import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useFonts, Inter_600SemiBold } from '@expo-google-fonts/inter';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import DataRetrievalScreen from '../screens/DataRetrievalScreen';
import RecommendationScreen from '../screens/RecommendationScreen';
import HelpScreen from '../screens/HelpScreen';

const Stack = createNativeStackNavigator();

const commonHeaderStyle = {
  backgroundColor: '#4CAF50',
};

const commonHeaderTitleStyle = {
  fontFamily: 'Inter_600SemiBold',
  color: 'white',
};

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_600SemiBold,
  });

  // Handle user state changes
  function onAuthStateChangedHandler(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChangedHandler);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing || !fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: commonHeaderStyle,
          headerTitleStyle: commonHeaderTitleStyle,
          headerTintColor: 'white',
        }}
      >
        {user ? (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="DataRetrieval" 
              component={DataRetrievalScreen} 
              options={{ title: 'Enter Soil Data' }}
            />
            <Stack.Screen 
              name="Recommendation" 
              component={RecommendationScreen} 
              options={{ title: 'Recommended Crops' }}
            />
            <Stack.Screen 
              name="Help" 
              component={HelpScreen} 
              options={{ title: 'Help & FAQ' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen} 
              options={{ title: 'Create Account' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
