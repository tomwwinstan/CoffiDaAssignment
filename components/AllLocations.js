import  React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { Divider, Rating } from 'react-native-elements';
import axios from 'axios';

class AllLocations extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: false,
            isLoadingMore: false,
            locations:[],
            latitude: "",
            id: ""
        }
    }

    getAllLocations = async () => {
        this.setState({ isLoading:true });
        axios.get('http://10.0.2.2:3333/api/1.0.0/find', {headers: {
            'X-Authorization': 'accb8973c5edaef3d86a37e2a3f85329'}
        })
    .then((response) => {
        console.log(response.data)
        this.setState({
            isLoading: false,
            locations: response.data
            })
        })
    .catch((error) => {
        console.log(error)
        })
    }

    componentDidMount() {
        this.getAllLocations();
    }

    render() {
        if(this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" />
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>Coffi Locations</Text>
                    <FlatList
                    data={this.state.locations}
                    renderItem={({item}) => (
                            <Location data={item}/>
                    )}
                    ItemSeparatorComponent={() => <Divider style={styles.divider} />}
                    keyExtractor={({id}, index) => id}
                    />
                </View>
            )
        }
        
    }
}

function Location(props) {
    return(
        <View style={locationStyles.location_container}>
            <Text style={locationStyles.text_title}>{props.data.location_name}</Text>
            <Text style={locationStyles.text_body}>{props.data.location_town}</Text>
            <View>
                <Text>Average Rating  <Rating imageSize={20} readonly fractions="{1}" startingValue={props.data.avg_overall_rating} style={locationStyles.rating}/></Text>
                <Text>Average Price Rating  <Rating imageSize={20} readonly fractions="{1}" startingValue={props.data.avg_price_rating} style={locationStyles.rating}/></Text>
                <Text>Average Quality Rating  <Rating imageSize={20} readonly fractions="{1}" startingValue={props.data.avg_quality_rating} style={locationStyles.rating}/></Text>
                <Text>Average Cleanliness Rating  <Rating imageSize={20} readonly fractions="{1}" startingValue={props.data.avg_clenliness_rating} style={locationStyles.rating}/></Text>
            </View>
        </View>
    )
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
        fontSize:50,
        color:"#ece0d1",
        marginBottom:40
      },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }
});

const locationStyles = StyleSheet.create({
    location_container: {
        flex: 1,
        backgroundColor: '#dbc1ac',
        paddingLeft: 5
    },
    text_title: {
        fontSize: 25,
        color: '#38220f'
    },
    text_body: {
        fontSize: 18,
    },
    rating: {
        
    }
})

export default AllLocations;