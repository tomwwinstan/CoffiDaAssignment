import  React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
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
            console.log('Got personal details for id ' + id)
            this.setState({
                isLoading: false,
                details: response.data
            })
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
                        <FlatList
                        data={this.state.details.favourite_locations}
                        renderItem={({item})=> (
                            <View style={styles.favourite_locations_container}>
                                <Text style={styles.favouriteTitle}>Favourite Locations</Text>
                                <Text style={styles.textResults}>{item.location_name} : {item.location_town}</Text>
                            </View>
                        )}
                        keyExtractor={(item,index) => item.location_id.toString()}
                        />
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
      paddingLeft: 5,
      paddingRight: 5
    },
    favourite_locations_container: {
        backgroundColor: "#38220f",
        marginTop: 10,
    },
    title:{
        fontWeight:"bold",
        fontSize:50,
        color:"#ece0d1",
        marginBottom:40
    },
    favouriteTitle: {
        color:"#ece0d1",
        fontSize:30,
        borderBottomWidth: 5,
        borderBottomColor: "#ece0d1",
        marginBottom: 5,
    },
    textResults: {
        fontSize:20,
        color:"white"
    },
  });

export default ProfileDetails;