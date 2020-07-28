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
import {createEvent, loadEventMembers, updateEvent} from '../../../redux';

// React Native
import {TouchableOpacity, Platform, View} from 'react-native';

// Native Base
import {
  Container,
  Content,
  Form,
  Label,
  Item,
  Input,
  Thumbnail,
  Button,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Text,
  Body,
  H1,
  Toast,
} from 'native-base';

// Date and Time picker
import DateTimePicker from '@react-native-community/datetimepicker';

// Modal
import Modal from 'react-native-modal';

// Image Picker
import ImagePicker from 'react-native-image-picker';

// Image Resizer
import ImageResizer from 'react-native-image-resizer';

// Moment
import moment from 'moment';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

// Layout
import FooterBase from '../../layout/footerBase/FooterBase';
import LoadingBig from '../../layout/loadingBig/LoadingBig';
import LoadingSmall from '../../layout/loadingSmall/loadingSmall';

// Style
import {formBaseStyles} from './calendarStyle';

// Screen
const CalendarEventForm = ({route, navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  // User and circle
  const bootstrapState = useSelector((state) => state.bootstrap);

  // Event
  const calendarState = useSelector((state) => state.calendarReducer);

  const getStartHour = () => {
    const currentHour = moment();
    const hourNow = currentHour.format('HH');
    let minuteNow = '00';
    if (currentHour.minutes() < 10) {
      minuteNow = '00';
    } else if (currentHour.minutes() < 20) {
      minuteNow = '10';
    } else if (currentHour.minutes() < 30) {
      minuteNow = '20';
    } else if (currentHour.minutes() < 40) {
      minuteNow = '30';
    } else if (currentHour.minutes() < 50) {
      minuteNow = '40';
    } else {
      minuteNow = '50';
    }

    return `${hourNow}:${minuteNow}`;
  };

  // State
  const [eventDetails, setEventDetails] = useState({
    title: '',
    participants: null,
    time: getStartHour(),
    day: moment().format('dddd, DD MMMM, YYYY'),
    note: '',
    photos: [],
    id: null,
  });

  // Form State
  const [formState, setFormState] = useState({
    errorTitle: false,
    dateTimePickerMode: 'date',
    dateTimePickerShow: false,
    participantsModalShow: false,
    isLoading: false,
  });

  // Default image
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

  /**************************************************
   * Form Input Change
   **************************************************/
  const handleEventInputChange = (key, value) => {
    setEventDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  /**************************************************
   * Date Time Picker
   **************************************************/
  const dateTimePickerModeOnChange = (event, selectedDate) => {
    const date = moment(
      eventDetails.day + ' ' + eventDetails.time,
      'dddd, DD MMMM, YYYY HH:mm',
    ).toDate();
    const currentDate = selectedDate || date;

    // Hide the DateTimePicker
    setFormState((prevState) => {
      return {
        ...prevState,
        dateTimePickerShow: Platform.OS === 'ios',
      };
    });

    // Set the new date in the state
    if (formState.dateTimePickerMode === 'date') {
      setEventDetails((prevState) => {
        return {
          ...prevState,
          day: moment(currentDate).format('dddd, DD MMMM, YYYY'),
        };
      });
    } else {
      setEventDetails((prevState) => {
        return {
          ...prevState,
          time: moment(currentDate).format('HH:mm'),
        };
      });
    }
  };

  const dateTimePickerShow = (mode) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        dateTimePickerMode: mode,
        dateTimePickerShow: true,
      };
    });
  };

  /**************************************************
   * Participants Modal
   **************************************************/
  const participantsModalShow = () => {
    setFormState((prevState) => {
      return {
        ...prevState,
        participantsModalShow: true,
      };
    });
  };

  const participantsModalClose = () => {
    setFormState((prevState) => {
      return {
        ...prevState,
        participantsModalShow: false,
      };
    });
  };

  const participantsModalToggleMember = (memberId) => {
    // Lista de membros
    const members = bootstrapState.circles[0].members;

    // Find the member by id
    const member = members.find((m) => m.id === memberId);

    // Check if this member already exist in the list
    const participantIndex =
      eventDetails.participants !== null
        ? eventDetails.participants.map((m) => m.id).indexOf(memberId)
        : -1;

    if (participantIndex !== -1) {
      // Remove
      setEventDetails((prevState) => {
        return {
          ...prevState,
          participants: [
            ...prevState.participants.filter((m) => m.id !== memberId),
          ],
        };
      });
    } else {
      // Add
      setEventDetails((prevState) => {
        if (prevState.participants !== null) {
          return {
            ...prevState,
            participants: [...prevState.participants, {...member}],
          };
        } else {
          return {
            ...prevState,
            participants: [{...member}],
          };
        }
      });
    }
  };

  /**************************************************
   * Image Modal
   **************************************************/
  //const getImage = async () => {
  //  ImagePicker.showImagePicker(
  //    {
  //      title: 'Choose An Image',
  //      storageOptions: {
  //        skipBackup: true,
  //        path: 'images',
  //      },
  //    },
  //    (response) => {
  //      if (response.didCancel) {
  //        console.log('User cancelled image picker');
  //      } else if (response.error) {
  //        console.log('ImagePicker Error: ', response.error);
  //      } else if (response.customButton) {
  //        console.log('User tapped custom button: ', response.customButton);
  //      } else {
  //        // const source = {uri: response.uri};
  //        let path = response.uri;
  //        if (Platform.OS === 'ios') {
  //          path = '~' + path.substring(path.indexOf('/Documents'));
  //        }
  //        if (!response.fileName) {
  //          response.fileName = path.split('/').pop();
  //        }
  //
  //        console.log(response.uri);
  //
  //        ImageReactNative.getSize(
  //          response.uri,
  //          (w, h) => {
  //            console.log('===============>');
  //            console.log(w);
  //            console.log(h);
  //
  //            const ratio = Math.min(640 / w, 480 / h);
  //            const nW = w * ratio;
  //            const nH = h * ratio;
  //
  //            console.log('===============>');
  //            console.log(nW);
  //            console.log(nH);
  //
  //            ImageResizer.createResizedImage(response.uri, nW, nH, 'JPEG', 70)
  //              .then((resizeResponse) => {
  //                console.log(resizeResponse);
  //                setEventDetails((prevState) => {
  //                  return {
  //                    ...prevState,
  //                    photos: [
  //                      ...prevState.photos,
  //                      {
  //                        uri: resizeResponse.uri,
  //                        fileName: resizeResponse.fileName,
  //                      },
  //                    ],
  //                  };
  //                });
  //                // response.uri is the URI of the new image that can now be displayed, uploaded...
  //                // response.path is the path of the new image
  //                // response.name is the name of the new image with the extension
  //                // response.size is the size of the new image
  //              })
  //              .catch((err) => {
  //                // Oops, something went wrong. Check that the filename is correct and
  //                // inspect err to get more details.
  //                console.log(err);
  //              });
  //          },
  //          (error) => {
  //            console.log(error);
  //          },
  //        );
  //      }
  //    },
  //  );
  //};

  //const removeImage = (rIndex) => {
  //  // Remove
  //  setEventDetails((prevState) => {
  //    return {
  //      ...prevState,
  //      photos: [...prevState.photos.filter((m, index) => index !== rIndex)],
  //    };
  //  });
  //};

  /**************************************************
   * Submit Screen
   **************************************************/
  const submitScreen = async () => {
    // Validate required parameters
    let errorTitle = !eventDetails.title;
    setFormState((prevState) => {
      return {
        ...prevState,
        errorTitle,
      };
    });

    // Show error
    if (errorTitle) {
      Toast.show({
        text: 'Title is Required!',
        buttonText: 'Ok',
        buttonTextStyle: {color: '#008000'},
        buttonStyle: {backgroundColor: '#5cb85c'},
        duration: 8000,
      });
    } else {
      // Save the information
      setFormState((prevState) => {
        return {
          ...prevState,
          isLoading: true,
        };
      });

      // Read the token from the Key Chain
      const token = await JwtKeyChain.read();

      // Get the Start and End Date
      const eventDate = moment(
        eventDetails.day + ' ' + eventDetails.time,
        'dddd, DD MMMM, YYYY HH:mm',
      ).toDate();

      // Execute the save action
      if (eventDetails.id === null) {
        // Insert
        dispatch(
          createEvent(
            token,
            bootstrapState.circles[0].id,
            eventDetails.title,
            moment(eventDate).format('YYYY-MM-DD HH:mm:ss'),
            moment(eventDate).format('YYYY-MM-DD HH:mm:ss'),
            eventDetails.note,
            eventDetails.participants !== null &&
              eventDetails.participants.length > 0
              ? eventDetails.participants.map((p) => {
                  return p.id;
                })
              : null,
            eventDetails.photos != null && eventDetails.photos.length > 0
              ? eventDetails.photos.map((p) => {
                  return p.uri;
                })
              : null,
          ),
        );
      } else {
        // Update
        dispatch(
          updateEvent(
            token,
            bootstrapState.circles[0].id,
            eventDetails.id,
            eventDetails.title,
            moment(eventDate).format('YYYY-MM-DD HH:mm:ss'),
            moment(eventDate).format('YYYY-MM-DD HH:mm:ss'),
            eventDetails.note,
            eventDetails.participants !== null &&
              eventDetails.participants.length > 0
              ? eventDetails.participants.map((p) => {
                  return p.id;
                })
              : null,
            eventDetails.photos != null && eventDetails.photos.length > 0
              ? eventDetails.photos.map((p) => {
                  return p.uri;
                })
              : null,
          ),
        );
      }
    }
  };

  /**
   * Loading Data
   */
  useEffect(() => {
    // Load Members
    const loadMembers = async (id) => {
      // Read the token from the Key Chain
      const token = await JwtKeyChain.read();

      // Load the Events List
      dispatch(loadEventMembers(token, bootstrapState.circles[0].id, id));
    };

    // param from rout
    const {title, time, day, note, id} = route.params;

    // If has an ID is a Edit
    if (id) {
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
    }
  }, []);

  /**
   * Check if an error has occour or the insert was a complet success
   */
  useEffect(() => {
    // Has an error
    if (calendarState.isError) {
      // Save the information
      setFormState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
        };
      });

      // Show the error
      Toast.show({
        text: calendarState.error,
        buttonText: 'Ok',
        buttonTextStyle: {color: '#008000'},
        buttonStyle: {backgroundColor: '#5cb85c'},
        duration: 8000,
      });
    } else if (calendarState.eventId != null) {
      // Save the information
      setFormState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
        };
      });

      // Event was saved
      navigation.navigate('Calendar');
    } else if (calendarState.members !== null) {
      setEventDetails((prevState) => {
        return {
          ...prevState,
          participants: calendarState.members,
        };
      });
    }
  }, [calendarState, navigation]);

  /**************************************************
   * Render
   **************************************************/
  return (
    <Container>
      <Content padder>
        <Form>
          <Label>Title</Label>
          <Item regular error={formState.errorTitle}>
            <Input
              placeholder="Title"
              onChangeText={(val) => handleEventInputChange('title', val)}
              value={eventDetails.title}
            />
          </Item>
          <Label>Participants</Label>
          <List>
            <ListItem style={formBaseStyles.imagesListItem}>
              <Left>
                {eventDetails.id !== null &&
                eventDetails.participants === null ? (
                  <LoadingSmall />
                ) : eventDetails.participants !== null ? (
                  eventDetails.participants.map((member) => {
                    return (
                      <Thumbnail
                        small
                        source={{uri: member.photoUrl ? member.photoUrl : uri}}
                        style={formBaseStyles.imagesThumbnail}
                      />
                    );
                  })
                ) : null}
              </Left>
              <Right>
                <TouchableOpacity
                  onPress={participantsModalShow}
                  style={formBaseStyles.imagesButton}>
                  <Icon
                    ios="ios-add"
                    android="md-add"
                    style={formBaseStyles.imagesButtonIcon}
                  />
                </TouchableOpacity>
              </Right>
            </ListItem>
          </List>
          <Label>Time</Label>
          <TouchableOpacity
            onPress={() => dateTimePickerShow('time')}
            style={formBaseStyles.timeAndDate}>
            <Text>{eventDetails.time}</Text>
            <Icon ios="ios-arrow-round-down" android="md-arrow-dropdown" />
          </TouchableOpacity>
          <Label>Day</Label>
          <TouchableOpacity
            onPress={() => dateTimePickerShow('date')}
            style={formBaseStyles.timeAndDate}>
            <Text>{eventDetails.day}</Text>
            <Icon ios="ios-arrow-round-down" android="md-arrow-dropdown" />
          </TouchableOpacity>
          <Label>Note</Label>
          <Item regular>
            <Input
              placeholder="Your Note"
              onChangeText={(val) => handleEventInputChange('note', val)}
              value={eventDetails.note}
            />
          </Item>
        </Form>
        <Button full onPress={submitScreen}>
          <Text>{eventDetails.id !== null ? 'Save' : 'Create'}</Text>
        </Button>
      </Content>
      <FooterBase navigation={navigation} />
      {formState.dateTimePickerShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={moment(
            eventDetails.day + ' ' + eventDetails.time,
            'dddd, DD MMMM, YYYY HH:mm',
          ).toDate()}
          mode={formState.dateTimePickerMode}
          is24Hour={true}
          display="default"
          onChange={dateTimePickerModeOnChange}
        />
      )}
      <Modal
        animationType="slideInUp"
        isVisible={formState.participantsModalShow}
        onBackdropPress={participantsModalClose}>
        <View style={formBaseStyles.participantsModal}>
          <H1 style={formBaseStyles.participantsModalTitle}>Participants</H1>
          <List>
            {bootstrapState.circles[0].members.map((member) => {
              let iconAdd = ['ios-add-circle', 'md-add-circle'];
              let iconColor = '#60E36F';
              if (
                eventDetails.participants !== null &&
                eventDetails.participants
                  .map((m) => m.id)
                  .indexOf(member.id) !== -1
              ) {
                iconAdd = ['ios-remove-circle', 'md-remove-circle'];
                iconColor = '#C83232';
              }
              return (
                <ListItem avatar>
                  <Left>
                    <Thumbnail
                      small
                      source={{uri: member.photoUrl ? member.photoUrl : uri}}
                    />
                  </Left>
                  <Body>
                    <Text>
                      {member.userFirstName + ' ' + member.userLastName}
                    </Text>
                  </Body>
                  <Right style={formBaseStyles.participantsModalListItem}>
                    <Button
                      transparent
                      onPress={() => participantsModalToggleMember(member.id)}>
                      <Icon
                        ios={iconAdd[0]}
                        android={iconAdd[1]}
                        style={{color: iconColor}}
                      />
                    </Button>
                  </Right>
                </ListItem>
              );
            })}
          </List>
          <Button
            transparent
            onPress={participantsModalClose}
            style={formBaseStyles.participantsModalClose}
            small>
            <Text style={formBaseStyles.participantsModalCloseText}>Close</Text>
          </Button>
        </View>
      </Modal>
      <LoadingBig isVisible={formState.isLoading} Text="Saving..." />
    </Container>
  );
};

// Export
export default CalendarEventForm;
