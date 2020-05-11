import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signupUser} from '../../../redux';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';
import signupStyles from './signupStyles';
import {signupFormValidation} from './signupFormValidation';

const Signup = () => {
  const dispatch = useDispatch();
  const signupStatus = useSelector((state) => state.signup);

  const [userSignupDetails, setUserSignupDetails] = useState({
    firstName: '',
    lastName: '',
    eMail: '',
    password: '',
    coPassword: '',
  });

  const handleSignupInputChange = (key, value) => {
    setUserSignupDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const [signupError, setSignupError] = useState({
    firstName: {
      error: false,
    },
    lastName: {
      error: false,
    },
    eMail: {
      error: false,
    },
    password: {
      error: false,
    },
    coPassword: {
      error: false,
    },
    firstRender: true,
  });

  const submitSignupForm = () => {
    setSignupError(signupFormValidation(userSignupDetails));
  };

  useEffect(() => {
    if (
      !signupError.firstName.error &&
      !signupError.lastName.error &&
      !signupError.eMail.error &&
      !signupError.password.error &&
      !signupError.coPassword.error &&
      !signupError.firstRender
    ) {
      dispatch(signupUser(userSignupDetails));
    }
  }, [signupError, userSignupDetails, dispatch]);

  return (
    <Container style={signupStyles.signupContainer}>
      <Header />
      <Content>
        <Form style={signupStyles.signupForm}>
          <Item stackedLabel>
            <Label>First Name*</Label>
            {signupError.firstName.error && (
              <Label style={signupStyles.textFieldError}>
                {signupError.firstName.message}
              </Label>
            )}
            <Input
              onChangeText={(val) => handleSignupInputChange('firstName', val)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Last Name*</Label>
            {signupError.lastName.error && (
              <Label style={signupStyles.textFieldError}>
                {signupError.lastName.message}
              </Label>
            )}
            <Input
              onChangeText={(val) => handleSignupInputChange('lastName', val)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Email*</Label>
            {signupError.eMail.error && (
              <Label style={signupStyles.textFieldError}>
                {signupError.eMail.message}
              </Label>
            )}
            <Input
              onChangeText={(val) => handleSignupInputChange('eMail', val)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Password*</Label>
            {signupError.password.error && (
              <Label style={signupStyles.textFieldError}>
                {signupError.password.message}
              </Label>
            )}
            <Input
              secureTextEntry={true}
              onChangeText={(val) => handleSignupInputChange('password', val)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Confirm Password*</Label>
            {signupError.coPassword.error && (
              <Label style={signupStyles.textFieldError}>
                {signupError.coPassword.message}
              </Label>
            )}
            <Input
              secureTextEntry={true}
              onChangeText={(val) => handleSignupInputChange('coPassword', val)}
            />
          </Item>
        </Form>
        <Button
          full
          style={signupStyles.signupButton}
          onPress={submitSignupForm}>
          <Text>Signup</Text>
        </Button>
        {signupStatus.loading ? (
          <Text>...loading</Text>
        ) : signupStatus.error.length > 0 ? (
          <Text>{signupStatus.error}</Text>
        ) : (
          <Text>{signupStatus.registrationDetails}</Text>
        )}
      </Content>
    </Container>
  );
};

export default Signup;
