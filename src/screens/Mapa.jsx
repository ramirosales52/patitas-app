import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location' 

function Mapa() {

  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    getLocationPerm();
  }, [])
  
  async function getLocationPerm () {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('perm denied')
      return
    } 

    let location = await Location.getCurrentPositionAsync({})
    const currentLoc = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }

    setOrigin(currentLoc)
  }

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        followsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.9,
          longitudeDelta: 0.4,
        }}
        mapType="hybrid"
      >
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: '100%',
    height: '100%'
  },
});

export default Mapa;