import  React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AllLocations from '../components/screens/location/AllLocations';
import Location from '../components/screens/location/Location';
import ViewLocation from '../components/screens/location/ViewLocation';
import Review from '../components/screens/location/review/Review';
import AddReview from '../components/screens/location/review/AddReview';
import UpdateReview from '../components/screens/location/review/UpdateReview';
import TakePhoto from '../components/screens/location/review/photo/TakePhoto';

class Home extends Component {
    render() {
        const Stack = createStackNavigator();

        return(
            <Stack.Navigator>
                <Stack.Screen name="AllLocations" component={AllLocations}></Stack.Screen>
                <Stack.Screen name="Location" component={Location}></Stack.Screen>
                <Stack.Screen name="ViewLocation" component={ViewLocation}></Stack.Screen>
                <Stack.Screen name="Review" component={Review}></Stack.Screen>
                <Stack.Screen name="AddReview" component={AddReview}></Stack.Screen>
                <Stack.Screen name="UpdateReview" component={UpdateReview}></Stack.Screen>
                <Stack.Screen name="TakePhoto" component={TakePhoto}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}

export default Home;