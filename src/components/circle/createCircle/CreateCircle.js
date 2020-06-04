/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This component handles the creation of new groups/circles.
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  createCircle,
  getCircleTypesAndPluginsDetail,
  resetBootstrap,
} from '../../../redux';
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
  Picker,
} from 'native-base';
import createCircleStyles from './createCircleStyles';
import {createCircleValidation} from './createCircleValidation';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

const CreateCircle = ({navigation}) => {
  const dispatch = useDispatch();
  const createCircleStatus = useSelector((state) => state.createCircle);
  // ****************************************************//
  // ************ BEGINING OF STATES DECLARATIONS ******//
  // **************************************************//
  const [createCircleDetails, setCreateCircleDetails] = useState({
    circleName: '',
    selectedCircleType: 0,
  });

  const [createCircleError, setCreateCircleError] = useState({
    circleName: {
      error: false,
    },
    selectedCircleType: {
      error: false,
    },
  });

  const [userMessage, setUserMessage] = useState('');
  // ****************************************************//
  // ************ END OF STATES DECLARATIONS ***********//
  // **************************************************//

  /**
   * This function fetch available circles and correponding plugins
   * on the page load
   */
  useEffect(() => {
    const getTypes = async () => {
      // Read the token from the Key Chain
      const token = await JwtKeyChain.read();
      dispatch(getCircleTypesAndPluginsDetail(token));
    };
    getTypes();
  }, []);

  //useEffect(() => {
  //  if (createCircleStatus.circleRegistrationDetails !== null) {
  //    dispatch(resetBootstrap());
  //    navigation.navigate('Bootstrap');
  //  }
  //}, [createCircleStatus]);

  /**
   * The following function redirect users to choose plugins page once the
   * circle has been succesfully created.
   */
  useEffect(() => {
    setUserMessage('');
    if (createCircleStatus.circleRegistrationDetails !== null) {
      setUserMessage('account created');
      navigation.navigate('ChoosePlugins', {
        createCircleStatus: createCircleStatus,
        createCircleDetails: createCircleDetails,
      });
    }
  }, [createCircleStatus.circleRegistrationDetails]);

  //The state gets updated when ever a user types something in the input box
  //Using the array deconstruction ES6 to updated a particular field's state
  const handleCreateCircleInputChange = (key, value) => {
    setCreateCircleDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

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

      console.log('createCircleValidationErrors');
      // Show erros
      setCreateCircleError(errors);
      if (!errors.circleName.error && !errors.selectedCircleType.error) {
        dispatch(createCircle(createCircleDetails, token));
      }
    });
  };
  /**
   * This function populate the circle type options in drop down/picker
   */
  const circleTypeOptions = () => {
    return createCircleStatus.circleTypesAndPluginsDetails.circleType.map(
      (circleType) => {
        return (
          <Picker.Item
            label={circleType.name.toString()}
            value={circleType.id}
            key={circleType.id}
          />
        );
      },
    );
  };
  /**
   * This function handle the change in value of the drop down/picker
   */
  const onPickerValueChange = (value) => {
    setCreateCircleDetails((prevState) => {
      return {
        ...prevState,
        selectedCircleType: value,
      };
    });
  };

  return (
    <Container style={createCircleStyles.createCircleContainer}>
      <Header />
      <Content>
        <Form style={createCircleStyles.createCircleForm}>
          <Item stackedLabel>
            <Label>Circle Name*</Label>
            {createCircleError.circleName.error && (
              <Label style={createCircleStyles.textFieldError}>
                {createCircleError.circleName.message}
              </Label>
            )}
            <Input
              onChangeText={(val) =>
                handleCreateCircleInputChange('circleName', val)
              }
            />
          </Item>
          <Item
            stackedLabel
            style={createCircleStyles.createCircleDropDownItem}>
            <Label>Select your circle type*</Label>
            {createCircleError.selectedCircleType.error && (
              <Label style={createCircleStyles.textFieldError}>
                {createCircleError.selectedCircleType.message}
              </Label>
            )}
            <Picker
              note
              mode="dropdown"
              style={createCircleStyles.createCircleDropDown}
              selectedValue={createCircleDetails.selectedCircleType}
              onValueChange={onPickerValueChange.bind(this)}>
              <Picker.Item label="choose one:" value={0} key={0} />
              {createCircleStatus.circleTypesAndPluginsDetails === '' ? (
                <Picker.Item label="loading" value={0} key={0} />
              ) : (
                circleTypeOptions()
              )}
            </Picker>
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
