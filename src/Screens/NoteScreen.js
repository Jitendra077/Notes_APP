import { 
         Button,
         StatusBar,
         StyleSheet,
         Text,
         View ,
         Alert, 
         Dimensions,
         TouchableWithoutFeedback,
         Keyboard,
         FlatList,
         ScrollView,
     } from 'react-native';
import React, { useEffect, useState} from 'react';
import SearchBar from '../Components/searchBar';
import NoteInputModal from '../Components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../Components/Note';
import { useNotes } from '../Context/NoteProvider';


const NoteScreen = ({user,navigation}) => {
    const [greet,setGreet] = useState('morning')
    const [modalVisible,setModalVisible] = useState(false)
    
   const{notes,setNotes} = useNotes()


    const findNotes = async () => {
     const result =   await  AsyncStorage.getItem('notes')
        console.log(result);
     if(result !== null){
         setNotes(JSON.parse(result))
     }
    }
    const handleOnSubmit = async (title,desc) => {
        const time = new Date().getTime()
       const note = {
           id:Date.now(),
           title,
           desc,
           time:time
        }
        const updatedNotes =  [...notes,note];
        setNotes(updatedNotes)
        await AsyncStorage.setItem('notes',JSON.stringify(updatedNotes))
     
    }
    const openNote=(note) =>{
        navigation.navigate('NoteDetail',{note})
    }
    useEffect(()=>{
        findNotes();
    //    AsyncStorage.clear()
    },[])
  return (
      <>
      <StatusBar barStyle='dark-content' backgroundColor='skyblue'/>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
      <View style={{marginBottom:35}}>
      <Text style={styles.header}>{`Good  ${greet} `} </Text>
         <SearchBar/>
         <Text style={styles.addNotes} onPress={()=>setModalVisible(true)}>ADD NOTES</Text>  
      </View >
          <ScrollView contentContainerStyle={styles.container}>  
              <FlatList 
              data={notes}
              keyExtractor={item =>item.id.toString()}
              renderItem={({item}) => <Note item={item} onPress={()=>openNote(item)} />}
              />
            <View style = {styles.addNotesHeader}>
              <Text style={styles.screenText}>ADD NOTES....</Text>
             </View>
             
        </ScrollView>
        <NoteInputModal
         visible={modalVisible} 
         onClose={()=>setModalVisible(false)}
         onSubmit={handleOnSubmit}
         />
      </>
  );
};

export default NoteScreen;

const {height} = Dimensions.get('screen').height
const styles = StyleSheet.create({
    container:{
        zIndex:1,
        justifyContent:'space-between'
    },
    header:{
        fontSize:24,
        color:'orange',
        fontWeight:'bold',
        paddingLeft:10,
        paddingTop:30
    },
    addNotesHeader:{
        // justifyContent:'center',
        alignItems:'flex-end',
        zIndex:-1,
        // flexDirection:'row'
    },
    addNotes:{
        fontSize:15,
        fontWeight:'bold',
        opacity:0.7,
        color:'white',
        borderColor:'black',
        borderRadius:10,
        backgroundColor:'green',
        marginRight:10,
        padding:10,
        right:50,
        marginTop:130,
        position:'absolute',
      
    },
    screenText:{
        fontSize:30,
        fontWeight:'bold',
        opacity:0.5,
        color:'skyblue',
        alignContent:'center',
        alignItems:'center',
        top:200,
        right:100
        
    },
    flatlist:{
       backgroundColor:'grey',
    //    justifyContent:'space-between'
    }
});
