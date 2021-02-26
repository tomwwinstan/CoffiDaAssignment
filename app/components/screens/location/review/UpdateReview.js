import  React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

import { updateReview } from '../../../../api/ReviewOperations';
import { validateReviewBody } from '../../../shared/Validation';

class UpdateReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            review_id: '',
            overall_rating: 0,
            price_rating: 0,
            quality_rating: 0,
            clenliness_rating: 0,
            review_body: ""
        }
    }

    componentDidMount() {
        this.buildDetails()
    }

    buildDetails() {
        const review = this.props.route.params.review
        this.setState({
            review_id: review.review_id,
            overall_rating: review.overall_rating,
            price_rating: review.price_rating,
            quality_rating: review.quality_rating,
            clenliness_rating: review.clenliness_rating,
            review_body: review.review_body
        })
    }

    buildReviewUpdate() {
        return {
            "overall_rating": this.state.overall_rating,
            "price_rating": this.state.price_rating,
            "quality_rating": this.state.quality_rating,
            "clenliness_rating": this.state.clenliness_rating,
            "review_body": this.state.review_body
        }
      }

    update = async () => {
        if(validateReviewBody(this.state.review_body)) {
            Alert.alert('Contains profanity')
        } else {
            const location_id = this.props.route.params.loc_id
            await updateReview(location_id, this.state.review_id, this.buildReviewUpdate())
            const navigation = this.props.navigation;
            navigation.navigate("ViewLocation", {id: location_id})
        }
    }

    render() {
        return(
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#967259'}}> 
                <Text style={styles.title}>Update review</Text>
                <View style={styles.inputRatingView}>
                    <Text style={styles.loginText}>Overall Rating:  <AirbnbRating
                        count={5}
                        defaultRating={this.state.overall_rating}
                        onFinishRating={rating => this.setState({overall_rating: rating})}
                        showRating={false}
                        size={20}
                    /></Text>
                </View>
                <View style={styles.inputRatingView}>
                    <Text style={styles.loginText}>Price Rating:  <AirbnbRating
                        count={5}
                        defaultRating={this.state.price_rating}
                        onFinishRating={rating => this.setState({price_rating: rating})}
                        showRating={false}
                        size={20}
                    /></Text>
                </View>
                <View style={styles.inputRatingView}>
                    <Text style={styles.loginText}>Quality Rating:  <AirbnbRating
                        count={5}
                        defaultRating={this.state.quality_rating}
                        onFinishRating={rating => this.setState({quality_rating: rating})}
                        showRating={false}
                        size={20}
                    /></Text>
                    
                </View>
                <View style={styles.inputRatingView}>
                    <Text style={styles.loginText}>Clenliness Rating:  <AirbnbRating
                        count={5}
                        defaultRating={this.state.clenliness_rating}
                        onFinishRating={rating => this.setState({clenliness_rating: rating})}
                        showRating={false}
                        size={20}
                    /></Text>
                </View>
                <View style={styles.inputReviewView}>
                    <TextInput placeholder="Review"
                        multiline
                        numberOfLines={5}
                        value={this.state.review_body}
                        style={styles.inputReviewText}
                        onChangeText={text => this.setState({review_body:text})}/>
                </View>
                <TouchableOpacity style={styles.addReviewBtn}
                        onPress={() => this.update()}>
                    <Text style={styles.loginText}>Update Review!</Text>
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
    inputReviewText: {
        height: 60,
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

export default UpdateReview;