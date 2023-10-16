import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

//navigation import
import { NavigationContainer } from '@react-navigation/native'

//stack imports
import 'react-native-gesture-handler'
import { UnauthorizedStack } from './stacks/unauthorizedStack';

export default function App() {
  return (
      <NavigationContainer>
        <UnauthorizedStack />
      </NavigationContainer>
  );
}
