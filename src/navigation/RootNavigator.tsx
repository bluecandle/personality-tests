import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PaywallScreen from '../screens/PaywallScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TestIntroScreen from '../screens/TestIntroScreen';
import TestListScreen from '../screens/TestListScreen';
import TestQuestionScreen from '../screens/TestQuestionScreen';
import TestResultScreen from '../screens/TestResultScreen';

export type RootStackParamList = {
  TestList: undefined;
  TestIntro: { testId: string };
  TestQuestion: undefined;
  TestResult: undefined;
  Settings: undefined;
  Paywall: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0f172a',
    card: '#111827',
    border: '#1f2937',
  },
};

const RootNavigator = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TestList" component={TestListScreen} />
        <Stack.Screen name="TestIntro" component={TestIntroScreen} />
        <Stack.Screen name="TestQuestion" component={TestQuestionScreen} />
        <Stack.Screen name="TestResult" component={TestResultScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Paywall" component={PaywallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
