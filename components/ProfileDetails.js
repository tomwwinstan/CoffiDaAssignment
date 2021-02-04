import  React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: true,
            authKey: '',
            details: []
        }
      }

    componentDidMount() {
        this.getData();
    }

    getData = async() => {
        try {
            this.state.authKey = await AsyncStorage.getItem('@auth_key')
            this.getDetails()
        } catch(e) {
            console.log(e)
        }
    }
    
    getDetails = () => {
        const {id} = this.props.route.params
        axios.get('http://10.0.2.2:3333/api/1.0.0/user/' + id, {headers: {
            'X-Authorization': this.state.authKey}
        })
        .then((response) => {
            console.log(response.data)
            this.setState({
                isLoading: false,
                details: response.data
            })
            console.log(this.state.details)
        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    render() {
        if(this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="small" />
                </View>
            );
        } else {
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>Profile Details</Text>
                    <View>
                        <Text style={styles.textResults}>{this.state.details.first_name} {this.state.details.last_name}</Text>
                        <Text style={styles.textResults}>{this.state.details.email}</Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#967259',
      paddingLeft: 5
    },
    title:{
        fontWeight:"bold",
        fontSize:50,
        color:"#ece0d1",
        marginBottom:40
      },
      textResults: {
        fontSize:20,
        color:"white"
    }
  });

export default ProfileDetails;