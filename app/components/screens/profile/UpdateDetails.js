import  React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

import { validateEmail, validatePassword } from '../../shared/Validation';
import { updateUserDetails } from '../../../api/ProfileOperations';

class UpdateDetails extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
      }

    componentDidMount() {
        this.buildDetails()
    }

    buildDetails() {
        const user_details = this.props.route.params.details
        this.setState({
            first_name: user_details.first_name,
            last_name: user_details.last_name,
            email: user_details.email
        })
    }

    buildUpdatedUser() {
        return {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password
        }
    }

    update = async() => {
        if(validateEmail(this.state.email)) {
            if(this.state.changedPassword) {
                validatePassword(this.state.password)
            }
            await updateUserDetails(this.buildUpdatedUser())
            const navigation = this.props.navigation;
            navigation.navigate('ProfileDetails')
        } else {
            Alert.alert('Invalid email address ', this.state.email + ' is not the correct format for an email address')
        }
        
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
                    <TextInput style={styles.text} onChangeText={text => this.setState({password:text, changedPassword:true})}></TextInput>
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