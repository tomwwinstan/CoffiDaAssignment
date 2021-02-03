import  React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:"",
      password:"",
      token: ""
    }
  }

    login = () => {
      axios.post('http://10.0.2.2:3333/api/1.0.0/user/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then((response) => {
        console.log(response.data)
        this.state.token = response.data.token
        console.log(this.state.token)
        // navigation.navigate('ProfileDetails', { id: response.data.id, token: response.data.token})
      }, (error) => {
        console.log(error)
      })
    }

    render() {

      const navigation = this.props.navigation;

        return (
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#967259'}}>

                <Image style ={styles.logo}
                source={require('../img/logo.png')} />
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
                <TouchableOpacity style={styles.loginBtn}
                onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.loginText}>Signup</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
    
}

const styles = StyleSheet.create({
      logo: {
        resizeMode: "stretch",
        height: 250,
        width: 250
      },
      inputView:{
        width:"80%",
        backgroundColor:"#dbc1ac",
        borderRadius:20,
        height:50,
        marginBottom:10,
        justifyContent:"center",
        padding:20
      },
      inputText:{
        height:50,
        color:"#38220f"
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#38220f",
        borderRadius:20,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginBottom:5
      },
      loginText:{
        color:"white"
      }
});

export default Login;