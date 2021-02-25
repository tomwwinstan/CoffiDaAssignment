import  React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';
import { handleError } from '../../../shared/ErrorHandling';
import { validateReviewBody } from '../../../shared/Validation';

class AddReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authKey: '',
            overall_rating: 0,
            price_rating: 0,
            quality_rating: 0,
            clenliness_rating: 0,
            review_body: ""
        }
    }

    getData = async() => {
        try {
            this.state.authKey = await AsyncStorage.getItem('@auth_key')
        } catch(e) {
            console.log(e)
        }
    }

    componentDidMount() {
        this.getData()
    }

    addAReview = () => {
        const {location_id} = this.props.route.params
        if(validateReviewBody(this.state.review_body)) {
            Alert.alert('Contains profanity')
            } else {
                axios.post('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review', {
                overall_rating: parseInt(this.state.overall_rating),
                price_rating: parseInt(this.state.price_rating),
                quality_rating: parseInt(this.state.quality_rating),
                clenliness_rating: parseInt(this.state.clenliness_rating),
                review_body: this.state.review_body
                }, 
                { headers: { "X-Authorization": this.state.authKey }
                })
                .then((response) => {
                    console.log('Review created ' + response)
                })
                .catch((error) => {
                    handleError(error)
                })
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
                                  onPress={this.addAReview}>
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