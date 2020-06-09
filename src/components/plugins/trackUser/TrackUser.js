import React, {useState, useEffect, Platform, Alert} from 'react';
import {Container, Header, Content, Footer, Text} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import styles from './trackUserStyle';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import {Dimensions} from 'react-native';

const TrackUser = () => {
  const [userLocation, setuserLocation] = useState({
    latitude: null,
    longitude: null,
    errorMsg: '',
  });
  // const [region, setRegion] = useState({
  //   latitude: null,
  //   longitude: null,
  //   latitudeDelta: 0.005,
  //   longitudeDelta: 0.005,
  // });

  const [mapStyle, setMapStyle] = useState({marginBottom: 1});

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onMapReady = () => {
    // this.map.animateToRegion(region, 3000);
    setMapStyle({marginBottom: 0});
  };

  const getLocation = async () => {
    let {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setuserLocation({errorMsg: 'errrorr'});
    }
    let location = await Location.getLastKnownPositionAsync({});
    Location.watchPositionAsync({}, (coord) => {
      console.log('WAYCHH', coord);
    });
    setuserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    console.log(userLocation);
  };

  return (
    <Container style={{flex: 1}}>
      <Text>{userLocation.latitude}</Text>
      <Text>{userLocation.longitude}</Text>
      <MapView
        ref={(ref) => (this.map = ref)}
        style={{flex: 1, marginBottom: mapStyle.marginBottom}}
        onMapReady={onMapReady}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled
        zoomControlEnabled={true}
      />
    </Container>
  );
};

export default TrackUser;
