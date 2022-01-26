import { StyleSheet, Text, View,Modal, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

const NoteInputModal = ({visible,onClose,onSubmit,note,isEdit}) => {
    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')

   
    const handleOnchangeText = (text,valueFor) => {
        if(valueFor=='title'){
            setTitle(text)
        }
        if(valueFor=='desc'){
            setDesc(text)
        }
    }
   const handleSubmit = () => {
       if(!title.trim() && !desc.trim()) return onClose()

       if(isEdit){
            onSubmit(title,desc,Date.now())
       }else{
        onSubmit(title,desc)
        setTitle('')
        setDesc('')
       }
      
       onClose()
   }
   const onCanclePress = () => {
       if(!isEdit){
          setTitle('')
          setDesc('')
       }
       onClose()
   }
   useEffect(()=>{
        if(isEdit){
            setTitle(note.title)
            setDesc(note.desc)
        }
   },[isEdit])
  return (
    <Modal visible = {visible} animationType='fade'>
        {/* <Text>Input Modal </Text> */}
        <View style={styles.container}>   
             <TextInput placeholder='Title' 
                        value={title}
                        style={[styles.title,styles.input]}
                        onChangeText={(text)=>handleOnchangeText(text,'title')}
                      />
             <TextInput 
                value={desc}
                placeholder='Note'
                style={[styles.input,styles.description]}
                multiline
                onChangeText={(desc)=>handleOnchangeText(desc,'desc')}
             />
             <View style = {styles.btn}>
                 <Button
                  title="Create Note"
                  color='green'
                  onPress={() => handleSubmit()}
                 />
                 {
                 title || desc !=='' ?
                 <Button
                  title="CANCEL"
                  color='red'
                 onPress={onCanclePress}
                 /> :null}
             </View>
        </View>
        {/* <TouchableWithoutFeedback onPress={CloseModal}>
            <View style={[styles.modal,StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback> */}
        </Modal>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        paddingTop:45,
        flex:1
    },
    input:{
        borderBottomWidth:2,
        borderBottomColor:'skyblue',
        fontSize:20,
        color:'darkblue'
    },
    description:{
        height:100,
    },
    title:{
            height:40,
            marginBottom:15,
            fontWeight:'bold'
    },
    modal:{
        // flex:2,
        // backgroundColor:'green'
    },
    btn:{
        flexDirection:'row',padding:40,
        margin:10,
        justifyContent:'space-between',
        
       
    }
});
