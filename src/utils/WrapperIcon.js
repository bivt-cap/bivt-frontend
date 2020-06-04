/**
 * This component helps to use icons from multiple sources
 * reference : https://github.com/GeekyAnts/NativeBase/issues/929
 * icos reference: https://oblador.github.io/react-native-vector-icons/
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
import React from 'react';
import {Icon, StyleProvider} from 'native-base';
import getTheme from '../../native-base-theme/components';

const WrapperIcon = (props) => {
  return (
    <StyleProvider style={getTheme({iconFamily: props.family})}>
      <Icon {...props} />
    </StyleProvider>
  );
};

export default WrapperIcon;
