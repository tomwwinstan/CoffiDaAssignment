import  React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';

import { validateEmail, validatePassword } from '../../shared/Validation';
import { addNewUser } from '../../../api/ProfileOperations';

class SignUp extends Component {
  state = {
      first_name:"",
      last_name:"",
      email:"",
      password: ""
  }

  buildUser() {
    return {
        "first_name": this.state.first_name,
        "last_name": this.state.last_name,
        "email": this.state.email,
        "password": this.state.password
    }
  }

  signUp = () => {
    if(validateEmail(this.state.email)) {
      if(validatePassword(this.state.password)) {
        addNewUser(this.buildUser())
        const navigation = this.props.navigation;
        navigation.navigate('Login')
      } else {
        Alert.alert('Invalid password', 'Password must have at least 6 characters, one lowercase and one uppercase')
      }
    } else {
      Alert.alert('Invalid email address', this.state.email + ' is not the correct format for an email address')
    }
  }

  render() {
      return (
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#967259'}}> 
            <Text style={styles.title}>Register</Text>
            <View style={styles.inputView}>
              <TextInput placeholder="First Name"
                style={styles.inputText}
                onChangeText={text => this.setState({first_name:text})}
                />
            </View>
            <View style={styles.inputView}>
              <TextInput placeholder="Last Name"
                style={styles.inputText}
                onChangeText={text => this.setState({last_name:text})}
                />
            </View>
            <View style={styles.inputView}>
              <TextInput placeholder="Email"
                textContentType={"emailAddress"}
                style={styles.inputText}
                onChangeText={text => this.setState({email:text})}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput placeholder="Password"
                  textContentType={"newPassword"}
                  secureTextEntry={true}
                  style={styles.inputText}
                  onChangeText={text => this.setState({password:text})}
                  />
              </View>
              <TouchableOpacity 
                style={styles.signUpBtn}
                onPress={this.signUp}>
                <Text style={styles.loginText}>Sign Up!</Text>
              </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems: 'center',
      },
      title:{
        fontWeight:"bold",
        fontSize:50,
        color:"#ece0d1",
        marginBottom:40
      },
      inputView:{
        width:"80%",
        backgroundColor:"#dbc1ac",
        borderRadius:20,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      inputText:{
        height:50,
        color:"#38220f"
      },
      signUpBtn:{
        width:"80%",
        backgroundColor:"#38220f",
        borderRadius:20,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginText:{
        color:"white"
      }
});

export default SignUp;