import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Image,View, Text, ScrollView, Button, TouchableOpacity} from 'react-native'
import styles from './assets/Style'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import SpeakerInfo from './speakerInfo'
const Session = gql`
    query Session ($id: ID!){
      Session(id: $id){
      title
      id
      location
      startTime
      description
      speaker{
        name
        bio
        id
        image
        url
      }
    }
  }
`
export default SessionDetails = props => {
  // console.log('props: ', props.navigation.state.params.id)
  let id = props.navigation.state.params.id
  let [keysList, setKeysList] = useState([]);

  const {data, error, loading } = useQuery(Session, {
    variables: {id}
  })
  const [modalVisible, setModalVisible] = useState(false)
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
  if(error) return <Text>{error.message} </Text>
  if(loading) return <Text>loading</Text>
  // console.log(" The data is: ", data)
 
  return(
    <ScrollView>
      <View style={styles.sessionDetailContainer}>
        <View style={styles.sessionHeartContainer}> 
          <Text style={styles.sessionLocation}>{data.Session.location}</Text>
          <View>
                <TouchableOpacity onPress={() => handlePress(data.Session.id)}>   
                  <Ionicons name={(keysList.includes(data.Session.id)) ? "ios-heart" : "ios-heart-empty"} 
                    size={25} 
                    color={(keysList.includes(data.Session.id)) ? "#C10909" : "#A9A9A9" }
                    style={styles.sessionHeart}  />
                </TouchableOpacity>
              </View>
        </View>
        <Text style={styles.sessionDetailTitle}>{data.Session.title}</Text>
        <Text style={styles.sessionDetailTime}> {moment(data.Session.startTime).format("LT")}</Text>
        <Text style={styles.sessionDetailDescription}>{data.Session.description}</Text>
        <Text style={styles.sessionLocation}>Presented by: </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true), {id: data.Session.id}
          }}>
          <View style={styles.sessionDetailImageNameContainer}> 
            <Image source = {{uri: data.Session.speaker.image}} style={styles.sessionDetailImage}/>
            <Text style={styles.sessionDetailName}>{data.Session.speaker.name}</Text>
          </View>
        </TouchableOpacity>
        <SpeakerInfo modalVisible={modalVisible} setModalVisible={setModalVisible} id={id}/>
        <View style={styles.hr}/>
        <TouchableOpacity>
          <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={[ '#9963E9','#b993f2', '#7160e0']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
              Remove from Faves
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
