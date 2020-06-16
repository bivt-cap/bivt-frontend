import React, {useState, useEffect, Alert} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  Container,
  View,
  Text,
  Header,
  Content,
  Left,
  Thumbnail,
  Card,
  CardItem,
  Icon,
  Right,
} from 'native-base';

import {useSelector, useDispatch} from 'react-redux';
import * as TaskManager from 'expo-task-manager';
import {Image} from 'react-native';
import styles from './trackUserStyle';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker, OverlayComponent} from 'react-native-maps';
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
  const [mapStyle, setMapStyle] = useState({paddingTop: 0});
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
    setTimeout(() => setMapStyle({paddingTop: 1}), 500);
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
  const renderGroupMember = () => {
    return usersLocation.membersInCircle.map((user) => {
      return (
        <Card>
          <CardItem style={{height: 60}}>
            <Left>
              <Thumbnail
                style={styles.photo}
                source={{uri: 'https://placeimg.com/140/140/any'}}
              />
            </Left>
            <Text key={user.id} style={styles.textContent}>
              {user.userFirstName}
            </Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
        </Card>
      );
    });
  };
  const renderContent = () => (
    <View style={styles.panel}>
      {usersLocation.circleLoading === true ? (
        <Text style={styles.panelSubtitle}>LOADING...</Text>
      ) : (
        renderGroupMember()
      )}
    </View>
  );
  /*
   * End of functions declerations
   */

  return (
    <Container>
      {usersLocation.mapLoading === false && (
        // <Text>{usersLocation.userCoordinates.longitude}</Text>
        <MapView
          style={[styles.map, {top: mapStyle.paddingTop}]}
          initialRegion={{
            latitude: usersLocation.userCoordinates.latitude,
            longitude: usersLocation.userCoordinates.longitude,
            latitudeDelta: 0.0052,
            longitudeDelta: 0.021,
          }}
          onMapReady={onMapReady}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomControlEnabled={true}
          zoomEnabled
        />
      )}

      <BottomSheet
        snapPoints={[350, 200, 100]}
        initialSnap={2}
        renderContent={renderContent}
        renderHeader={renderHeader}
      />
    </Container>
  );
};

export default TrackUser;
