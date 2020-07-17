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
import {Footer, FooterTab, Button, Icon} from 'native-base';

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
    marginTop: -15,
  },
  iconAdd: {
    padding: 28,
    color: '#FFF',
    backgroundColor: '#CA60E3',
  },
});

// Component
const FooterBase = (props) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  const userData = useSelector((state) => state.login);
  const bootstrapState = useSelector((state) => state.bootstrap);
  // // Logout Handler
  // const handleLogoutButtonClick = async () => {
  //   try {
  //     //If user authenticate with google oAuth
  //     if (userData.googleisLoggedin === 'True') {
  //       await GoogleSignin.revokeAccess();
  //       await GoogleSignin.signOut();
  //       userData.googleisLoggedin = 'False';
  //     } else if (userData.isLoggedin === 'True') {
  //       userData.isLoggedin = 'False';
  //       userData.loginDetails = '';
  //     }
  //     deleteJTWFromKeyChain();
  //     dispatch(resetBootstrap());
  //     props.navigation.navigate('Bootstrap');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getSettingsButnStyle = () => {
    // Se tem uma acao para executar
    if (props.handleSettings) {
      return {
        ...footerBaseStyles.icon,
      };
    } else {
      return {
        ...footerBaseStyles.icon,
        ...footerBaseStyles.iconDisabled,
      };
    }
  };

  return (
    <Footer style={footerBaseStyles.footer}>
      <FooterTab>
        <Button>
          <Icon
            ios="ios-apps"
            android="md-apps"
            style={footerBaseStyles.icon}
          />
        </Button>
        {props.handleAdd ? (
          <Button onPress={() => props.handleAdd()}>
            <Icon
              ios="ios-add-circle"
              android="md-add-circle"
              style={footerBaseStyles.icon}
            />
          </Button>
        ) : null}
        <Button
          // onPress={() =>
          //   props.handleSettings ? props.handleSettings() : null
          // }
          onPress={() =>
            props.navigation.navigate('Settings', {
              userInfo: bootstrapState.user,
            })
          }>
          <Icon ios="ios-cog" android="md-cog" style={getSettingsButnStyle()} />
        </Button>
      </FooterTab>
    </Footer>
  );
};

// Export
export default FooterBase;
