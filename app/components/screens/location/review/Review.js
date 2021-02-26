import  React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getDetails } from '../../../../api/ProfileOperations';
import { getPhotoForReview, deletePhotoForReview } from '../../../../api/PhotoOperations';
import { likeReview, unlikeReview, deleteReview } from '../../../../api/ReviewOperations';

const width = Dimensions.get('window').width;

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoding: true,
            review: props.data,
            reviews: [],
            canEditReview: false,
            showPhoto: false,
            photo: null
        }
    }
    
    componentDidMount() {
        this.checkIfUsersReview()
        this.getPhoto()
    }
    
    checkIfUsersReview = async () => {
        await getDetails().then(res => {this.setState({reviews: res.data.reviews})})
        this.state.reviews.map((item) => {
            if (JSON.stringify(this.state.review) === JSON.stringify(item.review)) {
                this.setState({
                    canEditReview: true
                })
            }
        })
    }
    
    getPhoto = async () => {
        getPhotoForReview(this.props.location_id, this.state.review.review_id).then(res => {
            if (res.status === 200) {
                this.setState({
                    showPhoto: true,
                    photo: res.url
                })
            console.log('Photo Available')
            }
            this.setState({
            isLoding: false
            })
        })
    }
    
    deletePhoto = () => {
        deletePhotoForReview(this.props.location_id, this.state.review.review_id)
    }
    
    updateReview = () => {
        const navigation = this.props.navigation;
        navigation.navigate("UpdateReview", {
            loc_id: this.props.location_id,
            review: this.state.review
        }, {
            navigation: this.props.navigation
        })
    }

    render() {

        const navigation = this.props.navigation;

        if(this.state.isLoding) {
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#ece0d1" />
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>{this.state.review.review_body}</Text>
                    { this.state.canEditReview && 
                    <View style={{ flexDirection: "row" , justifyContent: 'space-evenly'}}>
                        <TouchableOpacity style={styles.likeBtn}
                            onPress={() => this.updateReview()}
                        ><Text style={styles.text}>Edit</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.likeBtn, styles.deleteBtn]}
                            onPress={() => deleteReview( this.props.location_id, this.state.review.review_id)}
                        ><Text style={styles.text}>Delete</Text></TouchableOpacity>
                    </View>
                    }
                    <View style={styles.rating}>
                            <Text style={styles.ratingText}>Overall:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.overall_rating}/>  Price:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.price_rating}/></Text>
                            <Text style={styles.ratingText}>Quality:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.quality_rating}/>  Clenliness:  <Rating type='star' imageSize={20} readonly={true} fractions={2} startingValue={this.state.review.clenliness_rating}/></Text>
                    </View>
                    <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' }}>
                        <Text style={styles.likesText}>Likes: {this.state.review.likes}</Text>
                        <TouchableOpacity style={styles.likeButtonBorder}
                            onPress={() => likeReview(this.props.location_id, this.state.review.review_id)}
                        ><Icon name={'thumbs-up'} size={25} color='#38220f'/></TouchableOpacity>
                        <TouchableOpacity style={styles.likeButtonBorder}
                            onPress={() => unlikeReview(this.props.location_id, this.state.review.review_id)}
                        ><Icon name={'thumbs-down'} size={25} color='#38220f'/></TouchableOpacity>
                    </View>
    
                    { this.state.showPhoto && 
                    <View style={styles.imageContainer}>
                        <Image
                            resizeMode='contain'
                            style={styles.chosenImage}
                            source={{uri: this.state.photo}}/>
                    </View>
                    }
              
                    <View style={{ flexDirection: "row" , justifyContent: 'space-evenly', marginTop: 5 }}>
                        {  this.state.canEditReview &&
                        <TouchableOpacity style={styles.likeButtonBorder}
                            onPress={() => navigation.navigate("TakePhoto", {loc_id : this.props.location_id, review_id: this.state.review.review_id}, {navigation: this.props.navigation})}
                        ><Icon name={'photo'} size={25} color='#38220f'/></TouchableOpacity>
                        }
                        { this.state.showPhoto && 
                        <TouchableOpacity style={styles.deleteButtonBorder}
                        onPress={() => this.deletePhoto()}
                        ><Icon name={'trash'} size={25} color='white'/></TouchableOpacity>
                        }
                    </View> 
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 3,
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
        color: '#ece0d1',
        fontSize: 20
      },
    likeBtn: {
        width:"20%",
        backgroundColor:"#ece0d1",
        borderRadius:20,
        height:25,
        alignItems:"center",
        justifyContent:"center",
      },
    deleteBtn: {
        backgroundColor:"red",
      },
    imageContainer: {
        alignItems:"center",
        justifyContent:"center",
        },
    likeButtonBorder: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            width: 40,
            height: 40,
            backgroundColor: '#ece0d1'
        },
    deleteButtonBorder: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            width: 40,
            height: 40,
            backgroundColor: 'red'
        },
    chosenImage: {
        width: width / 2,
        height: width / 2,
        }
  });

export default Review;