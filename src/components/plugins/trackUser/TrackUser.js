import React, {useState, useEffect, Platform, Alert} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Container, Header, Content, Footer, Text} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import styles from './trackUserStyle';
const TrackUser = () => {
  const [userLocation, setuserLocation] = useState();
  useEffect(() => {
    // getCurrentPosition();
    Geolocation.getCurrentPosition((info) => console.log(info));
  });

  // const getCurrentPosition = () => {
  //   try {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const region = {
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         };
  //         setuserLocation(region);
  //       },
  //       (error) => {
  //         //TODO: better design
  //         switch (error.code) {
  //           case 1:
  //             if (Platform.OS === 'ios') {
  //               Alert.alert('', 'asdas');
  //             } else {
  //               Alert.alert('', 'Psdfds');
  //             }
  //             break;
  //           default:
  //             Alert.alert('', 'dsfsd');
  //         }
  //       },
  //     );
  //   } catch (e) {
  //     alert(e.message || '');
  //   }
  // };
  return (
    <Container style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled
        zoomControlEnabled={true}
        loadingIndicatorColor={'#606060'}
        userLocationUpdateInterval={5000}
        userLocationAnnotationTitle
        followsUserLocation={true}
      />
    </Container>
  );
};

export default TrackUser;
