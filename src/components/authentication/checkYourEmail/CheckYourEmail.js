/**
 * This component handles the Resend of the Validation Email
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */
// React and React Native
import React from 'react';

// React Native
import {Image, StyleSheet} from 'react-native';

// Native Base
import {Container, Content, Text, Button} from 'native-base';

// Custom Layout
import HeaderWithLogo from '../../layout/headerWithLogo/HeaderWithLogo';

// Style
const baseStyles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  text1: {
    marginBottom: 20,
    textAlign: 'center',
  },
  text2: {
    marginBottom: 80,
    textAlign: 'center',
  },
});

// Screen
const CheckYourEmail = (props) => {
  // Default images
  const imgBee = require('./img/CheckYourEmail.png');

  // Render
  return (
    <Container>
      <Content padder>
        <Image source={imgBee} style={baseStyles.image} />
        {props.textMsg.map((txt, index) => {
          return (
            <Text
              style={
                index === props.textMsg.length - 1
                  ? baseStyles.text2
                  : baseStyles.text1
              }>
              {txt}
            </Text>
          );
        })}
        <Button block onPress={() => props.handleBackBtn()}>
          <Text>OK</Text>
        </Button>
      </Content>
    </Container>
  );
};

// Export
export default CheckYourEmail;
