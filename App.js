import React from 'react';
import Signup from './src/components/authentication/signup/Signup';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Signup />
    </Provider>
  );
};

export default App;
