import  React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {getDistance} from 'geolib';

import { findLocationsForGivenURL } from '../../../api/LocationOperations';

class CoffiMap extends Component {

    state = {
        myLocation: {},
        isLoading: true,
        locations: [],
        locationMarkers: [],
        closestLocation: []
    }

    componentDidMount() {
        this._onFocusListener = this.props.navigation.addListener('focus', () => {
            this.getLocationPermission();
          });
    }

    getLocationPermission = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            locationResult: 'Permission to access location was denied',
          });
        }
     
        // As you can see the functionality is there to get the users location, however it was america and I couldn't change it
        // So I have hardcoded a location in the UK 
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ 
            myLocation: {
                longitude: -2.012416,
                latitude: 53.459013
            },
        });
        this.getAllLocations()
    }

    getAllLocations = async () => {
        await findLocationsForGivenURL('http://10.0.2.2:3333/api/1.0.0/find').then(
            res => {this.setState({
            locations: res.data })
        })
        this.buildMarkerPoints()
    }

    buildMarkerPoints() {
        this.state.locations.map((item) => {
            this.state.locationMarkers.push({
                location_name: item.location_name,
                location_town: item.location_town,
                distance: this.calculateDistance(item.latitude, item.longitude),
                location_co: { 
                    longitude: item.longitude,
                    latitude: item.latitude
                }
            })
        })
        this.state.closestLocation = [this.state.locationMarkers].map(e =>{ return e[0]}).sort(function(a, b) {
            return b.distance - a.distance;
          });
        this.setState({isLoading: false})
    }

    calculateDistance = (latitude, longitude) => {
        let locationCoOrd = {
            longitude: longitude, latitude: latitude
        }
        var distance = getDistance(
        this.state.myLocation,
        locationCoOrd
        )
        return distance / 1000 
    }

    render() {
        if(this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#38220f" />
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>CoffiMap</Text>
                    <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{flex:1}}
                    region={{
                        latitude:this.state.myLocation.latitude,
                        longitude: this.state.myLocation.longitude,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5
                    }}
              >
                <Marker
                  coordinate={this.state.myLocation}
                  title="My location"
                />
                
                {   
                    this.state.locationMarkers.map((marker, index) => {
                        if(marker === this.state.closestLocation[0]) {
                            return(
                                <Marker
                                key={index}
                                pinColor={"blue"}
                                style={{margin: 10}}
                                coordinate={marker.location_co}
                                title={'CLOSEST ' + marker.location_name}
                                description={marker.location_town + '  ' + marker.distance + ' KM'}
                            />
                            )
                        } else {
                            return(
                            <Marker
                            key={index}
                            style={{margin: 10}}
                            coordinate={marker.location_co}
                            title={marker.location_name}
                            description={marker.location_town + '  ' + marker.distance + ' KM'}
                            />
                        )
                        } 
                    })
                }
              </MapView>
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
    title:{
        fontWeight:"bold",
        fontSize:50,
        color:"#ece0d1",
        marginBottom:10
      },
  });

export default CoffiMap;