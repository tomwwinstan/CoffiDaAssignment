import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from './Home'
import Search from './Search'
import Camera from './Camera'
import Profile from './Profile'

const Tab = createBottomTabNavigator();

export default function AppNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Profile"
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