/**
 * Header Extra Large With Logo
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React
import React from 'react';

// React Native
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

// Natibe Base
import {Card, CardItem, Text, Icon, Button} from 'native-base';

// SVG Icons
import CalendarIcon from '../../../utils/svgIcon/plugin/CalendarIcon';
import ExpensesIcon from '../../../utils/svgIcon/plugin/ExpensesIcon';
import GroceryIcon from '../../../utils/svgIcon/plugin/GroceryIcon';
import MessagesIcon from '../../../utils/svgIcon/plugin/MessagesIcon';
import PollingIcon from '../../../utils/svgIcon/plugin/PollingIcon';
import TodoIcon from '../../../utils/svgIcon/plugin/TodoIcon';
import TrackingIcon from '../../../utils/svgIcon/plugin/TrackingIcon';
import StartIcon from '../../../utils/svgIcon/StartIcon';

// Style
const pluginButtonStyles = StyleSheet.create({
  touchableOpacity: {
    width: Dimensions.get('window').width / 2 - 20,
  },
  cardItem: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    paddingBottom: 40,
  },
  text: {
    textAlign: 'left',
    width: '100%',
    marginTop: 15,
    marginBottom: 30,
  },
  icon: {
    fontSize: 30,
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  iconNotFree: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  btnSelected: {
    backgroundColor: '#B5B5B5',
  },
});

// Component
const PluginButton = (props) => {
  const getIcon = (pluginId) => {
    switch (pluginId) {
      case 1:
        return <CalendarIcon />;
      case 2:
        return <TodoIcon />;
      case 3:
        return <GroceryIcon />;
      case 4:
        return <TrackingIcon />;
      case 5:
        return <PollingIcon />;
      case 6:
        return <MessagesIcon />;
      case 7:
        return <ExpensesIcon />;
    }
  };

  const getName = (pluginId) => {
    let name = '';
    switch (pluginId) {
      case 1:
        name = 'Calendar';
        break;
      case 2:
        name = 'To-do List';
        break;
      case 3:
        name = 'Grocery List';
        break;
      case 4:
        name = 'Tracking';
        break;
      case 5:
        name = 'Polling';
        break;
      case 6:
        name = 'Messages';
        break;
      case 7:
        name = 'Expenses';
        break;
      default:
        name = 'Error';
        break;
    }
    return name;
  };

  const getIconFree = (pluginId) => {
    if (pluginId === 4 || pluginId === 6 || pluginId === 7) {
      return <StartIcon style={pluginButtonStyles.iconNotFree} />;
    }
  };

  return (
    <TouchableOpacity
      onPress={props.eventHandler}
      style={pluginButtonStyles.touchableOpacity}>
      <Card pointerEvents="none">
        <CardItem cardBody style={pluginButtonStyles.cardItem}>
          <Text style={pluginButtonStyles.text}>{getName(props.pluginId)}</Text>
          {getIcon(props.pluginId)}
          {getIconFree(props.pluginId)}
        </CardItem>
        {props.showSelected ? (
          <Button
            block
            style={props.isSelected ? pluginButtonStyles.btnSelected : null}>
            <Text>{props.isSelected ? 'REMOVE' : 'ADD'}</Text>
          </Button>
        ) : null}
      </Card>
    </TouchableOpacity>
  );
};

/*
<Icon
          ios="ios-star-outline"
          android="md-star-outline"
          style={pluginButtonStyles.iconNotFree}
        />
<Icon
            ios={iconIOS}
            android={iconAndroid}
            style={{...pluginButtonStyles.icon, borderColor: color, color}}
          />
*/

// Export
export default PluginButton;
