import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from './components/Home'
import Search from './components/Search'
import Camera from './components/Camera'
import Profile from './components/Profile'
import { setStatusBarBackgroundColor } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

export default function AppNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, colour, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Search') {
                    iconName = focused ? 'search' : 'search-outline';
                } else if (route.name === 'Camera') {
                    iconName = focused ? 'camera' : 'camera-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'man' : 'man-outline';
                } 

                return <Ionicons name={iconName} size={size} color={colour}/>;
            },
        })}
        tabBarOptions={{
            activeTintColor: '#967259',
            inactiveTintColor: 'gray',
        }}
      >
          <Tab.Screen name ="Home" component={Home}/>
          <Tab.Screen name ="Search" component={Search}/>
          <Tab.Screen name ="Camera" component={Camera}/>
          <Tab.Screen name ="Profile" component={Profile}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}