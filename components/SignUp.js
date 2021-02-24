import  React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { handleError } from './ErrorHandling';
import { validateEmail, validatePassword } from './Validation';

class SignUp extends Component {
    state = {
        firstName:"",
        lastName:"",
        email:"",
        password: ""
    }

    signUp = () => {
      if(validateEmail(this.state.email)) {
        if(validatePassword(this.state.password)) {
          axios.post('http://10.0.2.2:3333/api/1.0.0/user', {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password
          })
          .then((response) => {
            console.log('User created')
            this.moveLogin()
          }, (error) => {
            handleError(error)
          })
        } else {
          Alert.alert('Invalid password', 'Password must have at least 6 characters, one lowercase and one uppercase')
        }
      } else {
        Alert.alert('Invalid email address', this.state.email + ' is not the correct format for an email address')
      }
    }

    moveLogin = () => {
      const navigation = this.props.navigation;
      navigation.navigate('Login')
  }

    render() {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#967259'}}> 
                <Text style={styles.title}>Register</Text>
                <View style={styles.inputView}>
                    <TextInput placeholder="First Name"
                        style={styles.inputText}
                        onChangeText={text => this.setState({firstName:text})}/>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder="Last Name"
                        style={styles.inputText}
                        onChangeText={text => this.setState({lastName:text})}/>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder="Email"
                        textContentType={"emailAddress"}
                        style={styles.inputText}
                        onChangeText={text => this.setState({email:text})}/>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder="Password"
                        textContentType={"newPassword"}
                        secureTextEntry={true}
                        style={styles.inputText}
                        onChangeText={text => this.setState({password:text})}/>
                </View>
                <TouchableOpacity style={styles.signUpBtn}
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