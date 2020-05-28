/**
 * This component handles the signup for new users.
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
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

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const signupStatus = useSelector((state) => state.signup);
  //Default state of the signup form
  const [userSignupDetails, setUserSignupDetails] = useState({
    firstName: '',
    lastName: '',
    eMail: '',
    password: '',
    coPassword: '',
  });
  //The state gets updated when ever a user types something in the input box
  //Using the array deconstruction ES6 to updated a particular field's state
  const handleSignupInputChange = (key, value) => {
    setUserSignupDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };
  /**
   * Signup Form validation's default state:
   */
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

  /**
   * Form validation:
   * On submission, this function sends the data to get validated
   * If validated, the rest call to register is made (in redux)
   */
  const submitSignupForm = () => {
    let signupFormValidationErrors = signupFormValidation(userSignupDetails);
    signupFormValidationErrors.then((errors) => {
      setSignupError(errors);
      if (
        !errors.firstName.error &&
        !errors.lastName.error &&
        !errors.eMail.error &&
        !errors.password.error &&
        !errors.coPassword.error &&
        !errors.firstRender
      ) {
        dispatch(signupUser(userSignupDetails));
      }
    });
  };

  /**
   * The following function redirect users to create circle page once the
   * account has been succesfully created.
   * Note: this is just for a testing purpose, in this project user will validate the email
   * and then login again to go to create circle page.
   */
  useEffect(() => {
    if (signupStatus.registrationDetails === 'account successfully created') {
      navigation.navigate('SignupFeedback');
    }
  }, [signupStatus, navigation]);

  return (
    <Container style={signupStyles.signupContainer}>
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
              autoCompleteType={'email'}
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
              autoCompleteType={'password'}
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
              autoCompleteType={'password'}
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
