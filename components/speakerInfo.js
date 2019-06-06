import React, { useState, Component } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Modal, Alert, Linking, TouchableHighlight,Image,View, Text, ScrollView, Button, TouchableOpacity} from 'react-native'
import styles from './assets/Style'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';

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
 const SpeakerData = (props) => {
    let id = props.id
    console.log('props: ', props.id)
    const {data, error, loading } = useQuery(Session, {
      variables: {id}
    })
    
    if(error) return <Text>{error.message} </Text>
    if(loading) return <Text>loading</Text>
   
    return(
      <ScrollView>
        <View style={styles.speakerContent}>
          <Image source = {{uri: data.Session.speaker.image}} style={styles.speakerImage}/>
          <Text style={styles.title}>{data.Session.speaker.name}</Text>
          <Text style={styles.sessionDetailDescription}>{data.Session.speaker.bio}</Text>
        </View>
          <View> 
            <TouchableOpacity onPress={ ()=>{ Linking.openURL(data.Session.speaker.url)}}>
              <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={[ '#9963E9','#b993f2', '#7160e0']} style={styles.linearGradient}>
                <Text style={styles.buttonText}>
                  Read more on Wikipedia
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>        
      </ScrollView>
    )
  }

  class speakerInfo extends Component{
    constructor(props){
      super(props)
    }

    render() {
      // console.log("The props is: ", props)
    // console.log(this.props.modalVisible)
    return (
      <View>
        {console.log(this.props)}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          >
          <View style={styles.speakerContainer}>
            <View>
              <View style={styles.speakerHeader}>
                <TouchableOpacity onPress={() => {
                  this.props.setModalVisible(false)
                    }} >
                <Ionicons name={`md-close`} size={30} color="#FFFFFF" style={styles.speakerHeaderCloseButton}/>
                </TouchableOpacity>
                <Text style={styles.speakerHeaderTitle}> About the Speaker</Text>
              </View>
            </View>
              <SpeakerData {...this.props}/>
          </View>
        </Modal>
      </View>
    )
  }
}

export default speakerInfo
