import {
        View, Text ,StyleSheet, TextInput, StatusBar, ScrollView,
         Dimensions,ImageBackground,Button,Alert
        } from 'react-native';
import React, { useState } from 'react';
import BackgroundImage from '../../assets/Images/welcome1.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Intro = ({onFinish}) => {
  const [name,setName] = useState('');

  const handleChangeText = data => setName(data)
   
  const handleSubmitData = async () => {
       const user = {name:name}
     await  AsyncStorage.setItem('user',JSON.stringify(user))
     if(onFinish){
       onFinish()
     }
  }
  return (
      <> 
          <StatusBar hidden /> 
          <ImageBackground source={BackgroundImage} resizeMode='cover'>
          <ScrollView>
          <View style={styles.container} >
          <Text style={styles.text}> Enter your name to continue ! </Text>
          <TextInput
            value={name}
            style={styles.textInput}
            placeholder='Enter Name'
            onChangeText={()=>handleChangeText()} />    
          </View>
          <Button
            title="Press me"
            onPress={handleSubmitData}
           />
          </ScrollView>
          </ImageBackground>
    
      </>
  );
};
const {width} = Dimensions.get('window')

const styles = StyleSheet.create( { 
    container:{
      fontSize:20,
       flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginTop:500,      
    },
    textInput:{
        color:'red',
        borderWidth:2,
        width:width-50,
        // fontWeight:'bold',
        borderRightColor:'orange',
        borderBottomColor:'yellow',
        borderLeftColor:'orange',
        borderTopColor:'yellow',
        borderRadius:20,  
        marginBottom:150   ,
        fontSize:24 ,
        textAlign:'center'
    },
    text:{
      marginBottom:20,
      // fontWeight:'bold',
      fontSize:28,
      color:'white',
         
    }
  
});

export default Intro;
