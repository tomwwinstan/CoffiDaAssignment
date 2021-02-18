import  React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Location from './Location';

class AllLocations extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            authKey: '',
            isLoading: false,
            locations:[],
            id: ""
        }
    }

    getData = async() => {
        try {
            this.state.authKey = await AsyncStorage.getItem('@auth_key')
            this.getAllLocations()
        } catch(e) {
            console.log(e)
        }
    }

    getAllLocations = () => {
        this.setState({ isLoading:true });
        axios.get('http://10.0.2.2:3333/api/1.0.0/find', {headers: {
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

    componentDidMount() {
        this.getData()
    }

    render() {
        if (this.state.isLoading) {
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

export default AllLocations;