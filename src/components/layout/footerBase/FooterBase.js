/**
 * Header Extra Large With Logo
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React
import React from 'react';

// React Native
import {StyleSheet, Dimensions, Image, TouchableHighlight} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {deleteJTWFromKeyChain, resetBootstrap} from '../../../redux';
import {GoogleSignin} from '@react-native-community/google-signin';

// Natibe Base
import {Footer, FooterTab, Button, Icon, Thumbnail} from 'native-base';

// Style
const footerBaseStyles = StyleSheet.create({
  footer: {},
  icon: {
    fontSize: 50,
  },
  iconDisabled: {
    color: '#B5B5B5',
  },
  buttonAdd: {
    position: 'relative',
    marginTop: -20,
  },
  iconAdd: {
    padding: 28,
    color: '#FFF',
    backgroundColor: '#CA60E3',
  },
});

// Component
const FooterBase = (props) => {
  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);

  return (
    <Footer style={footerBaseStyles.footer}>
      <FooterTab>
        <Button onPress={() => props.navigation.navigate('DashBoard')}>
          <Thumbnail
            square
            small
            source={require('../../../assets/icons/dashboard.png')}
          />
        </Button>
        {props.handleAdd ? (
          <Button
            onPress={() => props.handleAdd()}
            style={footerBaseStyles.buttonAdd}>
            <Thumbnail
              square
              source={require('../../../assets/icons/add(nav).png')}
            />
          </Button>
        ) : null}
        <Button
          onPress={() =>
            props.navigation.navigate('Settings', {
              userInfo: bootstrapState.user,
            })
          }>
          <Thumbnail
            square
            small
            source={require('../../../assets/icons/settings.png')}
          />
        </Button>
      </FooterTab>
    </Footer>
  );
};

/*
<Icon
  ios="ios-apps"
  android="md-apps"
  style={footerBaseStyles.icon}
/>

<Icon ios="ios-cog" android="md-cog" style={getSettingsButnStyle()} />

onPress={() =>
            props.handleSettings ? props.handleSettings() : null
          }
*/

// Export
export default FooterBase;
