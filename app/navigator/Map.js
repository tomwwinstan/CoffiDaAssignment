import  React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CoffiMap from '../components/screens/map/CoffiMap';

class Map extends Component {
    render() {
        const Stack = createStackNavigator();

        return(
            <Stack.Navigator>
                <Stack.Screen name="CoffiMap" component={CoffiMap}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}

export default Map;