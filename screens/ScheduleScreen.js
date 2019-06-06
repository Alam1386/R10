import React from 'react';
import { Text, View } from 'react-native';
import Session from '../components/Session'
function ScheduleScreen(props){
  return (
    <View>
      <Session {...props} />
    </View>
  );
}


export default ScheduleScreen;