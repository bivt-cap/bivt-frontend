/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This component handles the Resend of the Validation Email
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */
// React and React Native
import React, {useState, useEffect} from 'react';

// Reux
import {useDispatch, useSelector} from 'react-redux';
import {loadEventMembers, cleanEventMembers} from '../../../redux';

// Native Base
import {
  Container,
  Content,
  Form,
  Label,
  Thumbnail,
  Button,
  List,
  ListItem,
  Left,
  Right,
  Text,
  Item,
  Input,
} from 'native-base';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

// Layout
import FooterBase from '../../layout/footerBase/FooterBase';
import LoadingSmall from '../../layout/loadingSmall/loadingSmall';

// Style
import {formBaseStyles, viewBaseStyles} from './calendarStyle';

// Screen
const CalendarEventView = ({route, navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  // User and circle
  const bootstrapState = useSelector((state) => state.bootstrap);

  // Calendar / Event
  const calendarState = useSelector((state) => state.calendarReducer);

  // State
  const [eventDetails, setEventDetails] = useState({
    title: '',
    participants: [],
    time: '',
    day: '',
    note: '',
    id: 0,
    isLoading: true,
  });

  /**
   * Loading Data
   */
  useEffect(() => {
    const loadMembers = async (id) => {
      // Read the token from the Key Chain
      const token = await JwtKeyChain.read();

      // Load the Events List
      dispatch(loadEventMembers(token, bootstrapState.circles[0].id, id));
    };

    // param from rout
    const {title, time, day, note, id} = route.params;

    // Set the navigation title
    navigation.setOptions({title: title});

    // Show the loading information
    setEventDetails((prevState) => {
      return {
        ...prevState,
        title,
        participants: [],
        time,
        day,
        note,
        id,
      };
    });

    // Load partipants list
    loadMembers(id);
  }, []);

  /**
   * List of members were loaded
   */
  useEffect(() => {
    if (calendarState.members !== null) {
      setEventDetails((prevState) => {
        return {
          ...prevState,
          participants: calendarState.members,
          isLoading: false,
        };
      });
    }
  }, [calendarState.members]);

  /**************************************************
   * Edit button click
   **************************************************/
  const handleEditClick = () => {
    // Clean list of member previous load for an event
    dispatch(cleanEventMembers());

    // Load Form
    navigation.navigate('CalendarEventForm', {
      title: eventDetails.title,
      time: eventDetails.time,
      day: eventDetails.day,
      note: eventDetails.note,
      id: eventDetails.id,
    });
  };

  // Default image
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

  /**************************************************
   * Render
   **************************************************/
  return (
    <Container>
      <Content padder>
        <Form>
          <Label>Title</Label>
          <Item regular>
            <Input placeholder="" value={eventDetails.title} disabled />
          </Item>
          <Label>Participants</Label>
          <List>
            <ListItem style={formBaseStyles.imagesListItem}>
              <Left>
                {eventDetails.isLoading ? (
                  <LoadingSmall />
                ) : (
                  eventDetails.participants.map((member) => {
                    return (
                      <Thumbnail
                        small
                        source={{uri: member.photoUrl ? member.photoUrl : uri}}
                        style={formBaseStyles.imagesThumbnail}
                      />
                    );
                  })
                )}
              </Left>
              <Right />
            </ListItem>
          </List>
          <Label>Time</Label>
          <Item regular>
            <Input placeholder="" value={eventDetails.time} disabled />
          </Item>
          <Label>Day</Label>
          <Item regular>
            <Input placeholder="" value={eventDetails.day} disabled />
          </Item>
          <Label>Note</Label>
          <Item regular>
            <Input placeholder="" value={eventDetails.note} disabled />
          </Item>
        </Form>
        <Button block onPress={handleEditClick}>
          <Text>Edit</Text>
        </Button>
      </Content>
      <FooterBase navigation={navigation} />
    </Container>
  );
};

// Export
export default CalendarEventView;
