import React, {useState, useEffect, Platform, Alert} from 'react';
import {Container, Header, Content, Footer, Text} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import styles from './trackUserStyle';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const TrackUser = () => {
  const [userLocation, setuserLocation] = useState();
  const [mapStyle, setMapStyle] = useState({marginBottom: 1});
  useEffect(() => {
    // getCurrentPosition();
    Geolocation.getCurrentPosition((info) => console.log(info));
  });
  const onMapReady = () => setMapStyle({marginBottom: 0});

  return (
    <Container style={{flex: 1}}>
      <MapView
        style={{flex: 1, marginBottom: mapStyle.marginBottom}}
        onMapReady={onMapReady}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled
        zoomControlEnabled={true}
        loadingIndicatorColor={'#606060'}
        userLocationUpdateInterval={5000}
        userLocationAnnotationTitle
      />
    </Container>
  );
};

export default TrackUser;
