import React, {useState, useEffect, Alert} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {Container, View, Text} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import * as TaskManager from 'expo-task-manager';
import {Image} from 'react-native';
import styles from './trackUserStyle';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import JwtKeyChain from '../../../utils/jwtKeyChain';

import {
  trackLocationInBackGround,
  getInitialLocation,
  getMembersInformationsInCircle,
  mapLoadSuccess,
} from '../../../redux';

const TrackUser = () => {
  /*
   * Start of state declerations and fetch state from store
   */
  const bootstrapState = useSelector((state) => state.bootstrap);
  const usersLocation = useSelector((state) => state.locationTrack);
  console.log(usersLocation);
  // console.log(bootstrapState);
  const [mapStyle, setMapStyle] = useState({marginBottom: 1});
  const dispatch = useDispatch();
  /*
   * End of state declerations and fetch state from store
   */

  /*
   * Start of functions declerations
   */
  useEffect(() => {
    dispatch(getInitialLocation);
    dispatch(trackLocationInBackGround);
    fetchMembersInCircle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMapReady = () => {
    setMapStyle({marginBottom: 0});
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const fetchMembersInCircle = async () => {
    const token = await JwtKeyChain.read();
    const circleId = bootstrapState.circles[0].id;
    dispatch(getMembersInformationsInCircle(token, circleId));
  };

  /*
   * This Task Manager read `watchLocation` task from trackUserAction and update state when the application in background
   * Details: https://docs.expo.io/versions/latest/sdk/task-manager/
   */
  TaskManager.defineTask('watchLocation', ({data, error}) => {
    if (error) {
      return;
    }
    if (data) {
      const {locations} = data;
      console.log(locations);
      dispatch(
        mapLoadSuccess({
          latitude: locations[0].coords.latitude,
          longitude: locations[0].coords.longitude,
        }),
      );
    }
  });
  const renderContent = () => (
    <View style={styles.panel}>
      {usersLocation.circleLoading === false && (
        <Text style={styles.panelTitle}>
          {usersLocation.membersInCircle[0].userFirstName}
        </Text>
      )}
      <Text style={styles.panelSubtitle}>40 miles away</Text>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Arsh </Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Search Nearby</Text>
      </View>
      {/* <Image
        style={styles.photo}
        source={require('./assets/airport-photo.jpg')}
      /> */}
    </View>
  );
  /*
   * End of functions declerations
   */

  return (
    <Container style={{flex: 1}}>
      {usersLocation.mapLoading === false && (
        <Text>{usersLocation.userCoordinates.latitude}</Text>
      )}
      {usersLocation.mapLoading === false && (
        <Text>{usersLocation.userCoordinates.longitude}</Text>
      )}

      <MapView
        ref={(ref) => (this.map = ref)}
        style={{flex: 1, marginBottom: mapStyle.marginBottom}}
        onMapReady={onMapReady}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        zoomEnabled
      />
      <BottomSheet
        snapPoints={[350, 200, 50]}
        initialSnap={2}
        renderContent={renderContent}
        renderHeader={renderHeader}
      />
    </Container>
  );
};

export default TrackUser;
