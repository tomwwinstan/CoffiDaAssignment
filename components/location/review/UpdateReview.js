import  React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateReview } from './EditDeleteReview';

class UpdateReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authKey: '',
            review_id: '',
            overall_rating: 0,
            price_rating: 0,
            quality_rating: 0,
            clenliness_rating: 0,
            review_body: ""
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = async() => {
        try {
            this.state.authKey = await AsyncStorage.getItem('@auth_key')
            this.buildDetails()
        } catch(e) {
            console.log(e)
        }
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

    update = () => {
        updateReview(this.state.authKey, this.props.route.params.loc_id, this.state.review_id, this.state.overall_rating, this.state.price_rating, this.state.quality_rating, this.state.clenliness_rating, this.state.review_body)
        const navigation = this.props.navigation;
        navigation.navigate("ViewLocation", {id: this.props.location_id}, {navigation: this.props.navigation})
    }

    render() {
        return(
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#967259'}}> 
                <Text style={styles.title}>Update review</Text>
                <Text style={styles.userInfo}>Ratings must be between 1 and 5</Text>
                <View style={styles.inputRatingView}>
                    <TextInput placeholder="Overall Rating"
                        style={styles.inputText}
                        keyboardType="number-pad"
                        value={this.state.overall_rating.toString()}
                        onChangeText={text => this.setState({overall_rating:text})}/>
                </View>
                <View style={styles.inputRatingView}>
                    <TextInput placeholder="Price Rating"
                        style={styles.inputText}
                        keyboardType="number-pad"
                        value={this.state.price_rating.toString()}
                        onChangeText={text => this.setState({price_rating:text})}/>
                </View>
                <View style={styles.inputRatingView}>
                    <TextInput placeholder="Quality Rating"
                        style={styles.inputText}
                        keyboardType="number-pad"
                        value={this.state.quality_rating.toString()}
                        onChangeText={text => this.setState({quality_rating:text})}/>
                </View>
                <View style={styles.inputRatingView}>
                    <TextInput placeholder="Clenliness Rating"
                        style={styles.inputText}
                        keyboardType="number-pad"
                        value={this.state.clenliness_rating.toString()}
                        onChangeText={text => this.setState({clenliness_rating:text})}/>
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
        backgroundColor:"#dbc1ac",
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