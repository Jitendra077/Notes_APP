import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

const searchBar = () => {
  return (
    <View>
      <TextInput style={styles.searchBar} placeholder='Search here'/>
    </View>
  );
};

export default searchBar;

const styles = StyleSheet.create({
    searchBar:{
        borderWidth:2,
        color:'black',
        height:40,
        borderRadius:40,
        paddingLeft:15,
        fontSize:20,
        marginTop:20,
        margin:10,
        marginBottom:20,
        borderColor:'green',
        
    }
});
