import  React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {likeReview} from './FavouriteReview.js';
import {unlikeReview} from './FavouriteReview.js';
import {getDetails} from '../../FindUserDetails.js';
import { deleteReview, updateReview } from './EditDeleteReview.js';

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            review: props.data,
            authKey: '',
            user_id: '',
            reviews: [],
            canEditReview: false,
            isHidden: false
        }
    }

    getData = async() => {
        try {
            this.state.authKey = await AsyncStorage.getItem('@auth_key')
            this.state.user_id = await AsyncStorage.getItem('@id_key')
            this.checkIfUsersReview()
        } catch(e) {
            console.log(e)
        }
    }

    componentDidMount() {
        this.getData()
    }

    checkIfUsersReview = async () => {
        await getDetails(this.state.authKey, this.state.user_id).then(res => {this.setState({reviews: res.data.reviews})})
        this.state.reviews.map((item) => {
            if(JSON.stringify(this.state.review) === JSON.stringify(item.review)) {
                this.setState({canEditReview: true})
            }
        })
    }

    updateReview = () => {
        const navigation = this.props.navigation;
        navigation.navigate("UpdateReview", {loc_id : this.props.location_id, review: this.state.review}, {navigation: this.props.navigation})
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.review.review_body}</Text>
                { this.state.canEditReview && 
                <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={styles.likeBtn}
                        onPress={() => this.updateReview()}
                    ><Text style={styles.text}>Edit</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.deleteBtn}
                        onPress={() => deleteReview(this.state.authKey, this.props.location_id, this.state.review.review_id)}
                    ><Text style={styles.text}>Delete</Text></TouchableOpacity>
                </View>
                }
                <View style={styles.rating}>
                        <Text style={styles.ratingText}>Overall:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.overall_rating}/>  Price:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.price_rating}/></Text>
                        <Text style={styles.ratingText}>Quality:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.quality_rating}/>  Clenliness:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.clenliness_rating}/></Text>
                </View>
                <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' }}>
                    <Text style={styles.likesText}>Likes: {this.state.review.likes}</Text>
                    <TouchableOpacity style={styles.likeBtn}
                        onPress={() => likeReview(this.state.authKey, this.props.location_id, this.state.review.review_id)}
                    ><Text style={styles.text}>Like</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.likeBtn}
                        onPress={() => unlikeReview(this.state.authKey, this.props.location_id, this.state.review.review_id)}
                    ><Text style={styles.text}>UnLike</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#38220f',
      justifyContent: 'center',
      padding: 5,
      borderRadius: 20
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
    text: {
        color:'#38220f'
      },
    likesText: {
        color: '#ece0d1'
    },
    likeBtn: {
        width:"20%",
        backgroundColor:"#ece0d1",
        borderRadius:20,
        height:25,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:5
      },
    deleteBtn: {
        width:"20%",
        backgroundColor:"red",
        borderRadius:20,
        height:25,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:5
    }
  });

export default Review;