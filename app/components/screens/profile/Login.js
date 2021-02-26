import  React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';

import { validateEmail } from '../../shared/Validation';
import { logIn } from '../../../api/ProfileOperations';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  resetDetails() {
    this.setState({
      email: '',
      password: ''
    })
  }

  login = async () => {
    if(validateEmail(this.state.email)) {
      await logIn(this.state.email, this.state.password, this.props.navigation)
      this.resetDetails()
    } else {
      Alert.alert('Invalid email address', this.state.email + ' is not the correct format for an email address')
    }
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#967259'}}>
        <Image style ={styles.logo}
        source={require('../../../assets/img/logo.png')} />
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
