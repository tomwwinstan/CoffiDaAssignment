import  React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class UpdateDetails extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            details: [],
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            id: '',
            authKey: '',
        }
      }

    componentDidMount() {
        this.getData()
    }

    getData = async() => {
        try {
            this.state.authKey = await AsyncStorage.getItem('@auth_key')
            this.buildDetails()
        } catch(e) {
            console.log(e)
        }
    }

    buildDetails() {
        const details = this.props.route.params.details
        this.state.details = details
        this.setState({
            id: details.user_id,
            first_name: details.first_name,
            last_name: details.last_name,
            email: details.email,
            password: details.password
        })
    }

    update = () => {
        axios.patch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.id, {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }, { headers: {
            'X-Authorization': this.state.authKey}
        })
        .then((response) => {
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
        return(
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#967259'}}>
                <Text style={styles.title}>Update Details</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.text} value={this.state.first_name} onChangeText={text => this.setState({first_name:text})}></TextInput>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.text} value={this.state.last_name} onChangeText={text => this.setState({last_name:text})}></TextInput>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.text} value={this.state.email} onChangeText={text => this.setState({email:text})}></TextInput>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.text} value={this.state.password} onChangeText={text => this.setState({password:text})}></TextInput>
                </View>
                <TouchableOpacity style={styles.updateBtn} onPress={this.update}>
                    <Text style={styles.updateTxt}>Update</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontWeight:"bold",
        fontSize:50,
        color:"#ece0d1",
        marginBottom:40,
        marginLeft: 5
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
    text: {
        height:50,
        color:"#38220f"
    },
    updateBtn:{
        width:"80%",
        backgroundColor:"#38220f",
        borderRadius:20,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginBottom:5
      },
      updateTxt:{
        color:"white"
      }
  });

export default UpdateDetails;