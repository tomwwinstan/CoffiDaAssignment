import  React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleError } from './ErrorHandling';
import { validateEmail } from './Validation';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'tomwin@mmu.ac.uk',
      password: 'hello123',
      id: ''
    }
  }

  login = () => {
    if(validateEmail(this.state.email)) {
      axios.post('http://10.0.2.2:3333/api/1.0.0/user/login', {
      email: this.state.email,
      password: this.state.password
      })
      .then((response) => {
        storeData(response.data.token, JSON.stringify(response.data.id))
        this.setState({ id:response.data.id })
        this.move()
      }, (error) => {
        handleError(error, this.props.navigation, true)
      })
    } else {
      Alert.alert('Invalid email address', this.state.email + ' is not the correct format for an email address')
    }
    
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
          textContentType={"emailAddress"}
          style={styles.inputText}
          onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView}>
          <TextInput placeholder="Password"
          textContentType={"password"}
          secureTextEntry={true}
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

const storeData = async (auth, id) => {
  try {
    await AsyncStorage.setItem('@auth_key', auth)
    await AsyncStorage.setItem('@id_key', id)
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