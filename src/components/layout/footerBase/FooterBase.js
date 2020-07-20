/**
 * Footer toolbar
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// React
import React from 'react';

// React Native
import {StyleSheet} from 'react-native';

// Redux
import {useSelector} from 'react-redux';

// Natibe Base
import {Footer, FooterTab, Button} from 'native-base';

// SVG Icons
import AddNavIcon from '../../../utils/svgIcon/AddNavIcon';
import DashboardIcon from '../../../utils/svgIcon/DashboardIcon';
import SettingsIcon from '../../../utils/svgIcon/SettingsIcon';

// Style
const footerBaseStyles = StyleSheet.create({
  footer: {},
  buttonAdd: {
    position: 'relative',
    marginTop: -20,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

// Component
const FooterBase = (props) => {
  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);

  return (
    <Footer style={footerBaseStyles.footer}>
      <FooterTab>
        <Button
          onPress={() => {
            props.navigation.navigate('GroupSetting', {
              circleInfo: bootstrapState.circles[0],
            });
          }}>
          <DashboardIcon disabled={props.isDashboard} />
        </Button>
        {props.handleAdd ? (
          <Button
            onPress={() => props.handleAdd()}
            style={footerBaseStyles.buttonAdd}>
            <AddNavIcon />
          </Button>
        ) : null}
        <Button
          onPress={() =>
            props.isDashboard
              ? props.navigation.navigate('Settings', {
                  userInfo: bootstrapState.user,
                })
              : props.handleSettingsBtn
              ? props.handleSettingsBtn()
              : null
          }>
          <SettingsIcon
            disabled={
              props.isDashboard ? false : props.handleSettingsBtn ? false : true
            }
          />
        </Button>
      </FooterTab>
    </Footer>
  );
};

// Export
export default FooterBase;
