/**
 * This component handles the Resend of the Validation Email
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React and React Native
import React from 'react';

// Native Base
import {List, ListItem, Text, Button} from 'native-base';

// Moment
import moment from 'moment';

// Layout
import LoadingSmall from '../../layout/loadingSmall/loadingSmall';

// Style
import {calendarBaseStyles} from './calendarStyle';

// Screen
const CalendarEventList = (props, navigation) => {
  const {events, handleShowEvent} = props;

  if (events !== null) {
    return (
      <List style={calendarBaseStyles.list}>
        {Object.keys(events)
          .sort((a, b) => moment(a, 'YYYY-MM-DD').diff(moment(b, 'YYYY-MM-DD')))
          .map((key) => {
            return (
              <>
                <ListItem itemDivider style={calendarBaseStyles.listItemHeader}>
                  <Text>
                    {moment.utc(`${key}`, 'YYYY-MM-DD').format('dddd DD MMMM')}
                  </Text>
                </ListItem>
                {events[key]
                  .sort((a, b) =>
                    moment.utc(a.startOn).diff(moment.utc(b.startOn)),
                  )
                  .map((e) => {
                    return (
                      <ListItem style={calendarBaseStyles.listItemHeader}>
                        <Button
                          bordered
                          onPress={() =>
                            handleShowEvent(
                              e.title,
                              moment.utc(e.startOn).format('HH:mm A'),
                              moment
                                .utc(e.startOn)
                                .format('dddd, DD MMMM, YYYY'),
                              e.note,
                              e.id,
                            )
                          }
                          style={calendarBaseStyles.listItemButton}>
                          <Text>{e.title}</Text>
                          <Text>{moment.utc(e.startOn).format('HH:mm A')}</Text>
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
    return <LoadingSmall />;
  }
};

// Export
export default CalendarEventList;
