import  React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Location from './location/Location';
import ViewLocation from './location/ViewLocation';
import SearchAllLocations from './Search/SearchAllLocations';

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