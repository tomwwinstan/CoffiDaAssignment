import  React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Location from '../location/Location';

class SearchAllLocations extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            authKey: '',
            isLoading: false,
            locations:[],
            id: "",
            searchName: "",
            searchRating: 0
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = async() => {
        try {
            this.state.authKey = await AsyncStorage.getItem('@auth_key')
        } catch(e) {
            console.log(e)
        }
    }
    
    buildSearch() {
        let url = 'http://10.0.2.2:3333/api/1.0.0/find?q='
        url += this.state.searchName
        url += '&overall_rating=' + this.state.searchRating
        return url
    }

    searchAllLocations = () => {
        console.log(this.state.searchRating)
        let url = this.buildSearch()
        console.log(url)

        axios.get(url, {headers: {
            'X-Authorization': this.state.authKey}
        })
        .then((response) => {
            console.log('Got location data')
            this.setState({
                isLoading: false,
                locations: response.data
                })
            })
        .catch((error) => {
            console.log('ah' + error)
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Search Coffi Locations</Text>
                <TextInput placeholder='Location Name' onChangeText={text => this.setState({searchName:text})}></TextInput>
                <Text>Average Rating:  <AirbnbRating
                    count={5}
                    defaultRating={0}
                    onFinishRating={rating => this.setState({searchRating: rating})}
                    showRating={false}
                    size={20}
                /></Text>
                <TouchableOpacity style={styles.likeBtn}
                        onPress={() => this.searchAllLocations()}
                    ><Text style={styles.likeText}>Search</Text>
                </TouchableOpacity>
                <FlatList
                data={this.state.locations}
                renderItem={({item}) => (
                        <Location data={item} navigation={this.props.navigation}/>
                )}
                ItemSeparatorComponent={() => <Divider style={styles.divider} />}
                keyExtractor={(item,index) => item.location_id.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#967259',
      justifyContent: 'center'
    },
    divider: {
        padding: 10,
        backgroundColor: '#967259'
    },
    title:{
        fontWeight:"bold",
        fontSize:30,
        color:"#ece0d1",
        marginBottom:20,
        marginTop: 20
      },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
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
});

export default SearchAllLocations;