import  React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { Rating } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Review from './Review';

class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.data.location_id,
            name: props.data.location_name,
            town: props.data.location_town,
            avg_overall_rating: props.data.avg_overall_rating,
            avg_price_rating: props.data.avg_price_rating,
            avg_quality_rating: props.data.avg_quality_rating,
            avg_clenliness_rating: props.data.avg_clenliness_rating,
            reviews: props.data.location_reviews,
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

    likeLocation = () => {
        axios.post('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.id + '/favourite', { }, { headers: {
            "X-Authorization": this.state.authKey } 
        })
        .then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })
    }

    unlike = () => {
        axios.delete('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.id + '/favourite', { headers: {
            'X-Authorization': this.state.authKey }
        })
        .then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return(
            <View style={locationStyles.location_container}>
                <Text style={locationStyles.text_title}>{this.state.name}</Text>
                <Text style={locationStyles.text_body}>{this.state.town}</Text>
                <View>
                    <TouchableOpacity style={locationStyles.likeBtn}
                        onPress={this.likeLocation}
                    ><Text style={locationStyles.likeText}>Like</Text></TouchableOpacity>
                    <TouchableOpacity style={locationStyles.likeBtn}
                        onPress={this.unlike}
                    ><Text style={locationStyles.likeText}>UnLike</Text></TouchableOpacity>
                </View>
                <View>
                    <Text>Average Rating  <Rating imageSize={20} readonly fractions={1} startingValue={this.state.avg_overall_rating} style={locationStyles.rating}/></Text>
                    <Text>Average Price Rating  <Rating imageSize={20} readonly fractions={1} startingValue={this.state.avg_price_rating} style={locationStyles.rating}/></Text>
                    <Text>Average Quality Rating  <Rating imageSize={20} readonly fractions={1} startingValue={this.state.avg_quality_rating} style={locationStyles.rating}/></Text>
                    <Text>Average Cleanliness Rating  <Rating imageSize={20} readonly fractions={1} startingValue={this.state.avg_clenliness_rating} style={locationStyles.rating}/></Text>
                </View>
                <FlatList
                    data={this.state.reviews}
                    renderItem={({item}) => (
                        <Review data={item}/>
                    )}
                    ItemSeparatorComponent={() => <Divider style={locationStyles.divider} />}
                    keyExtractor={(item,index) => item.review_id.toString()}
                />
            </View>
        )
    }
}


const locationStyles = StyleSheet.create({
    location_container: {
        flex: 1,
        backgroundColor: '#dbc1ac',
        paddingLeft: 5
    },
    text_title: {
        fontWeight:"bold",
        fontSize: 25,
        color: '#38220f'
    },
    text_body: {
        fontSize: 18,
    },
    divider: {
        padding: 10,
        backgroundColor: '#967259'
    },
    likeBtn:{
        width:"20%",
        backgroundColor:"#38220f",
        borderRadius:20,
        height:25,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:5
      },
      likeText:{
        color:"white"
      },
    rating: {
        
    }
})

export default Location;