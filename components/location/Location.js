import  React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {likeLocation} from './FavouriteLocation.js';
import {unlikeLocation} from './FavouriteLocation.js';

class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.data.location_id,
            name: props.data.location_name,
            town: props.data.location_town,
            avg_overall_rating: props.data.avg_overall_rating,
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

    componentDidMount() {
        this.getData()
    }

    render() {

        const navigation = this.props.navigation;

        return(
            <View style={locationStyles.location_container}>
                <Text style={locationStyles.text_title}>{this.state.name}</Text>
                <Text style={locationStyles.text_body}>{this.state.town}</Text>
                <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={locationStyles.likeBtn}
                        onPress={() => likeLocation(this.state.authKey, this.state.id)}
                    ><Text style={locationStyles.likeText}>Like</Text></TouchableOpacity>
                    <TouchableOpacity style={locationStyles.likeBtn}
                        onPress={() => unlikeLocation(this.state.authKey, this.state.id)}
                    ><Text style={locationStyles.likeText}>UnLike</Text></TouchableOpacity>
                </View>
                <View>
                    <Text>Average Rating  <Rating imageSize={20} readonly fractions={1} startingValue={this.state.avg_overall_rating}/></Text>
                </View>
                <TouchableOpacity style={locationStyles.likeBtn}
                        onPress={() => navigation.navigate('ViewLocation')}
                    ><Text style={locationStyles.likeText}>View Location</Text></TouchableOpacity>
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
      }
})

export default Location;