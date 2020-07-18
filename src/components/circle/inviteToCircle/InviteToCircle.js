/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This component handles the invitation to a group/circle.
 *
 * @version 0.0.2
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 * @author: Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */
// React
import React, {useState, useEffect} from 'react';

// React Native
import {StyleSheet} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {resetBootstrap} from '../../../redux';
import {
  Container,
  Icon,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  List,
  ListItem,
  Card,
  CardItem,
  Body,
  Toast,
} from 'native-base';

// Axios (Default API)
import {bivtURL} from '../../../redux/apis/bivtApi';

// Custom Layout
import HeaderWithLogo from '../../layout/headerWithLogo/HeaderWithLogo';
import LoadingBig from '../../layout/loadingBig/LoadingBig';

// Style
const baseStyles = StyleSheet.create({
  nForm: {
    marginTop: 20,
  },
  toInvite: {
    marginBottom: 40,
  },
  toInviteList: {
    width: '100%',
  },
  toInviteListItem: {
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 0,
  },
  toInviteListItemButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnInvite: {
    marginTop: 20,
    marginBottom: 20,
  },
  btnSkip: {
    marginTop: 20,
    marginBottom: 50,
  },
});

// Custom Validation
import {EMAIL_REGEX} from '../../../utils/regexUtil';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

// Screen
const InviteToCircle = ({navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);

  //Default state of the invite to circle form
  const [inviteToCircleDetails, setInviteToCircleDetails] = useState({
    emailToInvite: '',
    emailToInviteError: false,
    emailToInviteList: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMembers = async () => {
      setInviteToCircleDetails((prevState) => {
        return {
          ...prevState,
          emailToInviteList: [
            ...bootstrapState.circles[0].members
              .filter((m) => m.email !== bootstrapState.user.email)
              .map((m) => {
                return m.email;
              }),
          ],
        };
      });
    };
    getMembers();
  }, []);

  //The state gets updated when ever a user types something in the input box
  //Using the array deconstruction ES6 to updated a particular field's state
  const handleInviteToCircleInputChange = (key, value) => {
    setInviteToCircleDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  ///**
  // * Form validation:
  // * On submission, this function sends the data to get validated
  // * If validated, the rest call to inviteTo circle is made (in redux)
  // */
  //const submitInviteToCircleForm = () => {
  //  let inviteToCircleValidationErrors = inviteToCircleValidation(
  //    inviteToCircleDetails,
  //  );
  //  inviteToCircleValidationErrors.then((errors) => {
  //    setInviteToCircleError(errors);
  //    if (!errors.inviteeEmail.error) {
  //      const circleId = bootstrapState.circles[0].id;
  //      dispatch(inviteToCircle(inviteToCircleDetails, circleId));
  //    }
  //  });
  //};

  // Handle new Email
  const handleAddNewEmail = () => {
    const emailReg = EMAIL_REGEX;
    if (
      !emailReg.test(String(inviteToCircleDetails.emailToInvite).toLowerCase())
    ) {
      setInviteToCircleDetails((prevState) => {
        return {
          ...prevState,
          emailToInviteError: false,
        };
      });
      Toast.show({
        text: 'Please enter a valid email address',
        buttonText: 'OK',
        buttonTextStyle: {color: '#FFF'},
        buttonStyle: {backgroundColor: '#CA60E3'},
        duration: 8000,
      });
    } else if (
      inviteToCircleDetails.emailToInviteList.find(
        (e) => e === inviteToCircleDetails.emailToInvite,
      )
    ) {
      setInviteToCircleDetails((prevState) => {
        return {
          ...prevState,
          emailToInviteError: false,
        };
      });
      Toast.show({
        text: 'Email already in list to invite',
        buttonText: 'OK',
        buttonTextStyle: {color: '#FFF'},
        buttonStyle: {backgroundColor: '#CA60E3'},
        duration: 8000,
      });
    } else {
      setInviteToCircleDetails((prevState) => {
        return {
          ...prevState,
          emailToInviteError: false,
          emailToInviteList: [
            ...prevState.emailToInviteList,
            inviteToCircleDetails.emailToInvite,
          ],
          emailToInvite: '',
        };
      });
    }
  };

  // Remove an email from list
  const handleRemoveEmail = (email) => {
    setInviteToCircleDetails((prevState) => {
      return {
        ...prevState,
        emailToInviteList: [
          ...prevState.emailToInviteList.filter((e) => e !== email),
        ],
      };
    });
  };

  // Skip
  const handleSkip = () => {
    navigation.navigate('DashBoard');
  };

  // Invite all members
  const handleInviteMembers = async () => {
    // Show loading
    setIsLoading(true);

    // Read the token from the Key Chain
    const token = await JwtKeyChain.read();

    // Circle Id
    const circleId = bootstrapState.circles[0].id;

    // Loop all emails
    for (let i = 0; i < inviteToCircleDetails.emailToInviteList.length; i++) {
      console.log(inviteToCircleDetails.emailToInviteList[i]);

      await bivtURL.post(
        '/circle/inviteUser',
        {
          email: inviteToCircleDetails.emailToInviteList[i],
          circleId: circleId,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
    }

    // Reset and go to bootstrap
    dispatch(resetBootstrap());
    navigation.navigate('Bootstrap');
  };

  // Render
  return isLoading ? (
    <LoadingBig isVisible={true} />
  ) : (
    <Container>
      <HeaderWithLogo title="Invite Members" />
      <Content>
        <Form style={baseStyles.nForm}>
          <Label>Email</Label>
          <Item regular error={inviteToCircleDetails.emailToInviteError}>
            <Input
              placeholder="Email to invite"
              autoCapitalize="none"
              autoCompleteType={'email'}
              onChangeText={(val) =>
                handleInviteToCircleInputChange('emailToInvite', val)
              }
              value={inviteToCircleDetails.emailToInvite}
            />
            <Button transparent iconRight onPress={() => handleAddNewEmail()}>
              <Icon
                ios="ios-add-circle-outline"
                android="md-add-circle-outline"
              />
            </Button>
          </Item>
        </Form>
        {inviteToCircleDetails.emailToInviteList.length > 0 ? (
          <Card style={baseStyles.toInvite}>
            <CardItem header bordered>
              <Text>Members to Invite</Text>
            </CardItem>
            <CardItem>
              <Body>
                <List style={baseStyles.toInviteList}>
                  {inviteToCircleDetails.emailToInviteList.map(
                    (email, index) => {
                      return (
                        <ListItem style={baseStyles.toInviteListItem}>
                          <Button
                            block
                            bordered
                            iconRight
                            disabled={email === bootstrapState.user.email}
                            style={baseStyles.toInviteListItemButton}
                            onPress={() => handleRemoveEmail(email)}>
                            <Text>{email}</Text>
                            <Icon
                              ios="ios-remove-circle-outline"
                              android="md-remove-circle-outline"
                            />
                          </Button>
                        </ListItem>
                      );
                    },
                  )}
                </List>
              </Body>
            </CardItem>
          </Card>
        ) : null}
        <Button
          block
          onPress={() => handleInviteMembers()}
          disabled={inviteToCircleDetails.emailToInviteList.length <= 0}
          style={baseStyles.btnInvite}>
          <Text>Invite</Text>
        </Button>
        <Button
          block
          bordered
          onPress={() => handleSkip()}
          style={baseStyles.btnSkip}>
          <Text>Skip</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default InviteToCircle;
