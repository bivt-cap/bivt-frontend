/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This component handles the Resend of the Validation Email
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */
// React and React Native
import React, {useEffect, useState} from 'react';

// React Native
import {TouchableOpacity} from 'react-native';

// Reux
import {useDispatch, useSelector} from 'react-redux';
import {loadEvents} from '../../../redux';

// Moment
import moment from 'moment';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

// Native Base
import {Container, Content, List, ListItem, Text, Button} from 'native-base';

// Calendar
import {Calendar} from 'react-native-calendars';

// Layout
import FooterBase from '../../layout/footerBase/FooterBase';

// Style
import {calendarBaseStyles} from './calendarStyle';

// Screen
const CalendarEvent = ({route, navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  // User and circle
  const bootstrapState = useSelector((state) => state.bootstrap);

  // Event
  const calendarState = useSelector((state) => state.calendarReducer);

  // State
  const [calendaDetails, setcalendaDetails] = useState({
    isLoading: false,
    currentDate: moment().toDate(),
    startOn: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
    endOn: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
    dates: null,
    events: null,
    needToLoad: false,
  });

  /**************************************************
   * On Load
   **************************************************/
  const loadData = async () => {
    // Show the loading information
    setcalendaDetails((prevState) => {
      return {
        ...prevState,
        isLoading: true,
        dates: null,
        events: null,
        needToLoad: false,
      };
    });

    // Read the token from the Key Chain
    const token = await JwtKeyChain.read();

    // Load the Events List
    dispatch(
      loadEvents(
        token,
        bootstrapState.circles[0].id,
        calendaDetails.startOn,
        calendaDetails.endOn,
      ),
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (calendarState.eventId !== null) {
      loadData();
    }
  }, [calendarState.eventId]);

  useEffect(() => {
    let dates = null;
    let events = null;

    // Format the events
    if (calendarState.events !== null && calendarState.events.length > 0) {
      // Dates
      dates = calendarState.events
        .map((e) => {
          return moment(e.startOn).format('YYYY-MM-DD');
        })
        .reduce(
          (a, b) => (
            (a[b] = {
              marked: true,
              dotColor: '#CA60E3',
            }),
            a
          ),
          {},
        );
      // Events
      events = calendarState.events.reduce((r, a) => {
        r[moment(a.startOn).format('YYYY-MM-DD')] = [
          ...(r[moment(a.startOn).format('YYYY-MM-DD')] || []),
          a,
        ];
        return r;
      }, {});
    }

    // Show the loading information
    setcalendaDetails((prevState) => {
      return {
        ...prevState,
        isLoading: false,
        needToLoad: false,
        dates,
        events,
      };
    });
  }, [calendarState.events]);

  useEffect(() => {
    if (calendaDetails.needToLoad) {
      loadData();
    }
  }, [calendaDetails.needToLoad]);

  /**************************************************
   * Add a new Event
   **************************************************/
  const handleAddButtonClick = () => {
    navigation.navigate('CalendarEventForm', {
      title: null,
      datetime: null,
      note: null,
      id: null,
    });
  };

  /**************************************************
   * Add a new Event
   **************************************************/
  const handleShowEventButtonClick = (title, datetime, note, id) => {
    navigation.navigate('CalendarEventForm', {
      title,
      datetime,
      note,
      id,
    });
  };

  /**************************************************
   * Calendar Events
   **************************************************/
  const handleMonthChange = (month) => {
    console.log('handleMonthChange');
    // Show the loading information
    setcalendaDetails((prevState) => {
      return {
        ...prevState,
        currentDate: moment(month, 'YYYY-MM-DD').toDate(),
        startOn: moment(month, 'YYYY-MM-DD')
          .startOf('month')
          .format('YYYY-MM-DD HH:mm:ss'),
        endOn: moment(month, 'YYYY-MM-DD')
          .endOf('month')
          .format('YYYY-MM-DD HH:mm:ss'),
        needToLoad: true,
      };
    });
  };

  return (
    <Container>
      <Calendar
        current={calendaDetails.currentDate}
        markedDates={calendaDetails.dates}
        onMonthChange={(month) => handleMonthChange(month.dateString)}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
          arrowColor: '#CA60E3',
          todayTextColor: '#CA60E3',
          dotColor: '#CA60E3',
          selectedDotColor: '#CA60E3',
          indicatorColor: '#CA60E3',
        }}
        style={calendarBaseStyles.calendar}
      />
      <Content style={calendarBaseStyles.content}>
        <CalendarEvents
          events={calendaDetails.events}
          handleShowEvent={handleShowEventButtonClick}
        />
      </Content>
      <FooterBase navigation={navigation} handleAdd={handleAddButtonClick} />
    </Container>
  );
};

const CalendarEvents = (props, navigation) => {
  if (props.events !== null) {
    return (
      <List style={calendarBaseStyles.list}>
        {Object.keys(props.events)
          .sort((a, b) => moment(a, 'YYYY-MM-DD').diff(moment(b, 'YYYY-MM-DD')))
          .map((key) => {
            return (
              <>
                <ListItem itemDivider style={calendarBaseStyles.listItemHeader}>
                  <Text>
                    {moment(`${key}`, 'YYYY-MM-DD').format('dddd DD MMMM')}
                  </Text>
                </ListItem>
                {props.events[key]
                  .sort((a, b) => moment(a.startOn).diff(moment(b.startOn)))
                  .map((e) => {
                    return (
                      <ListItem
                        style={{
                          paddingBottom: 0,
                          paddingLeft: 0,
                          paddingRight: 0,
                          paddingTop: 0,
                          marginBottom: 10,
                        }}>
                        <Button
                          bordered
                          block
                          onPress={() =>
                            props.handleShowButtonClick({
                              title: e.title,
                              datetime: moment(e.startOn).toDate(),
                              note: e.note,
                              id: e.id,
                            })
                          }
                          style={{width: '100%'}}>
                          <Text>{e.title}</Text>
                          <Text>{moment(e.startOn).format('HH:mm A')}</Text>
                        </Button>
                      </ListItem>
                    );
                  })}
              </>
            );
          })}
      </List>
    );
  } else {
    return null;
  }
};

// Export
export default CalendarEvent;
