import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ReportItemScreen from './src/screens/ReportItemScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import AdminDashboard from './src/screens/AdminDashboard';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { user } = useAuth();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Text>🏠</Text> }} />
      <Tab.Screen name="Report" component={ReportItemScreen} options={{ tabBarIcon: () => <Text>📷</Text> }} />
      {user?.role === 'admin' && (
        <Tab.Screen name="Admin" component={AdminDashboard} options={{ tabBarIcon: () => <Text>🛡️</Text> }} />
      )}
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => <Text>👤</Text> }} />
    </Tab.Navigator>
  );
}

function Root() {
  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </AuthProvider>
  );
}