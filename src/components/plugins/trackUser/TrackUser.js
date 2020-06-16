import React, {useState, useEffect, Alert} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {Container, View, Content, Footer, Text} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {Image} from 'react-native';
import styles from './trackUserStyle';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import JwtKeyChain from '../../../utils/jwtKeyChain';
import * as Location from 'expo-location';
import {
  trackLocationInBackGround,
  getLocation,
  getMembersInformationsInCircle,
} from '../../../redux';

const TrackUser = () => {
  /*
   * Start of state declerations and fetch state from store
   */
  const bootstrapState = useSelector((state) => state.bootstrap);
  // console.log(bootstrapState);
  const usersLocation = useSelector((state) => state.locationTrack);
  console.log(usersLocation);
  const [mapStyle, setMapStyle] = useState({marginBottom: 1});
  const dispatch = useDispatch();
  /*
   * End of state declerations and fetch state from store
   */

  /*
   * Start of functions declerations
   */
  useEffect(() => {
    // dispatch(getLocation);
    // dispatch(trackLocationInBackGround);
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

  const renderContent = () => (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Yalcin Tatar</Text>
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
      {usersLocation.circleLoading === true && (
        <Text>{usersLocation.membersInCircle[0].userFirstName}</Text>
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
