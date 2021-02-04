import  React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: true,
            details: []
        }
      }

    componentDidMount() {
        this.getDetails();
    }
    
    getDetails = () => {
        axios.get('http://10.0.2.2:3333/api/1.0.0/user/8', {headers: {
            'X-Authorization': 'accb8973c5edaef3d86a37e2a3f85329'}
        })
        .then((response) => {
            console.log(response.data)
            // this.state.details = response.data
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
                <View>
                    <Text style={styles.title}>Profile Details</Text>
                    <View>
                        <Text style={styles.textResults}>{this.state.details.first_name}</Text>
                        <Text style={styles.textResults}>{this.state.details.last_name}</Text>
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
      justifyContent: 'center'
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