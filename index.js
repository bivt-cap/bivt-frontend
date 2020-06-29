// React
import React from 'react';

// React Native
import {AppRegistry} from 'react-native';

// Native Base
import {StyleProvider} from 'native-base';

// Native Base Theme
import getTheme from './native-base-theme/components';
import kovan from './native-base-theme/variables/kovan';

// APP
import App from './App';
import {name as appName} from './app.json';

// Redux
import {Provider} from 'react-redux';
import store from './src/redux/store';

const Root = () => (
  <Provider store={store}>
    <StyleProvider style={getTheme(kovan)}>
      <App />
    </StyleProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
