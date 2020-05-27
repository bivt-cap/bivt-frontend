import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import Signup from './src/components/authentication/signup/Signup';
import DashBoard from './src/components/dashboard/dashBoard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Login from './src/components/authentication/login/Login';
import ForgotPassword from './src/components/authentication/forgotPassword/ForgotPassword';
import CreateCircle from './src/components/circle/createCircle/CreateCircle';
import InviteToCircle from './src/components/circle/inviteToCircle/InviteToCircle';
import SplashScreen from 'react-native-splash-screen';
import Chat from './src/components/plugins/chat/Chat';
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="CreateCircle"
            component={CreateCircle}
            options={{
              title: 'Lets create a perfect circle for you',
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="InviteToCircle"
            component={InviteToCircle}
            options={{
              title: 'Invite people to join your group',
              headerLeft: null,
            }}
          />
          <Stack.Screen name="DashBoard" component={DashBoard} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: 'Forgot Password',
              headerLeft: null,
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
