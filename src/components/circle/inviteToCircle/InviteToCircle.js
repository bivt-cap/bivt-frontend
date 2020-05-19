/**
 * This component handles the invitation to a group/circle.
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {inviteToCircle} from '../../../redux';
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
import inviteToCircleStyles from './inviteToCircleStyles';
import {inviteToCircleValidation} from './inviteToCircleValidation';

const InviteToCircle = ({navigation}) => {
  const dispatch = useDispatch();
  const inviteToCircleStatus = useSelector((state) => state.inviteToCircle);
  const [inviteToCircleDetails, setInviteToCircleDetails] = useState({
    inviteeEmail: '',
  });

  const handleInviteToCircleInputChange = (key, value) => {
    setInviteToCircleDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  /**
   * Invite To Circle Form validation:
   */
  const [inviteToCircleError, setInviteToCircleError] = useState({
    inviteeEmail: {
      error: false,
    },
  });

  /**
   * Form validation:
   * On submission, this function sends the data to get validated
   * If validated, the rest call to inviteTo circle is made (in redux)
   */
  //Hardcoding circle id for the development purposes only
  //Please pass the current group Id here
  const circleId = 9;
  const submitInviteToCircleForm = () => {
    let inviteToCircleValidationErrors = inviteToCircleValidation(
      inviteToCircleDetails,
    );
    inviteToCircleValidationErrors.then((errors) => {
      setInviteToCircleError(errors);
      if (!errors.inviteeEmail.error) {
        dispatch(inviteToCircle(inviteToCircleDetails, circleId));
      }
    });
  };

  return (
    <Container style={inviteToCircleStyles.inviteToCircleContainer}>
      <Header />
      <Content>
        <Form style={inviteToCircleStyles.inviteToCircleForm}>
          <Item stackedLabel>
            <Label>Email*</Label>
            {inviteToCircleError.inviteeEmail.error && (
              <Label style={inviteToCircleStyles.textFieldError}>
                {inviteToCircleError.inviteeEmail.message}
              </Label>
            )}
            <Input
              autoCompleteType={'email'}
              onChangeText={(val) =>
                handleInviteToCircleInputChange('inviteeEmail', val)
              }
            />
          </Item>
        </Form>
        <Button
          full
          style={inviteToCircleStyles.inviteToCircleButton}
          onPress={submitInviteToCircleForm}>
          <Text>Invite To Circle</Text>
        </Button>

        {inviteToCircleStatus.loading ? (
          <Text>...loading</Text>
        ) : inviteToCircleStatus.error.length > 0 ? (
          <Text>{inviteToCircleStatus.error}</Text>
        ) : (
          <Text>{inviteToCircleStatus.inviteToCircleResponseDetails}</Text>
        )}
      </Content>
    </Container>
  );
};

export default InviteToCircle;
