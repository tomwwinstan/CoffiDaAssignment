import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/FontAwesome';

import {addPhotoForReview, getPhotoForReview} from '../../../../../api/PhotoOperations'

const width = Dimensions.get('window').width;

class TakePhoto extends Component{
    constructor(props) {
        super(props)
        this.state = {
        uploadSource: null,
        data: null
        }
    }

    componentDidMount() {
        this.getPermissionAsync();
        this.getPhoto()
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    getPhoto = async () => {
        const {loc_id} = this.props.route.params
        const {review_id} = this.props.route.params
        getPhotoForReview(loc_id, review_id).then(res => {
            if (res.status === 200) {
                this.setState({
                    uploadSource: res.url
                })
            }
        })
    }

    selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            quality: 0.5,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            this.setState({ uploadSource: result.uri, data: result });
        }
    };

    takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: true,
            quality: 0.5,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            this.setState({ uploadSource: result.uri, data: result });
        }
    };

    uploadImage = async () => {
        const {loc_id} = this.props.route.params
        const {review_id} = this.props.route.params
        await addPhotoForReview(loc_id, review_id, this.state.data)
        const navigation = this.props.navigation;
        navigation.navigate('ViewLocation', {id: loc_id})
    }

    render() {
        return (
        <View style={styles.imageContainer}>
            <View style={styles.imageContainer}>
            <Image
            resizeMode='contain'
            style={styles.chosenImage}
            source={{uri: this.state.uploadSource}}/>
        </View>
            <View style={{ flexDirection: 'row', paddingBottom: 30 }}>
                <TouchableOpacity onPress={this.takePhoto} style={styles.buttonContainer}>
                    <View style={styles.buttonBorder}>
                        <Icon
                        name={'camera'}
                        size={35}
                        color='white'/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.selectImage} style={styles.buttonContainer}>
                    <View style={styles.buttonBorder}>
                        <Icon
                        name={'image'}
                        size={35}
                        color='white'/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.uploadImage} style={styles.buttonContainer}>
                    <View style={styles.buttonBorder}>
                        <Icon
                        name={'upload'}
                        size={35}
                        color='white'/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        },
    imageContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
        },
        chosenImage: {
            width: width / 1.25,
            height: width / 1.25,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute'
            },
    buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    },
    buttonBorder: {
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    width: 70,
    height: 70,
    backgroundColor: 'grey'
    },
})


export default TakePhoto;