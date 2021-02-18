import  React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AllLocations from './location/AllLocations';
import Location from './location/Location';
import ViewLocation from './location/ViewLocation';

class Home extends Component {
    render() {
        const Stack = createStackNavigator();

        return(
            <Stack.Navigator>
                <Stack.Screen name="AllLocations" component={AllLocations}></Stack.Screen>
                <Stack.Screen name="Location" component={Location}></Stack.Screen>
                <Stack.Screen name="ViewLocation" component={ViewLocation}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}

export default Home;