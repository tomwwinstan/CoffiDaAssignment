import  React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:"",
      password:"",
      auth: ""
    }
  }

    login = () => {
      axios.post('http://10.0.2.2:3333/api/1.0.0/user/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then((response) => {
        console.log(response.data)
        this.state.auth = response.data.token
      }, (error) => {
        console.log(error)
      })
    }

    render() {
        return (
          <View>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.title}>CoffiDa</Text>
                <View style={styles.inputView}>
                    <TextInput placeholder="Email"
                    style={styles.inputText}
                    onChangeText={text => this.setState({email:text})}/>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder="Password"
                    style={styles.inputText}
                    onChangeText={text => this.setState({password:text})}/>
                </View>
                <TouchableOpacity style={styles.loginBtn}
                                  onPress={this.login}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>Signup</Text>
                </TouchableOpacity>
            </ScrollView>
          </View>
        )
    }
    
}

const styles = StyleSheet.create({
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
        color:"white"
      },
      loginBtn:{
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

export default Login;