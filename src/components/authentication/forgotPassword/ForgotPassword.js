/**
 * The component for Login and
 *
 * @version 0.0.1
 * @author Yalcin Tatar (https://github.com/yalcinos)
 */

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import styles from './forgotPasswordStyle';
import {
  Container,
  Content,
  Button,
  Text,
  Item,
  Label,
  Input,
} from 'native-base';
import {forgotUserPassword} from '../../../redux';
import {forgotPasswordValidation} from './forgotPasswordValidation';

const ForgotPassword = ({navigation}) => {
  const userData = useSelector((state) => state.forgotPassword);
  console.log('forgotPassword', userData);
  const dispatch = useDispatch();

  // ******************************************************//
  // ************ BEGININ OF STATES DECLARATIONS *********//
  // ***************************************************//
  const [emailData, setEmailData] = useState({
    email: '',
  });

  const [forgotPassword, setforgotPassword] = useState({
    email: {
      error: false,
    },
    firstRender: true,
  });

  useEffect(() => {
    if (!forgotPassword.email.error && !forgotPassword.firstRender) {
      dispatch(forgotUserPassword(emailData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotPassword]);

  // ******************************************************//
  // ************ END OF STATES DECLERATIONS *********//
  // ***************************************************//
  const handleLoginInputChanges = (key, val) => {
    setEmailData((prevState) => {
      return {
        ...prevState,
        [key]: val,
      };
    });
  };
  const handleForgotPasswordButton = () => {
    setforgotPassword(forgotPasswordValidation(emailData));
  };

  const showForgotNotification = (errorMsg) => {
    return Alert.alert(
      'Info',
      errorMsg,
      [
        {
          text: 'OK',
          onPress: () => {
            if (userData.emailSent === 'True') {
              navigation.navigate('Login');
              userData.emailSent = 'False';
            }
            userData.pwErrorStatus = 'False';
            userData.error = '';
            console.log(userData);
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  return (
    <Container style={styles.container}>
      <Content>
        <Item stackedLabel>
          <Label>Email*</Label>
          {forgotPassword.email.error && (
            <Label style={styles.textFieldError}>
              {forgotPassword.email.message}
            </Label>
          )}
          <Input
            autoCapitalize="none"
            onChangeText={(val) => handleLoginInputChanges('email', val)}
          />
        </Item>
        <Button onPress={handleForgotPasswordButton}>
          <Text>Forgot Password</Text>
        </Button>
        {userData.emailSent === 'True'
          ? showForgotNotification(userData.forgotPasswordDetails)
          : userData.error !== '' && userData.pwErrorStatus === 'True'
          ? showForgotNotification(userData.error)
          : null}
        <Button
          transparent
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text>Sign in</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
