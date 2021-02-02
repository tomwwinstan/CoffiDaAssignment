import  React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Search extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Search</Text>
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
    title:{
        fontWeight:"bold",
        fontSize:50,
        color:"#ece0d1",
        marginBottom:40
      },
  });

export default Search;