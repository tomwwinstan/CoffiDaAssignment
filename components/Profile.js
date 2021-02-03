import  React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Login from './Login';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './SignUp';
import ProfileDetails from './ProfileDetails';

class Profile extends Component {
    // constructor(props) {
    //     this.state = {
    //         auth: ""
    //     }
    // }

    // login = () => {
    //     if()
    // }
    render() {

        const Stack = createStackNavigator();

        return(
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}></Stack.Screen>
                <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
                <Stack.Screen name="ProfileDetails" component={ProfileDetails}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#967259',
      justifyContent: 'center'
    },
    title:{
        fontWeight:"bold",
        fontSize:50,
        color:"#ece0d1",
        marginBottom:40
      },
  });

export default Profile;