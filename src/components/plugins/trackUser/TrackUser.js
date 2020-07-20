import React, {useState, useEffect} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  Container,
  View,
  Text,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Thumbnail,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {Alert, Image} from 'react-native';
import styles from './trackUserStyle';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import JwtKeyChain from '../../../utils/jwtKeyChain';
import GroupMemberModal from './Modal/GroupMemberModal';
import {
  getInitialLocation,
  getMembersInformationsInCircle,
  trackLocationInBackGround,
  getLocationsFromDB,
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
  const [buttonToogle, setbuttonToogle] = useState(false);
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
    fetchAllCordinatesinCircle();

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
  const showMarkeronMap = () => {
    return usersLocation.allCoordinatesinCircle.map((coord, index) => {
      const latlang = {
        latitude: coord.latitude,
        longitude: coord.longitude,
      };

      return (
        <Marker coordinate={latlang} key={index} pinColor={'purple'}>
          <Image
            source={require('../../layout/loadingBig/img/avatar.png')}
            style={{height: 70, width: 50}}
          />
        </Marker>
      );
    });
  };
  const showLastUpdateInfo = (userId) => {
    if (usersLocation.circleLoading === false) {
      return usersLocation.allCoordinatesinCircle.map((coord, index) => {
        if (userId === coord.userExtId) {
          const dateRegEx = '^[^T]*';
          const timeRegEx = 'T(.*).000Z';
          const filteredDate = coord.lastUpdatedOn.match(dateRegEx);
          const filteredTime = coord.lastUpdatedOn.match(timeRegEx);

          return (
            <Text style={styles.locationDateSize}>
              Last Update: {filteredDate[0]}, {filteredTime[1]}{' '}
            </Text>
          );
        }
      });
    }
  };

  const fetchMembersInCircle = async () => {
    const token = await JwtKeyChain.read();
    const circleId = bootstrapState.circles[0].id;
    dispatch(getMembersInformationsInCircle(token, circleId));
  };
  const fetchAllCordinatesinCircle = async () => {
    const token = await JwtKeyChain.read();
    const circleId = bootstrapState.circles[0].id;
    dispatch(getLocationsFromDB(token, circleId));
  };

  const renderGroupMember = () => {
    if (usersLocation.circleLoading === false) {
      return usersLocation.membersInCircle.map((user, index) => {
        return (
          <GroupMemberModal
            key={user.id}
            userFirstName={user.userFirstName}
            userLastName={user.userLastName}
            lastUpdated={showLastUpdateInfo(user.extId)}
            focusMarker={() => {
              usersLocation.allCoordinatesinCircle[index] === undefined
                ? Alert.alert(
                    'There is no currently sharable Location for this user!',
                  )
                : animateToMarker(
                    usersLocation.allCoordinatesinCircle[index].latitude,
                    usersLocation.allCoordinatesinCircle[index].longitude,
                  );
            }}
          />
        );
      });
    }
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

  const animateToMarker = (lat, long) => {
    console.log(buttonToogle);
    if (buttonToogle === true) {
      setbuttonToogle(false);
      return this.map.animateCamera({
        center: {
          latitude: lat,
          longitude: long,
        },
        zoom: 15,
      });
    } else {
      setbuttonToogle(true);
      return this.map.animateCamera({
        center: {
          latitude: lat,
          longitude: long,
        },
        zoom: 10,
      });
    }
  };
  /*
   * End of functions declerations
   */

  return (
    <Container>
      {usersLocation.mapLoading === false && (
        <MapView
          style={[styles.map, {top: mapStyle.paddingTop}]}
          ref={(map) => {
            this.map = map;
          }}
          initialRegion={{
            latitude: usersLocation.userCoordinates.latitude,
            longitude: usersLocation.userCoordinates.longitude,
            latitudeDelta: 0.0121,
            longitudeDelta: 0.411,
          }}
          onMapReady={onMapReady}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomControlEnabled={true}
          zoomEnabled>
          {usersLocation.fetchCoordLoading === false && showMarkeronMap()}
        </MapView>
      )}

      <Card style={styles.welcomeStyle}>
        <CardItem>
          <Left>
            <Thumbnail
              source={require('../../../assets/images/plugins/Family3.png')}
            />
            <Body>
              <Text>
                See when your group members are at school,work or elsewhere! 🌍
              </Text>
            </Body>
          </Left>
        </CardItem>
      </Card>

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
