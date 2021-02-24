import  React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SearchAllLocations from '../components/screens/search/SearchAllLocations';
import Location from '../components/screens/location/Location';
import ViewLocation from '../components/screens/location/ViewLocation';

class Search extends Component {
    render() {
        const Stack = createStackNavigator();

        return(
            <Stack.Navigator>
                <Stack.Screen name="SearchAllLocations" component={SearchAllLocations}></Stack.Screen>
                <Stack.Screen name="Location" component={Location}></Stack.Screen>
                <Stack.Screen name="ViewLocation" component={ViewLocation}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}

export default Search;