/**
 * Header Extra Large With Logo
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React
import React from 'react';

// React Native
import {Image, ImageBackground, StyleSheet, Dimensions} from 'react-native';

// Natibe Base
import {Header, Left, Body, Title, Right} from 'native-base';

// Style
const headerWithLogoStyles = StyleSheet.create({
  header: {
    marginRight: 0,
    paddingRight: 0,
    marginLeft: 0,
    paddingLeft: 0,
    height: 110,
  },
  logo: {
    width: 73,
    height: 91,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  body: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyTitle: {
    fontSize: 32,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  montains: {
    width: 121,
    height: 65,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

// Component
const HeaderWithLogo = (props) => {
  return (
    <Header style={headerWithLogoStyles.header}>
      <ImageBackground
        source={require('./img/background_left.png')}
        style={headerWithLogoStyles.logo}>
        <Left />
      </ImageBackground>
      <Body style={headerWithLogoStyles.body}>
        <Title style={headerWithLogoStyles.bodyTitle}>{props.title}</Title>
      </Body>
      <ImageBackground
        source={require('./img/background_right.png')}
        style={headerWithLogoStyles.montains}>
        <Right />
      </ImageBackground>
    </Header>
  );
};

// Export
export default HeaderWithLogo;
