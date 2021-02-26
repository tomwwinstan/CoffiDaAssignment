import  React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';

import { logOut, getDetails } from '../../../api/ProfileOperations';

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: true,
            isHidden: false,
            details: []
        }
      }
    
    componentDidMount() {
        this._onFocusListener = this.props.navigation.addListener('focus', () => {
            this.getUserDetails();
          });
        this._onFocusListener = this.props.navigation.addListener('tabPress', () => {
            this.getUserDetails();
        })
    }
    
    getUserDetails = async () => {
        await getDetails(this.props.navigation).then(res => {this.setState({details: res.data, isLoading: false})})
    }

    logout = async () => {
        await logOut()
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
                        <Text style={styles.favouriteTitle}>Favourite Locations</Text>
                        <FlatList
                        data={this.state.details.favourite_locations}
                        renderItem={({item})=> (
                            <View style={styles.favourite_locations_container}>
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
        padding: 5,
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