import {  ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteInputModal from '../Components/NoteInputModal';
import { useNotes } from '../Context/NoteProvider';


const NotesDetails = (props) => {
  const {note} = props.route.params
  const [showModal,setShowModal] = useState(false)
  const [isEdit,setIsEdit] = useState(false)
  const {setNotes} = useNotes()


  const deleteNote = async () => {
    const result  =  await  AsyncStorage.getItem('notes')
    console.log(result);
    let notes = []

    if(result !== null) {
      notes=JSON.parse(result)
    }
    const newNotes = notes.filter(n => n.id !== note.id)
    setNotes(newNotes)
    await  AsyncStorage.setItem('note',JSON.stringify(newNotes))
    props.navigation.goBack()
  }

  const handleOnUpdate= async (title,desc,time)=>{
    const result = await AsyncStorage.getItem('notes')
    let notes = [];
    if(result!==null){
      notes.parse(result)
    }
    const newNotes = notes.filter(n => {
      if(n.id === note.id){
        n.title=title
        n.desc=desc
        n.isUpdated=true
        n.time=time
      }
      return n
    })
    setNotes(newNotes)
    await AsyncStorage.setItem('notes',JSON.stringify(newNotes))
  }
  const handleOnClose=()=>setShowModal(false)

  const openEditModal =()=>{
    setIsEdit(true)
    setShowModal(true)
  }
  return (
    <>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      
      </View>
    </ScrollView>
    <View style={styles.btnConatiner}>
        <TouchableOpacity  style={styles.buttonEdit} onPress={openEditModal}>
                  <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.buttonDelete} onPress={deleteNote}>
                  <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        </View>
        <NoteInputModal isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleOnUpdate} visible={showModal}/>
    </>
  );
};

export default NotesDetails;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:15,
    marginTop:10  
  },
  title:{
    fontSize:30,
    fontWeight:'bold',
    color:'purple'
  },
  desc:{
    fontSize:20,
    opacity:0.6,
    color:'black'
  },
  buttonEdit: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 30
},
buttonDelete:{
  backgroundColor: "red",
  padding: 20,
  borderRadius: 30
},
buttonText: {
    color: "white",
    fontWeight:'bold',
    textTransform:'uppercase'
},
btnConatiner:
{
  position:'relative',
  flexDirection:'row',
  justifyContent:'space-around',
  marginTop:20,
  marginBottom:50,
  opacity:0.8
}
});
