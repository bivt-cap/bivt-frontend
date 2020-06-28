/**
 * Header Extra Large With Logo
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React
import React from 'react';

// React Native
import {StyleSheet, Dimensions} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {deleteJTWFromKeyChain, resetBootstrap} from '../../../redux';
import {GoogleSignin} from '@react-native-community/google-signin';

// Natibe Base
import {Footer, FooterTab, Button, Icon} from 'native-base';

// Style
const footerBaseStyles = StyleSheet.create({
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
});

// Component
const FooterBase = (props) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  const userData = useSelector((state) => state.login);

  // Logout Handler
  const handleLogoutButtonClick = async () => {
    try {
      //If user authenticate with google oAuth
      if (userData.googleisLoggedin === 'True') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        userData.googleisLoggedin = 'False';
      } else if (userData.isLoggedin === 'True') {
        userData.isLoggedin = 'False';
        userData.loginDetails = '';
      }
      deleteJTWFromKeyChain();
      dispatch(resetBootstrap());
      props.navigation.navigate('Bootstrap');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Footer>
      <FooterTab>
        <Button>
          <Icon ios="ios-apps" android="md-apps" />
        </Button>
        <Button>
          <Icon ios="ios-cog" android="md-cog" />
        </Button>
        <Button onPress={() => handleLogoutButtonClick()}>
          <Icon ios="ios-exit" android="md-exit" />
        </Button>
      </FooterTab>
    </Footer>
  );
};

// Export
export default FooterBase;
