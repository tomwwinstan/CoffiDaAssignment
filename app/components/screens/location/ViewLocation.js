import  React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { Rating } from 'react-native-ratings';

import Review from './review/Review'
import { findLocationById } from '../../../api/LocationOperations';

class ViewLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: [],
            isLoading: true,
            location_id: ''
        }
    }

    componentDidMount() {
        this._onFocusListener = this.props.navigation.addListener('focus', () => {
            this.setState({isLoading: true})
            this.getLocation();
          });
    }

    getLocation = async () => {
        const {id} = this.props.route.params
        await findLocationById(id).then(res => {this.setState({location: res.data, 
            isLoading: false, 
            location_id: res.data.location_id})})
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
                        <Review data={item} navigation={navigation} location_id={this.state.location_id}/>
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