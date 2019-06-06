import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { View, Text, ScrollView, Button, TouchableOpacity} from 'react-native'
import styles from './assets/Style'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
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
  const {data, error, loading } = useQuery(allSessions)
  let [keysList, setKeysList] = useState([]);

  useEffect(() => {
    getAllkeys();
  }, [])

  async function getAllkeys(){
    let storedKeys = await AsyncStorage.getAllKeys();
    setKeysList(storedKeys)    
  }

  async function handlePress(id){
    console.log('press id ', id)
    console.log(keysList);
    if(keysList.includes(id)){
      AsyncStorage.removeItem(`${id}`);
      getAllkeys();
    }else{
      AsyncStorage.setItem(`${id}`, 'true');
      getAllkeys();
    }
  }
  if(error) return <Text>Error </Text>
  if(loading) return <Text>loading</Text>
  return(
    <ScrollView>
      <TouchableOpacity
        style={{height: 20}}        
      />
      {data.allSessions.map(session => (
          <View key={session.id}>
            {/* {console.log(" The session id is: ",session.id)} */}
            <Text style={styles.sessionTime}> {moment(session.startTime).format("LT")}</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Session', {id: session.id})}>
              <Text style={styles.sessionTitle}>{session.title}</Text>
            </TouchableOpacity>
            <View style={styles.sessionHeartContainer}> 
            <Text style={styles.sessionLocation}>{session.location}</Text>
              <View>
                <TouchableOpacity onPress={() => handlePress(session.id)}>   
                  <Ionicons name={(keysList.includes(session.id)) ? "ios-heart" : "ios-heart-empty"} 
                    size={25} 
                    color={(keysList.includes(session.id)) ? "#C10909" : "#A9A9A9" }
                    style={styles.sessionHeart}  />
                </TouchableOpacity>
              </View>
          </View>
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
