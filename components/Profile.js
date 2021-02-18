import  React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import SignUp from './SignUp';
import ProfileDetails from './ProfileDetails';
import UpdateDetails from './UpdateDetails';

class Profile extends Component {
    render() {

        const Stack = createStackNavigator();

        return(
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}></Stack.Screen>
                <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
                <Stack.Screen name="ProfileDetails" component={ProfileDetails}></Stack.Screen>
                <Stack.Screen name="UpdateDetails" component={UpdateDetails}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}

export default Profile;