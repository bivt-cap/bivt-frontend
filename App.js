// React and React Native
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';

// Redux
import {useSelector} from 'react-redux';

// React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Native Splash Screen
import SplashScreen from 'react-native-splash-screen';

// Screens
import Bootstrap from './src/components/authentication/bootstrap/Bootstrap';
import Login from './src/components/authentication/login/Login';
import Signup from './src/components/authentication/signup/Signup';
import SignupFeedback from './src/components/authentication/signup/SignupFeedback';
import ForgotPassword from './src/components/authentication/forgotPassword/ForgotPassword';

// Screens - Signed In
import DashBoard from './src/components/dashboard/dashBoard';
import ApproveCircle from './src/components/circle/approveCircle/ApproveCircle';
import CreateCircle from './src/components/circle/createCircle/CreateCircle';
import InviteToCircle from './src/components/circle/inviteToCircle/InviteToCircle';

// Native Base
//import {Container, Text} from 'native-base';

// React Navigation - Create a Stack Navigator
const Stack = createStackNavigator();

// Main
const App = () => {
  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);

  // Effect Hook - Run only in the first-time
  useEffect(() => {
    // Hide the native splash screen
    SplashScreen.hide();
  }, []);

  // Check if the Boostrap process is over
  if (bootstrapState.isLoading) {
    return <Bootstrap />;
  }

  // Check if the user is Signed In
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={bootstrapState.initialRouteName}>
        {bootstrapState.isSignedIn ? (
          <>
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
            <Stack.Screen name="ApproveCircle" component={ApproveCircle} />
            <Stack.Screen name="DashBoard" component={DashBoard} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignUp" component={Signup} />
            <Stack.Screen
              name="SignupFeedback"
              component={SignupFeedback}
              options={{
                headerLeft: null,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerLeft: null,
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                title: 'Forgot Password',
                headerLeft: null,
              }}
            />
          </>
        )}
        <Stack.Screen
          name="Bootstrap"
          component={Bootstrap}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
