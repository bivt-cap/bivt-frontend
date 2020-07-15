/**
 * This component handles the Resend of the Validation Email
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */
// React and React Native
import React, {useState, useEffect} from 'react';

// React Native
import {Image, StyleSheet} from 'react-native';

// Native Base
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button,
  Spinner,
  Toast,
} from 'native-base';

// Email default Regex
import {EMAIL_REGEX} from '../../../utils/regexUtil';

// Axios (Default API)
import {bivtURL} from '../../../redux/apis/bivtApi';

// Screen
import LoadingBig from '../../layout/loadingBig/LoadingBig';
import CheckYourEmail from '../checkYourEmail/CheckYourEmail';

// Style
const baseStyles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  text: {
    marginBottom: 40,
  },
  form: {
    marginBottom: 40,
  },
});

// Screen
const ResendValidationEmail = ({navigation}) => {
  // Default images
  const imgBee = require('./img/ResendValidationEmail.png');

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [screenController, setScreenController] = useState({
    email: '',
    isAValidEmail: true,
    isSent: false,
  });

  // Async function to resend the validation email
  const callResendValidationEmailAPI = async () => {
    try {
      await bivtURL.post('/user/resendValidationEmail', {
        email: screenController.email,
      });
      setScreenController({
        ...screenController,
        isSent: true,
      });
    } catch (error) {
      let errorMsg = 'An error occurred please try again later!';
      if (error.response) {
        errorMsg = Array.isArray(error.response.data.status.errors)
          ? error.response.data.status.errors.join(', ')
          : error.response.data.status.errors;
      }
      Toast.show({
        text: errorMsg,
        buttonText: 'OK',
        buttonTextStyle: {color: '#008000'},
        buttonStyle: {backgroundColor: '#5cb85c'},
        duration: 8000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // On Email Change
  const onChangeEmail = (email) => {
    setScreenController({
      ...screenController,
      email: email,
      isAValidEmail: EMAIL_REGEX.test(email),
    });
  };

  // Submit Form
  const onSubmitBtnPress = () => {
    if (screenController.isAValidEmail && screenController.email !== '') {
      setIsLoading(true);
      callResendValidationEmailAPI();
    } else {
      Toast.show({
        text: 'Not valid email!',
        buttonText: 'Okay',
        buttonTextStyle: {color: '#008000'},
        buttonStyle: {backgroundColor: '#5cb85c'},
        duration: 8000,
      });
    }
  };

  // Return to Login
  const onBackBtnPress = () => {
    navigation.navigate('Login');
  };

  // Render
  if (screenController.isSent) {
    return (
      <CheckYourEmail
        handleBackBtn={onBackBtnPress}
        textMsg={[
          'We will send to you a email with a link to allow you to change you email.',
        ]}
      />
    );
  } else {
    return isLoading ? (
      <LoadingBig isVisible={true} />
    ) : (
      <Container>
        <Content padder>
          <Image source={imgBee} style={baseStyles.image} />
          <Text style={baseStyles.text}>
            We will resend an email to you so we can validate your email
            account.
          </Text>
          <Form style={baseStyles.form}>
            <Label>Email</Label>
            <Item
              regular
              error={!screenController.isAValidEmail}
              disabled={isLoading}
              last>
              <Input
                placeholder="Email"
                autoCapitalize="none"
                value={screenController.email}
                disabled={isLoading}
                onChangeText={(email) => {
                  onChangeEmail(email);
                }}
              />
            </Item>
          </Form>
          <Button block disabled={isLoading} onPress={() => onSubmitBtnPress()}>
            <Text>Request</Text>
          </Button>
        </Content>
      </Container>
    );
  }
};

// Export
export default ResendValidationEmail;
