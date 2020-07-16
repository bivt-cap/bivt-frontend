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
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Toast,
} from 'native-base';
import {signupFormValidation} from './signupFormValidation';

// Custom Layout
import HeaderWithLogo from '../../layout/headerWithLogo/HeaderWithLogo';

// Screen
import LoadingSmall from '../../layout/loadingSmall/loadingSmall';
import CheckYourEmail from '../checkYourEmail/CheckYourEmail';

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const signupStatus = useSelector((state) => state.signup);

  // ****************************************************//
  // ************ BEGINING OF STATES DECLARATIONS ******//
  // **************************************************//
  const [userSignupDetails, setUserSignupDetails] = useState({
    firstName: '',
    lastName: '',
    eMail: '',
    password: '',
    coPassword: '',
  });

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
  // ****************************************************//
  // ************ END OF STATES DECLARATIONS ***********//
  // **************************************************//

  /**
   * The state gets updated when ever a user types something in the input box
   * Using the array deconstruction ES6 to updated a particular field's state
   */
  const handleSignupInputChange = (key, value) => {
    setUserSignupDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

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

  ///**
  // * The following function redirect users to create circle page once the
  // * account has been succesfully created.
  // * Note: this is just for a testing purpose, in this project user will validate
  // * the email and then login again to go to create circle page.
  // */
  //useEffect(() => {
  //  if (signupStatus.registrationDetails === 'account successfully created') {
  //    navigation.navigate('SignupFeedback');
  //  }
  //}, [signupStatus, navigation]);

  if (
    signupError.eMail.error ||
    signupError.password.error ||
    signupError.coPassword.error ||
    signupError.firstName.error ||
    signupError.lastName.error
  ) {
    const erroMsg = `Error: 
    ${signupError.eMail.message}
    ${signupError.eMail.message} 
    ${signupError.password.message} 
    ${signupError.coPassword.message} 
    ${signupError.firstName.message} 
    ${signupError.lastName.message} `;

    Toast.show({
      text: erroMsg.trim(),
      buttonText: 'OK',
    });
  }

  // Return to Login
  const onBackBtnPress = () => {
    navigation.navigate('Login');
  };

  // Render
  if (signupStatus.registrationDetails === 'account successfully created') {
    return (
      <>
        <HeaderWithLogo title="Register" />
        <CheckYourEmail
          handleBackBtn={onBackBtnPress}
          textMsg={[
            'Check your email!',
            'We sent to you a email so we can validate your email account.',
          ]}
        />
      </>
    );
  } else {
    return (
      <Container>
        <HeaderWithLogo title="Register" />
        <Content>
          <Form>
            <Label>Email</Label>
            <Item regular error={signupError.eMail.error}>
              <Input
                autoCapitalize="none"
                autoCompleteType={'email'}
                placeholder="Email"
                onChangeText={(val) => handleSignupInputChange('eMail', val)}
              />
            </Item>
            <Label>Password</Label>
            <Item regular error={signupError.password.error}>
              <Input
                autoCapitalize="none"
                secureTextEntry={true}
                autoCompleteType={'password'}
                placeholder="Password"
                onChangeText={(val) => handleSignupInputChange('password', val)}
              />
            </Item>
            <Label>Confirm Password</Label>
            <Item regular error={signupError.coPassword.error}>
              <Input
                autoCapitalize="none"
                secureTextEntry={true}
                autoCompleteType={'password'}
                placeholder="Password"
                onChangeText={(val) =>
                  handleSignupInputChange('coPassword', val)
                }
              />
            </Item>
            <Label>First Name</Label>
            <Item regular error={signupError.firstName.error}>
              <Input
                placeholder="First Name"
                onChangeText={(val) =>
                  handleSignupInputChange('firstName', val)
                }
              />
            </Item>
            <Label>Last Name</Label>
            <Item regular error={signupError.lastName.error} last>
              <Input
                placeholder="Last Name"
                onChangeText={(val) => handleSignupInputChange('lastName', val)}
              />
            </Item>
          </Form>
          <Button block onPress={submitSignupForm}>
            <Text>Submit</Text>
          </Button>
          {signupStatus.loading ? (
            <LoadingSmall />
          ) : signupStatus.error.length > 0 ? (
            <Text>{signupStatus.error}</Text>
          ) : (
            <Text>{signupStatus.registrationDetails}</Text>
          )}
        </Content>
      </Container>
    );
  }
};

export default Signup;
