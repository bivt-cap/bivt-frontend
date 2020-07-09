/**
 * Loading the uses all screen
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React
import React from 'react';

// React Native
import {Image, StyleSheet, View, Animated, Dimensions} from 'react-native';

// Natibe Base
import {Text, Container, Content} from 'native-base';

// Modal
import Modal from 'react-native-modal';

// Style
const loadingBigStyles = StyleSheet.create({
  modal: {
    backgroundColor: '#FFF',
    padding: 0,
    margin: 0,
  },
  view: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  avartar: {
    alignSelf: 'center',
    width: 200 * 0.8,
    height: 310 * 0.8,
  },
  text: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A53BBA',
  },
  wave: {
    alignSelf: 'flex-start',
    marginLeft: -50,
  },
});

// Component
const LoadingBig = (props) => {
  // Default images
  const imgWave = require('./img/wave.png');
  const imgAvatar = require('./img/avatar.png');

  // Animation
  const shakeAnimation = new Animated.Value(0);

  const startShake = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 20,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -20,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 20,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  startShake();

  return (
    <Modal
      animationType="slideInUp"
      isVisible={props.isVisible}
      style={loadingBigStyles.modal}
      hasBackdrop={false}>
      <View style={loadingBigStyles.view}>
        <Container style={loadingBigStyles.container}>
          <Image source={imgAvatar} style={loadingBigStyles.avartar} />
          <Text style={loadingBigStyles.text}>{props.Text}</Text>
        </Container>
        <Animated.View style={{transform: [{translateX: shakeAnimation}]}}>
          <Image source={imgWave} style={loadingBigStyles.wave} />
        </Animated.View>
      </View>
    </Modal>
  );
};

// Export
export default LoadingBig;
