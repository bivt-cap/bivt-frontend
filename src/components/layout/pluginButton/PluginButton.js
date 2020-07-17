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

// Style
const pluginButtonStyles = StyleSheet.create({
  touchableOpacity: {
    width: Dimensions.get('window').width / 2 - 20,
  },
  cardItem: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
  },
  text: {
    textAlign: 'left',
    width: '100%',
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
    fontSize: 30,
    width: 30,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#E3E360',
    position: 'absolute',
    top: 0,
    right: 10,
  },
  btnSelected: {
    backgroundColor: '#B5B5B5',
  },
});

// Component
const PluginButton = (props) => {
  let iconIOS = '';
  let iconAndroid = '';
  let name = '';
  let notFree = false;
  let color = 'red';

  //ios-star-outline
  //md-star-outline

  //Ionicons

  switch (props.pluginId) {
    case 1:
      iconIOS = 'ios-calendar';
      iconAndroid = 'md-calendar';
      name = 'Calendar';
      color = '#673BBA';
      break;
    case 2:
      iconIOS = 'ios-list-box';
      iconAndroid = 'md-list-box';
      name = 'To-do List';
      color = '#3BBAB5';
      break;
    case 3:
      iconIOS = 'ios-basket';
      iconAndroid = 'md-basket';
      name = 'Grocery List';
      color = '#ECF42D';
      break;
    case 4:
      iconIOS = 'ios-pin';
      iconAndroid = 'md-pin';
      name = 'Tracking';
      color = '#BA3B3B';
      notFree = true;
      break;
    case 5:
      iconIOS = 'ios-stats';
      iconAndroid = 'md-stats';
      name = 'Polling';
      color = '#3BBAB5';
      break;
    case 6:
      iconIOS = 'ios-chatboxes';
      iconAndroid = 'md-chatboxes';
      name = 'Messages';
      color = '#3BBA53';
      notFree = true;
      break;
    case 7:
      iconIOS = 'ios-wallet';
      iconAndroid = 'md-wallet';
      name = 'Expenses';
      color = '#BA3B89';
      notFree = true;
      break;
    default:
      iconIOS = 'ios-close-circle';
      iconAndroid = 'md-close-circle';
      name = 'Error';
      color = 'red';
      break;
  }

  return (
    <TouchableOpacity
      onPress={props.eventHandler}
      style={pluginButtonStyles.touchableOpacity}>
      <Card pointerEvents="none">
        <CardItem cardBody style={pluginButtonStyles.cardItem}>
          <Text style={pluginButtonStyles.text}>{name}</Text>
          <Icon
            ios={iconIOS}
            android={iconAndroid}
            style={{...pluginButtonStyles.icon, borderColor: color, color}}
          />
          {notFree ? (
            <Icon
              ios="ios-star-outline"
              android="md-star-outline"
              style={pluginButtonStyles.iconNotFree}
            />
          ) : null}
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

// Export
export default PluginButton;
