import  React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../components/screens/profile/Login';
import SignUp from '../components/screens/profile/SignUp';
import ProfileDetails from '../components/screens/profile/ProfileDetails';
import UpdateDetails from '../components/screens/profile/UpdateDetails';

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