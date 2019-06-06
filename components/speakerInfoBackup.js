import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Image,View, Text, ScrollView, Button, TouchableOpacity} from 'react-native'
import styles from './assets/Style'
import LinearGradient from 'react-native-linear-gradient'

const Session = gql`
	 query Session ($id: ID!){
    Session(id: $id){
    title
    id
    location
    speaker{
      name
      bio
      id
      image
      url
    }
    startTime
    description
  }
  }
`
const SpeakerData = () => {
  let id = "cjh2j37mo163p01221qpcklry"
  const {data, error, loading } = useQuery(Session, {
    variables: {id}
  })
  
  if(error) return <Text>{error.message} </Text>
  if(loading) return <Text>loading</Text>
  // console.log(" The data is: ", data)
  // console.log("The name is: ", data.Session.speaker.name)
  // console.log("data.session.speaker", data.Session.speaker)
  // console.log("Location: ", data.Session.location)
  // console.log(" The image is: ", data.Session.speaker.image)
  
  return(
    <ScrollView>
      <View style={styles.speakerContainer}>
        <Image source = {{uri: data.Session.speaker.image}} style={styles.speakerImage}/>
        <Text style={styles.title}>{data.Session.speaker.name}</Text>
        <Text style={styles.sessionDetailDescription}>{data.Session.speaker.bio}</Text>
      </View>
        <TouchableOpacity>
          <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={[ '#9963E9','#b993f2', '#7160e0']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
              Read more on Wikipedia
            </Text>
          </LinearGradient>
        </TouchableOpacity>
    </ScrollView>
  )
}
function speakerInfo(){
	return (
		<View>
      < SpeakerData />
    </View>
	)
}

export default speakerInfo