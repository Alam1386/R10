import React from 'react';
import { Text, View } from 'react-native';
import Faves from '../components/Faves'
function FavesScreen(props){
  return (
    <View>
      <Faves {...props}/>
      <View style={styles.hr}/>
    </View>
  );
}


export default FavesScreen;