import React, { useEffect, useState } from 'react';
// import Intro from '../NotesApp/src/Screens/Intro'
import  NoteScreen from '../NotesApp/src/Screens/NoteScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetail from '../NotesApp/src/Screens/NotesDetails'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteProvider from './src/Context/NoteProvider';

const Stack = createNativeStackNavigator();

const App = () => {
const [user,setUser] = useState({})

 const findUser =async  () => {
        const result = await  AsyncStorage.getItem('user')

        if(result != null){
          setUser(JSON.parse(result))
        }
  }
  useEffect(()=>{
        findUser()
        // AsyncStorage.clear()
  },[])

  const RenderNotesScreen = (props) => {return <NoteScreen {...props} user={user}/>}
  return(
  <NavigationContainer>
    <NoteProvider>
      <Stack.Navigator>
            <Stack.Screen name="NoteScreen" component={RenderNotesScreen} />
            <Stack.Screen name="NoteDetail" component={NoteDetail} />
      </Stack.Navigator>
   </NoteProvider>
  </NavigationContainer>
  )
}
export default App;
