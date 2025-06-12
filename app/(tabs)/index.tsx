import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Ekranlar
import OnBoardingScreen from '../../src/screens/OnBoarding/OnBoardingScreen';
import LoginScreen from '../../src/screens/AccountScreen/LoginScreen';
import RegisterScreen from '../../src/screens/AccountScreen/RegisterScreen';
import Home from '@/src/screens/Home';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      setShowOnboarding(value == 'true'); // true değilse göster
    };
    checkOnboardingStatus();
  }, []);

  if (showOnboarding === null) return null; 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      
    
          <>
          

          <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={Home} />

          </>
      
      
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
