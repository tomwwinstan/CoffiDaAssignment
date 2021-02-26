import  React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

import { validateReviewBody } from '../../../shared/Validation';
import { addReviewToLocation } from '../../../../api/ReviewOperations';

class AddReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            overall_rating: 0,
            price_rating: 0,
            quality_rating: 0,
            clenliness_rating: 0,
            review_body: ""
        }
    }

    buildNewReview() {
        return {
            "overall_rating": this.state.overall_rating,
            "price_rating": this.state.price_rating,
            "quality_rating": this.state.quality_rating,
            "clenliness_rating": this.state.clenliness_rating,
            "review_body": this.state.review_body
        }
    }

    addAReview = async () => {
        if(validateReviewBody(this.state.review_body)) {
            Alert.alert('Contains profanity')
            } else {
                const {location_id} = this.props.route.params
                await addReviewToLocation(location_id, this.buildNewReview())
                const navigation = this.props.navigation;
                navigation.navigate('ViewLocation', {id: location_id})
        }
    }

    render() {
        return(
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#967259'}}> 
                <Text style={styles.title}>Add a review</Text>
                <View style={styles.inputRatingView}>
                    <Text style={styles.loginText}>Overall Rating:  <AirbnbRating
                        count={5}
                        defaultRating={0}
                        onFinishRating={rating => this.setState({overall_rating: rating})}
                        showRating={false}
                        size={20}
                    /></Text>
                </View>
                <View style={styles.inputRatingView}>
                    <Text style={styles.loginText}>Price Rating:  <AirbnbRating
                        count={5}
                        defaultRating={0}
                        onFinishRating={rating => this.setState({price_rating: rating})}
                        showRating={false}
                        size={20}
                    /></Text>
                </View>
                <View style={styles.inputRatingView}>
                    <Text style={styles.loginText}>Quality Rating:  <AirbnbRating
                        count={5}
                        defaultRating={0}
                        onFinishRating={rating => this.setState({quality_rating: rating})}
                        showRating={false}
                        size={20}
                    /></Text>
                </View>
                <View style={styles.inputRatingView}>
                    <Text style={styles.loginText}>Clenliness Rating:  <AirbnbRating
                        count={5}
                        defaultRating={0}
                        onFinishRating={rating => this.setState({clenliness_rating: rating})}
                        showRating={false}
                        size={20}
                    /></Text>
                </View>
                <View style={styles.inputReviewView}>
                    <TextInput placeholder="Review"
                        multiline
                        numberOfLines={5}
                        style={styles.inputReviewText}
                        onChangeText={text => this.setState({review_body:text})}/>
                </View>
                <TouchableOpacity style={styles.addReviewBtn}
                                  onPress={() => this.addAReview()}>
                    <Text style={styles.loginText}>Add Review!</Text>
                </TouchableOpacity>
            </ScrollView>
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
        fontSize:50,
        color:"#ece0d1",
        marginBottom:10
      },
    userInfo: {
          fontSize: 20,
          color: "#dbc1ac",
          marginBottom: 5
      },
    inputRatingView:{
        width:"80%",
        backgroundColor:"#38220f",
        borderRadius:20,
        height:40,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
    inputReviewView: {
        width:"80%",
        backgroundColor:"#dbc1ac",
        borderRadius:20,
        height:100,
        marginBottom:20,
        justifyContent: 'flex-start',
        padding:20
    },
    inputText:{
        height:50,
        color:"#38220f"
      },
    inputReviewText: {
        height:60,
        color:"#38220f"
    },
    addReviewBtn:{
        width:"80%",
        backgroundColor:"#38220f",
        borderRadius:20,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
      },
    loginText:{
        color:"white"
      }
  });

export default AddReview;