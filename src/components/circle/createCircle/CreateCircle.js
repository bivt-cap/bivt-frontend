/**
 * This component handles the creation of new groups/circles.
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createCircle} from '../../../redux';
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

const CreateCircle = ({navigation}) => {
  const dispatch = useDispatch();
  const createCircleStatus = useSelector((state) => state.createCircle);
  const [createCircleDetails, setUserCreateCircleDetails] = useState({
    groupName: '',
  });

  const handleCreateCircleInputChange = (key, value) => {
    setUserCreateCircleDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  /**
   * Create Circle Form validation:
   */
  const [createCircleError, setCreateCircleError] = useState({
    groupName: {
      error: false,
    },
  });

  /**
   * Form validation:
   * On submission, this function sends the data to get validated
   * If validated, the rest call to create circle is made (in redux)
   */
  const submitCreateCircleForm = () => {
    let createCircleValidationErrors = createCircleValidation(
      createCircleDetails,
    );
    createCircleValidationErrors.then((errors) => {
      setCreateCircleError(errors);
      if (!errors.groupName.error) {
        dispatch(createCircle(createCircleDetails));
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
        ) : (
          <Text>{createCircleStatus.circleRegistrationDetails}</Text>
        )}
      </Content>
    </Container>
  );
};

export default CreateCircle;
