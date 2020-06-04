/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This component handles the Loading Screen.
 * Here is possible to check if a Token continue to be valid
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React and React Native
import React, {useEffect} from 'react';
import {Image} from 'react-native';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  authenticationTokenIsNotValid,
  checkAuthenticationToken,
  getCirclesUserIsPartOf,
} from '../../../redux';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

// Native Base
import {Container, Spinner} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';

// Style
import bootstrapStyles from './bootstrapStyles';

// Screen
const Bootstrap = ({navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);

  // Load the image source
  const icon = require('./img/icon.png');

  // Effect Hook - Run only in the first-time
  useEffect(() => {
    async function getAthenticationCredential() {
      // Read the token from the Key Chain
      const token = await JwtKeyChain.read();
      if (!token) {
        // Token not valid, user need to authenticate
        dispatch(authenticationTokenIsNotValid());
      } else {
        // Check the user Token
        dispatch(checkAuthenticationToken(token));
      }
    }
    getAthenticationCredential();
  }, []);

  // Effect Hook - Runs when something changes on the Bootstrap State
  useEffect(() => {
    const loadCircles = async () => {
      const token = await JwtKeyChain.read();
      dispatch(getCirclesUserIsPartOf(token));
      const initialRouteName = bootstrapState.initialRouteName;
      if (initialRouteName && initialRouteName !== 'Bootstrap') {
        navigation.navigate(initialRouteName);
      }
    };

    // Check if the user is Signed In
    if (bootstrapState.isSignedIn) {
      loadCircles();
    }
  }, [bootstrapState]);

  // Render
  return (
    <Container contentContainerStyle={bootstrapStyles.container}>
      <Grid style={bootstrapStyles.centralize}>
        <Col style={bootstrapStyles.centralize}>
          <Image source={icon} />
          <Spinner color="blue" />
        </Col>
      </Grid>
    </Container>
  );
};

// Export
export default Bootstrap;
