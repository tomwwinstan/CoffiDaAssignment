import  React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import { Rating } from 'react-native-elements';
import Review from './Review';

function Location(props) {
    return(
        <View style={locationStyles.location_container}>
            <Text style={locationStyles.text_title}>{props.data.location_name}</Text>
            <Text style={locationStyles.text_body}>{props.data.location_town}</Text>
            <View>
                <Text>Average Rating  <Rating imageSize={20} readonly fractions={1} startingValue={props.data.avg_overall_rating} style={locationStyles.rating}/></Text>
                <Text>Average Price Rating  <Rating imageSize={20} readonly fractions={1} startingValue={props.data.avg_price_rating} style={locationStyles.rating}/></Text>
                <Text>Average Quality Rating  <Rating imageSize={20} readonly fractions={1} startingValue={props.data.avg_quality_rating} style={locationStyles.rating}/></Text>
                <Text>Average Cleanliness Rating  <Rating imageSize={20} readonly fractions={1} startingValue={props.data.avg_clenliness_rating} style={locationStyles.rating}/></Text>
            </View>
            <FlatList
                data={props.data.location_reviews}
                renderItem={({item}) => (
                    <Review data={item}/>
                )}
                ItemSeparatorComponent={() => <Divider style={locationStyles.divider} />}
                keyExtractor={(item,index) => item.review_id.toString()}
            />
        </View>
    )
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
    divider: {
        padding: 10,
        backgroundColor: '#967259'
    },
    rating: {
        
    }
})

export default Location;