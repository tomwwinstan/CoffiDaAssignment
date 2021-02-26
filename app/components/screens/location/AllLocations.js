import  React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import Location from './Location';
import { findLocationsForGivenURL } from '../../../api/LocationOperations';

class AllLocations extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: true,
            locations:[]
        }
    }

    componentDidMount() {
        this._onFocusListener = this.props.navigation.addListener('focus', () => {
            this.getAllLocations();
          });
        this._onFocusListener = this.props.navigation.addListener('tabPress', () => {
            this.getAllLocations();
        })
    }

    getAllLocations = async () => {
        await findLocationsForGivenURL('http://10.0.2.2:3333/api/1.0.0/find').then(res => {this.setState({locations: res.data, isLoading: false})})
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
        marginBottom:20
      },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }
});

export default AllLocations;