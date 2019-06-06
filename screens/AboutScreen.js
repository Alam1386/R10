import React from 'react';
import { Text, View, Image, ScrollView} from 'react-native';
import styles from '../components/assets/Style'
import Hr from "react-native-hr-component";
import CoC from '../components/CoC'
function AboutScreen (){
  
  return (
    <ScrollView>
      <View style={styles.container} >
      <Image
          style={{width: 250, height: 60, margin: 15,}}
          source={require('../images/r10_logo.png')}
        />
        </View>
      <View style={styles.hr}/>
      <Text style={styles.p}>R10 is a conference that focuses on just about any topic related to dev.</Text>
      <Text style={styles.title}>Date & Venue</Text> 
      <Text style={styles.p}> The R10 conference will take place onn Tuesday, June 27, 2019 in Toronto, ON.</Text>
      <Text style={styles.title}>Code of Conduct</Text> 
      <CoC /> 
      <View style={styles.hr}/>
      <Text style={styles.p}> {'\u00A9'} RED Academy, Toronto 2019</Text>
    </ScrollView>
  );
}


export default AboutScreen;