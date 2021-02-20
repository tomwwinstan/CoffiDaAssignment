import  React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
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

    logout = () => {
        axios.post('http://10.0.2.2:3333/api/1.0.0/user/logout', {}, { headers: {
            "X-Authorization": this.state.authKey }
        })
        .then((response) => {
            console.log('Logged out')
            this.moveLogin()
        }, (error => {
            console.log(error)
        }))
    }

    moveLogin = () => {
        const navigation = this.props.navigation;
        navigation.navigate('Login')
    }

    updateDetails = () => {
        const navigation = this.props.navigation;
        navigation.navigate('UpdateDetails', {details: this.state.details})
    }

    render() {
        if(this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#38220f" />
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>Profile Details</Text>
                    <View>
                        <Text style={styles.textResults}>{this.state.details.first_name} {this.state.details.last_name}</Text>
                        <Text style={styles.textResults}>{this.state.details.email}</Text>
                        <TouchableOpacity onPress={this.updateDetails} style={styles.logout_btn}>
                            <Text style={styles.logout_text}>Update Details</Text>
                        </TouchableOpacity>
                        <FlatList
                        data={this.state.details.favourite_locations}
                        renderItem={({item})=> (
                            <View style={styles.favourite_locations_container}>
                                <Text style={styles.favouriteTitle}>Favourite Locations</Text>
                                <Text style={styles.textResults}>{item.location_name} : {item.location_town}</Text>
                            </View>
                        )}
                        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
                        keyExtractor={(item,index) => item.location_id.toString()}
                        />
                        <TouchableOpacity onPress={this.logout} style={styles.logout_btn}>
                            <Text style={styles.logout_text}>Log Out</Text>
                        </TouchableOpacity>
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
      justifyContent: 'center',
      paddingLeft: 5,
      paddingRight: 5
    },
    favourite_locations_container: {
        backgroundColor: "#38220f",
        marginTop: 10,
    },
    divider: {
        padding: 10,
        backgroundColor: '#967259'
    },
    title:{
        fontWeight:"bold",
        fontSize:50,
        color:"#ece0d1",
        marginBottom:40
    },
    logout_btn: {
        backgroundColor:"#38220f",
        borderRadius:20,
        height:40,
        padding: 10,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 20,
        marginBottom:5
    },
    logout_text: {
        color: 'white',
        fontSize: 20,
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