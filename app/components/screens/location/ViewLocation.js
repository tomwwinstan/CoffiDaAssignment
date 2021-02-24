import  React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import axios from 'axios';

import Review from './review/Review'

class ViewLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authKey: '',
            location: [],
            isLoading: true,
            location_id: ''
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async() => {
        try {
            this.state.authKey = await AsyncStorage.getItem('@auth_key')
            this.getLocation()
        } catch(e) {
            console.log(e)
        }
    }

    getLocation = () => {
        const {id} = this.props.route.params
        axios.get('http://10.0.2.2:3333/api/1.0.0/location/' + id, { headers: {
            'X-Authorization': this.state.authKey }
        })
        .then((response) => {
            this.setState({
                location: response.data,
                isLoading: false,
                location_id: response.data.location_id
            })
        })
        .catch((error) => {
            console.log('error ' + error)
        })
    }

    render() {

        const navigation = this.props.navigation;

        if(this.state.isLoading) {
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#38220f" />
                </View>
            )
        } else {
            return(
                <View View style={styles.container}>
                    <Text style={styles.title}>{this.state.location.location_name}</Text>
                    <View style={styles.loctionContent}>
                        <Text style={styles.townText}>{this.state.location.location_town}</Text>
                        <View style={styles.rating}>
                            <Text style={styles.ratingText}>Average Overall Rating:  <Rating type='star' imageSize={25} readonly={true} fractions={2} startingValue={this.state.location.avg_overall_rating}/></Text>
                            <Text style={styles.ratingText}>Average Price Rating:  <Rating type='star' imageSize={25} readonly={true} fractions={2} startingValue={this.state.location.avg_price_rating}/></Text>
                            <Text style={styles.ratingText}>Average Quality Rating:  <Rating type='star' imageSize={25} readonly={true} fractions={2} startingValue={this.state.location.avg_quality_rating}/></Text>
                            <Text style={styles.ratingText}>Average Clenliness Rating:  <Rating type='star' imageSize={25} readonly={true} fractions={2} startingValue={this.state.location.avg_clenliness_rating}/></Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.addReviewBtn} onPress={() => navigation.navigate("AddReview", {location_id: this.state.location_id})}><Text style={styles.addReviewText}>Add a review</Text></TouchableOpacity>

                    <FlatList
                    data={this.state.location.location_reviews}
                    renderItem={({item}) => (
                        <Review data={item} navigation={this.props.navigation} location_id={this.state.location_id}/>
                    )}
                    ItemSeparatorComponent={() => <Divider style={styles.divider} />}
                    keyExtractor={(item,index) => item.review_id.toString()}
                    />
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
        padding: 10
      },
    loctionContent: {
        backgroundColor: "#38220f",
        borderRadius: 20,
        padding: 5
    },
    title:{
        fontWeight:"bold",
        fontSize:50,
        color:"#ece0d1"
      },
    divider: {
        padding: 5,
        backgroundColor: '#967259'
    },
    townText: {
        fontSize: 25,
        color:"#ece0d1"
      },
    rating: {
        backgroundColor: "white",
        borderRadius: 10,
        margin: 5
      },
    ratingText: {
        color:"#38220f",
        marginBottom: 5,
        marginLeft:5,
        fontSize: 15
    },
    addReviewBtn: {
        width:"40%",
        backgroundColor:"#38220f",
        borderRadius:20,
        height:25,
        alignItems:"center",
        justifyContent:"center",
        margin:5
    },
    addReviewText: {
        color:'#ece0d1',
        fontSize: 18
    }
  });

export default ViewLocation;