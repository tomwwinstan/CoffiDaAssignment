import  React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';

import {likeLocation, unlikeLocation} from '../../../api/LocationOperations'

class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.data.location_id,
            name: props.data.location_name,
            town: props.data.location_town,
            avg_overall_rating: props.data.avg_overall_rating
        }
    }

    render() {
        
        const navigation = this.props.navigation;

        return(
            <View style={locationStyles.location_container}>
                <TouchableOpacity onPress={() => navigation.navigate('ViewLocation', {id: this.state.id}, {navigation: this.props.navigation})}>
                    <Text style={locationStyles.text_title}>{this.state.name}</Text>
                    <Text style={locationStyles.text_body}>{this.state.town}</Text>
                    <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' }}>
                        <TouchableOpacity style={locationStyles.likeBtn}
                            onPress={() => likeLocation(this.state.id)}
                        ><Text style={locationStyles.likeText}>Like</Text></TouchableOpacity>
                        <TouchableOpacity style={locationStyles.likeBtn}
                            onPress={() => unlikeLocation(this.state.id)}
                        ><Text style={locationStyles.likeText}>UnLike</Text></TouchableOpacity>
                    </View>
                    <View style={locationStyles.rating}>
                        <Text style={locationStyles.ratingText}>Average Rating:  <Rating type='star' imageSize={25} readonly={true} fractions={2} startingValue={this.state.avg_overall_rating}/></Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


const locationStyles = StyleSheet.create({
    location_container: {
        flex: 1,
        backgroundColor: '#dbc1ac',
        borderRadius:20,
        paddingLeft: 5,
        padding: 5
    },
    text_title: {
        fontWeight:"bold",
        fontSize: 25,
        color: '#38220f'
    },
    text_body: {
        fontSize: 18,
        color: "#38220f"
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
    viewLocationBtn: {
        width:"35%",
        backgroundColor:"#38220f",
        borderRadius:20,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:5
    },
    likeText:{
        color:"white"
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
    }
})

export default Location;