import  React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, TextInput, Alert } from 'react-native';
import { Divider } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';

import Location from '../location/Location';
import { findLocationsForGivenURL } from '../../../api/LocationOperations';

class SearchAllLocations extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: false,
            locations:[],
            searchName: "",
            overallRating: 0,
            priceRating: 0,
            qualityRating: 0,
            clenlinessRating: 0
        }
    }
    
    buildSearch() {
        let url = 'http://10.0.2.2:3333/api/1.0.0/find?q='
        url += this.state.searchName
        url += '&overall_rating=' + this.state.overallRating
        url += '&price_rating=' + this.state.priceRating
        url += '&quality_rating=' + this.state.qualityRating
        url += '&clenliness_rating=' + this.state.clenlinessRating
        return url
    }

    resetSearch() {
        this.setState({
            searchName : '',
            overallRating: 0,
            priceRating: 0,
            qualityRating: 0,
            clenlinessRating: 0
        })
    }

    searchAllLocations = async () => {
        let url = this.buildSearch()
        await findLocationsForGivenURL(url, this.props.navigation).then(res => {
            if(res == undefined) {
                Alert.alert('No results')
            } else {
                this.setState({locations: res.data, isLoading: false})
            }
        })
        this.resetSearch()
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#38220f" />
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>Search Coffi Locations</Text>
                    <TextInput placeholder='Location Name' onChangeText={text => this.setState({searchName:text})}></TextInput>
                    <Text>Overall Rating:<AirbnbRating
                        count={5}
                        defaultRating={this.state.overallRating}
                        onFinishRating={rating => this.setState({overallRating: rating})}
                        showRating={false}
                        size={12}
                    />
                    <Text>Price Rating:<AirbnbRating
                        count={5}
                        defaultRating={this.state.priceRating}
                        onFinishRating={rating => this.setState({priceRating: rating})}
                        showRating={false}
                        size={12}
                    /></Text>
                    </Text>
                    <Text>Quality Rating:<AirbnbRating
                        count={5}
                        defaultRating={this.state.qualityRating}
                        onFinishRating={rating => this.setState({qualityRating: rating})}
                        showRating={false}
                        size={12}
                    />
                    <Text>Clenliness Rating:<AirbnbRating
                        count={5}
                        defaultRating={0}
                        onFinishRating={rating => this.setState({clenlinessRating: rating})}
                        showRating={false}
                        size={12}
                    /></Text>
                    </Text>
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