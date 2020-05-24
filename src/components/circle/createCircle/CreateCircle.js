/**
 * This component handles the creation of new groups/circles.
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createCircle, getCircleTypesAndPluginsDetail} from '../../../redux';
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

const CreateCircle = ({navigation}) => {
  const dispatch = useDispatch();
  const createCircleStatus = useSelector((state) => state.createCircle);
  // ****************************************************//
  // ************ BEGINING OF STATES DECLARATIONS ******//
  // **************************************************//
  const [createCircleDetails, setCreateCircleDetails] = useState({
    groupName: '',
    selectedGroupType: 0,
  });

  const [createCircleError, setCreateCircleError] = useState({
    groupName: {
      error: false,
    },
    selectedGroupType: {
      error: false,
    },
  });
  const [userMessage, setUserMessage] = useState('');
  // ****************************************************//
  // ************ END OF STATES DECLARATIONS ***********//
  // **************************************************//

  /**
   * This function fetch available groups and correponding plugins
   * on the page load
   */
  useEffect(() => {
    dispatch(getCircleTypesAndPluginsDetail());
  }, []);

  /**
   * The state gets updated when ever a user types something in the input box
   * Using the array deconstruction ES6 to updated a particular field's state
   */
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
    createCircleValidationErrors.then((errors) => {
      setCreateCircleError(errors);
      if (!errors.groupName.error && !errors.selectedGroupType.error) {
        dispatch(createCircle(createCircleDetails));
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
        selectedGroupType: value,
      };
    });
  };
  /**
   * The following function redirect users to choose plugins page once the
   * group has been succesfully created.
   */
  useEffect(() => {
    if (createCircleStatus.circleRegistrationDetails.status !== undefined) {
      if (createCircleStatus.circleRegistrationDetails.status.id === 200) {
        setUserMessage('account created');
        navigation.navigate('ChoosePlugins');
      }
    }
  }, [createCircleStatus.circleRegistrationDetails, navigation]);

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
          <Item
            stackedLabel
            style={createCircleStyles.createCircleDropDownItem}>
            <Label>Select your group type*</Label>
            {createCircleError.selectedGroupType.error && (
              <Label style={createCircleStyles.textFieldError}>
                {createCircleError.selectedGroupType.message}
              </Label>
            )}
            <Picker
              note
              mode="dropdown"
              style={createCircleStyles.createCircleDropDown}
              selectedValue={createCircleDetails.selectedGroupType}
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
        ) : (
          <Text>{userMessage}</Text>
        )}
      </Content>
    </Container>
  );
};

export default CreateCircle;
