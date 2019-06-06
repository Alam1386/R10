import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { View, Text, ScrollView, Button, TouchableOpacity} from 'react-native'
import styles from './assets/Style'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Heart from './Heart'
const allSessions = gql`
	{
		allSessions{
        id
        startTime
        title
        location
    }
	}
`
const AllSessionData = (props) => {
  // console.log('all sessions props: ', props)
  const {data, error, loading } = useQuery(allSessions)
  
  const [id, setId] = useState('');

  if(error) return <Text>Error </Text>
  if(loading) return <Text>loading</Text>
  // console.log(" The data is: ", data)
  // console.log(" The Id is: ", data.allSessions[0].id)


  getSessionId =  async () =>{
    try {
      const sessionID = await AsyncStorage.setItem('storage_Key')
      if(sessionID !== undefined){
        setId('sessionID')
      }

    } catch (error) {
      console.log("There is an error in your code: ", error)
    }
  };
 
  const getAllHearts = () => {
    console.log(data.allSessions)
    data.allSessions.forEach(session => {
      _retreiveData(session.id)
      // console.log(session.id)
    })
  }

  _retreiveData = async(sessionId) => {
    try{
      const value = await AsyncStorage.getItem(`${sessionId}`)
      console.log(`stored value of ${sessionId}: `, JSON.parse(value))
    } catch(error) {
      throw error
    }
  }

  return(
    <ScrollView>
      <TouchableOpacity
        style={{height: 20}}
        onPress={getAllHearts}
      />
      {data.allSessions.map(session => (
          <View key={session.id}>
            {/* {console.log(" The session id is: ",session.id)} */}
            <Text style={styles.sessionTime}> {moment(session.startTime).format("LT")}</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Session', {id: session.id})}>
              <Text style={styles.sessionTitle}>{session.title}</Text>
            </TouchableOpacity>
           
            <Heart 
              location = {session.location}
              id = {session.id}
            />
            
        </View>
      ))}
    </ScrollView>
  )
}
function Session(props){
	return (
		<View>
      < AllSessionData {...props} />
    </View>
	)
}

export default Session




import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { View, Text, ScrollView, Button, TouchableOpacity} from 'react-native'
import styles from './assets/Style'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

const getAllSessions = gql`
	{
		allSessions{
        id
        startTime
        title
        location
    }
	}
`
const FavesData = (props) => {
  const[fave, setFave] = useState('')
  // console.log('all sessions props: ', props)
  
  // console.log('what is props?', props.id)
  getFaveData =  async (id) =>{
    console.log('<><><><><><<><><><><><<><><><><><<><><><><><')
    try {
      const value = await AsyncStorage.getItem(`${id}`)
      console.log("hap ", value)
      if(value){
        console.log('count')
        console.log(" The values is: ", value)
        let parsedValue = JSON.parse(value)        
        console.log(typeof parsedValue)
        console.log("what is parsed value ", parsedValue)
        setFave(parsedValue)        
      }else{
        storeFaveData(id)
      }
    } catch (error) {
      console.log("There is an error in your code: ", error)
    }
  }

  useEffect(() => {
    getFaveData(props.id)
  }, [])

  
  const {data, error, loading } = useQuery(getAllSessions)
  
  if(error) return <Text>Error </Text>
  if(loading) return <Text>loading</Text>
  // console.log(" The data is: ", data)
  // console.log(" The Id is: ", data.allSessions[0].id)


  const handlePress = (sessionId) => {  
    getFaveData(sessionId)
    console.log("what is my fave: ", fave)
    if(fave) {
      setFave(false)
      console.log(" The fave is: ", fave)
    } else {
      setFave(true)
      console.log(" The fave in else statement is: ", fave)
    }
    storeFaveData(sessionId)
   }

  storeFaveData = async (sessionId) => {
    try {
      console.log('sessionId', sessionId)
      await AsyncStorage.setItem(`${sessionId}`, 'true')
    } catch (error) {
      throw error
    }
  }

  return(
    <ScrollView>
      <View key={props.id}>
        <View style={styles.sessionHeartContainer}> 
          <Text style={styles.sessionLocation}>{props.location}</Text>
          <Text>
            
            {console.log('fave: ', fave)}
            <Ionicons name={fave ? "ios-heart" : "ios-heart-empty"} size={25} color={fave ? "#C10909" : "#A9A9A9" }  style={styles.sessionHeart} onPress={() => handlePress(props.id)} />
            
            {fave ? <Text>Fave true</Text> : <Text>not true</Text>}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

function Heart(props){
	return (
		<View>
      < FavesData {...props} />
    </View>
	)
}

export default Heart
