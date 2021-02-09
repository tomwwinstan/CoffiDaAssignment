import  React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';

function Review(props) {
    return(
        <View style={reviewStyles.review_container}>
            <Text style={reviewStyles.text_title}>"{props.data.review_body}"</Text>
            <Text style={reviewStyles.text_body}>Likes: {props.data.likes}</Text>
            <View>
                <Text>Overall Rating  <Rating imageSize={15} readonly fractions={1} startingValue={props.data.overall_rating} style={reviewStyles.rating}/></Text>
                <Text>Price Rating  <Rating imageSize={15} readonly fractions={1} startingValue={props.data.price_rating} style={reviewStyles.rating}/></Text>
                <Text>Quality Rating  <Rating imageSize={15} readonly fractions={1} startingValue={props.data.quality_rating} style={reviewStyles.rating}/></Text>
                <Text>Cleanliness Rating  <Rating imageSize={15} readonly fractions={1} startingValue={props.data.clenliness_rating} style={reviewStyles.rating}/></Text>
            </View>
        </View>
    )
}

const reviewStyles = StyleSheet.create({
    review_container: {
        flex: 1,
        backgroundColor: '#dbc1ac',
    },
    text_title: {
        fontWeight:"bold",
        fontSize: 15,
        color: '#38220f'
    },
    text_body: {
        fontSize: 18,
    },
    rating: {
        
    }
})

export default Review;