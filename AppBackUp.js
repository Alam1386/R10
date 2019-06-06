/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
// import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = <Icon name="rocket" size={30} color="#900" />;
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


let GET_SCHEDULE = gql`
{
  allSessions{
    id
    location
    startTime
    title
}
}
`
const HooksComponent = () => {
  const {data, error, loading } = useQuery(GET_SCHEDULE)
  console.log("error: ", error)
  console.log("loading: ", loading)
  console.log("data: ", data)
  if(error) return <Text>Error </Text>
  if(loading) return <Text>loading</Text>
  return(
    <View>
      <Text>Schefdule worked </Text>
    </View>
  )
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      {/* <AwesomeIcon name={"rocket"} size={30} color={"#900"} />; */}
      {/* <Icon name="rocket" size={30} color="#900" />; */}
      <HooksComponent />
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
