import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import HomeScreen from './screens/GoodsListPage';
import GoodDetails from './screens/GoodDetailsPage';


const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Goods list" component={HomeScreen} />
        <Stack.Screen name="Good details" component={GoodDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

