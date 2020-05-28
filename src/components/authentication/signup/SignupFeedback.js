/**
 * This component handles the signup feedback for new users.
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React and React Native
import React from 'react';

import {Container, Content, Button, Text} from 'native-base';

// Screen
const SignupFeedback = ({navigation}) => {
  const returnToLoginHandler = () => {
    navigation.navigate('Login');
  };

  // Render
  return (
    <Container>
      <Content>
        <Text>You need to validate your email</Text>
        <Button full onPress={returnToLoginHandler}>
          <Text>OK</Text>
        </Button>
      </Content>
    </Container>
  );
};

// Export
export default SignupFeedback;
