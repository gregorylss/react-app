// App.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from './src/screens/HomeScreen.jsx';
import ProfileScreen from './src/screens/ProfileScreen.jsx';
import SearchScreen from './src/screens/SearchScreen.jsx';
import CocktailDetailsScreen from './src/screens/CocktailScreen.jsx';  // Ajout de l'import pour CocktailDetailsScreen
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();





// Créez une fonction pour le Stack Navigator autour de SearchScreen et CocktailDetailsScreen
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="CocktailDetails" component={CocktailDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {

  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
        
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStack}  // Utilisez le Stack Navigator pour SearchScreen et CocktailDetailsScreen
          options={{
          
             
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


