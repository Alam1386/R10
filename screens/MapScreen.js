
import React from 'react';
import { StyleSheet,Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import MapView from 'react-native-maps'

function MapScreen(){
return (      
  <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
              latitude: 43.643819,
              longitude: -79.39779,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }}
        >
        <MapView.Marker
            coordinate={{latitude: 43.643819,
            longitude: -79.39779}}
            title={"R10"}
         >
         <Image source={require('../images/map_pin.png')} />
         </MapView.Marker>
      </MapView>
 </View>
  );  
}

export default MapScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
});