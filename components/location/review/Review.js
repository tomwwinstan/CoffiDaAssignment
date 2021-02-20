import  React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {likeReview} from './FavouriteReview.js';
import {unlikeReview} from './FavouriteReview.js';

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            review: props.data,
            authKey: ''
        }
    }

    getData = async() => {
        try {
            this.state.authKey = await AsyncStorage.getItem('@auth_key')
        } catch(e) {
            console.log(e)
        }
    }

    isYourReview()

    componentDidMount() {
        this.getData()
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.review.review_body}</Text>
                <View style={styles.rating}>
                        <Text style={styles.ratingText}>Overall:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.overall_rating}/>  Price:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.price_rating}/></Text>
                        <Text style={styles.ratingText}>Quality:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.quality_rating}/>  Clenliness:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.clenliness_rating}/></Text>
                </View>
                <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' }}>
                    <Text style={styles.likeText}>Likes: {this.state.review.likes}</Text>
                    <TouchableOpacity style={styles.likeBtn}
                        onPress={() => likeReview(this.state.authKey, this.props.location_id, this.state.review.review_id)}
                    ><Text style={styles.likeText}>Like</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.likeBtn}
                        onPress={() => unlikeReview(this.state.authKey, this.props.location_id, this.state.review.review_id)}
                    ><Text style={styles.likeText}>UnLike</Text></TouchableOpacity>
                </View>
            </View>
        )
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
        fontSize:20,
        color:"#ece0d1",
        marginBottom:5
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
    likeText: {
        color:'white'
      },
    likeBtn:{
        width:"20%",
        backgroundColor:"#38220f",
        borderRadius:20,
        height:25,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:5
      },
  });

export default Review;