import React, {useState, useEffect, Platform, Alert} from 'react';
import {Container, Header, Content, Footer, Text} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import styles from './trackUserStyle';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import {mapLoadFail, mapLoadSuccess, userWatchLocation} from '../../../redux';

const TrackUser = () => {
  const usersLocation = useSelector((state) => state.locationTrack);
  console.log(usersLocation);

  const dispatch = useDispatch();

  const [userLocation, setuserLocation] = useState({
    latitude: null,
    longitude: null,
    errorMsg: '',
  });

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
      dispatch(
        mapLoadFail('Please give permission for accessing your location'),
      );
    } else {
      let location = await Location.getCurrentPositionAsync({});
      dispatch(
        mapLoadSuccess({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }),
      );

      Location.watchPositionAsync(
        {accuracy: Location.Accuracy.Highest, timeInterval: 2000},
        (coord) => {
          dispatch(userWatchLocation(coord));
        },
      );
    }
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
