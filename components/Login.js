import  React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:"",
      password:"",
      id: ""
    }
  }

  login = () => {
    axios.post('http://10.0.2.2:3333/api/1.0.0/user/login', {
      // email: this.state.email,
      // password: this.state.password
      email: 'tomwin@mmu.ac.uk',
      password: 'hello123'
    })
    .then((response) => {
      storeData(response.data.token)
      this.setState({ id:response.data.id })
      this.move()
    }, (error) => {
      console.log(error)
    })
  }

  move = () => {
    const navigation = this.props.navigation;
    navigation.navigate('ProfileDetails', {id: this.state.id})
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

const storeData = async (auth) => {
  try {
    await AsyncStorage.setItem('@auth_key', auth)
    console.log('Auth key stored')
  } catch (e) {
    console.log(e)
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