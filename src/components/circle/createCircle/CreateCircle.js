/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This component handles the creation of new groups/circles.
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createCircle, resetBootstrap} from '../../../redux';
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
import createCircleStyles from './createCircleStyles';
import {createCircleValidation} from './createCircleValidation';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

const CreateCircle = ({navigation}) => {
  const dispatch = useDispatch();
  const createCircleStatus = useSelector((state) => state.createCircle);

  //Default state of the create group form
  const [createCircleDetails, setUserCreateCircleDetails] = useState({
    groupName: '',
  });

  //The state gets updated when ever a user types something in the input box
  //Using the array deconstruction ES6 to updated a particular field's state
  const handleCreateCircleInputChange = (key, value) => {
    setUserCreateCircleDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  /**
   * Create Circle Form validation's default state:
   */
  const [createCircleError, setCreateCircleError] = useState({
    groupName: {
      error: false,
    },
  });

  useEffect(() => {
    console.debug(createCircleStatus.circleRegistrationDetails);
    if (createCircleStatus.circleRegistrationDetails !== null) {
      dispatch(resetBootstrap());
      navigation.navigate('Bootstrap');
    }
  }, [createCircleStatus]);

  /**
   * Form validation:
   * On submission, this function sends the data to get validated
   * If validated, the rest call to create circle is made (in redux)
   */
  const submitCreateCircleForm = () => {
    let createCircleValidationErrors = createCircleValidation(
      createCircleDetails,
    );
    createCircleValidationErrors.then(async (errors) => {
      // Read the token from the Key Chain
      const token = await JwtKeyChain.read();
      // Show erros
      setCreateCircleError(errors);
      if (!errors.groupName.error) {
        dispatch(createCircle(createCircleDetails, token));
      }
    });
  };

  return (
    <Container style={createCircleStyles.createCircleContainer}>
      <Header />
      <Content>
        <Form style={createCircleStyles.createCircleForm}>
          <Item stackedLabel>
            <Label>Circle Name*</Label>
            {createCircleError.groupName.error && (
              <Label style={createCircleStyles.textFieldError}>
                {createCircleError.groupName.message}
              </Label>
            )}
            <Input
              onChangeText={(val) =>
                handleCreateCircleInputChange('groupName', val)
              }
            />
          </Item>
        </Form>
        <Button
          full
          style={createCircleStyles.createCircleButton}
          onPress={submitCreateCircleForm}>
          <Text>Create Circle</Text>
        </Button>
        {createCircleStatus.loading ? (
          <Text>...loading</Text>
        ) : createCircleStatus.error.length > 0 ? (
          <Text>{createCircleStatus.error}</Text>
        ) : null}
      </Content>
    </Container>
  );
};

export default CreateCircle;
