import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const Note = ({item,onPress}) => {
    const {title,desc} = item
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.desc} numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};

export default Note;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'skyblue',
        fontWeight:'bold',
        marginLeft:20,
        marginRight:20,
        borderRadius:15,
        marginBottom:10
     
    },
    title:{
        margin: 5,
        fontSize:20,
        fontWeight:'bold',
        color:'yellow',
        paddingLeft:10,
        textTransform:'uppercase',
       textDecorationLine:'underline',
       textDecorationColor:'green'
    },
    desc:{
        margin: 5,
        fontSize:15,
        fontWeight:'bold'
    },
    btnStyle:{
        flexDirection:'row',
        padding:10,
        justifyContent:'space-evenly',
        fontWeight:'bold',
        fontSize:10,
    }
});
