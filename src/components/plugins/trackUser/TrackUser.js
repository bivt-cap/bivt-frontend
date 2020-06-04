import React, {useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Container, Header, Content, Footer, Text} from 'native-base';
import styles from './trackUserStyle';
const TrackUser = () => {
  console.log('Hi');
  return (
    <Container style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </Container>
  );
};

export default TrackUser;
