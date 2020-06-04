/**
 * This component handles the Resend of the Validation Email
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */
// React and React Native
import React, {useState, useEffect} from 'react';

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
const ResendValidationEmail = ({navigation}) => {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [screenController, setScreenController] = useState({
    email: '',
    isAValidEmail: true,
    isSent: false,
  });

  // Check if the state change and do a action
  useEffect(() => {
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
          console.log(error.response.data);
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

    // Check if isLoading is true
    if (isLoading) {
      callResendValidationEmailAPI();
    }
  }, [isLoading, screenController]);

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
      <Container>
        <Content padder>
          <Icon
            name="checkmark-circle"
            style={{fontSize: 80, color: 'green'}}
          />
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            nisl nibh, suscipit eu nibh id, malesuada ullamcorper sapien.
            Pellentesque imperdiet, velit in condimentum bibendum, massa urna
            fringilla erat, ac posuere odio urna sed velit.
          </Text>
          <Button block onPress={() => onBackBtnPress()}>
            <Text>Back</Text>
          </Button>
        </Content>
      </Container>
    );
  } else {
    return (
      <Container>
        <Content padder>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            nisl nibh, suscipit eu nibh id, malesuada ullamcorper sapien.
            Pellentesque imperdiet, velit in condimentum bibendum, massa urna
            fringilla erat, ac posuere odio urna sed velit.
          </Text>
          <Form>
            <Item
              success={screenController.isAValidEmail}
              error={!screenController.isAValidEmail}
              disabled={isLoading}
              last>
              <Label>E-mail</Label>
              <Input
                value={screenController.email}
                disabled={isLoading}
                onChangeText={(email) => {
                  onChangeEmail(email);
                }}
              />
              {isLoading ? (
                <Icon name="information-circle" />
              ) : screenController.isAValidEmail &&
                screenController.email !== '' ? (
                <Icon name="checkmark-circle" />
              ) : !screenController.isAValidEmail &&
                screenController.email !== '' ? (
                <Icon name="close-circle" />
              ) : null}
            </Item>
          </Form>
          <Button block disabled={isLoading} onPress={() => onSubmitBtnPress()}>
            <Text>Request</Text>
          </Button>
          {isLoading ? <Spinner /> : null}
        </Content>
      </Container>
    );
  }
};

// Export
export default ResendValidationEmail;
