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

// Native Base
import {Root} from 'native-base';

// Screens
import Bootstrap from './src/components/authentication/bootstrap/Bootstrap';
import Login from './src/components/authentication/login/Login';
import Signup from './src/components/authentication/signup/Signup';
import SignupFeedback from './src/components/authentication/signup/SignupFeedback';
import ForgotPassword from './src/components/authentication/forgotPassword/ForgotPassword';
import ResendValidationEmail from './src/components/authentication/resendValidationEmail/ResendValidationEmail';

// Screens - Signed In
import DashBoard from './src/components/dashboard/DashBoard';
import ApproveCircle from './src/components/circle/approveCircle/ApproveCircle';
import CreateCircle from './src/components/circle/createCircle/CreateCircle';
import InviteToCircle from './src/components/circle/inviteToCircle/InviteToCircle';
import TodoList from './src/components/plugins/todoList/TodoList';
import ChoosePlugins from './src/components/managePlugin/choosePlugin/ChoosePlugin';
import ExpenseManager from './src/components/plugins/expenseManager/ExpenseManager';
import Chat from './src/components/plugins/chat/Chat';
import TrackUser from './src/components/plugins/trackUser/TrackUser';

// Navigator
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

  // Cutomize NavigationContainer Header Theme
  //const ncTheme = {
  //  ...DefaultTheme,
  //  dark: false,
  //  colors: {
  //    ...DefaultTheme.colors,
  //    primary: 'rgb(165,59,186)',
  //    background: 'rgb(165,59,186)',
  //    card: 'rgb(165,59,186)',
  //    text: 'rgb(255,255,255)',
  //    border: 'rgb(165,59,186)',
  //  },
  //};

  //const ncScreenOptions = {
  //  headerStyle: {
  //    display: 'flex',
  //    flexDirection: 'row',
  //    justifyContent: 'center',
  //  },
  //  headerTitleStyle: {
  //    fontFamily: 'Roboto',
  //    fontSize: 24,
  //    marginTop: 5,
  //    alignSelf: 'center',
  //  },
  //};

  // Check if the user is Signed In
  return (
    <Root>
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
                name="ChoosePlugins"
                component={ChoosePlugins}
                options={{
                  title: 'Select best plugins for you:',
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
              <Stack.Screen
                name="DashBoard"
                component={DashBoard}
                options={{
                  title: 'DashBoard',
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="TodoList"
                options={{
                  title: 'Todo List',
                  headerLeft: null,
                }}
                component={TodoList}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="TrackUser"
                component={TrackUser}
                options={{
                  title: 'Maps',
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="ExpenseManager"
                component={ExpenseManager}
                options={{
                  title: 'Manage your expenses',
                  headerLeft: null,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignUp"
                component={Signup}
                options={{
                  headerShown: false,
                }}
              />
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
                  headerShown: false,
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
              <Stack.Screen
                name="ResendValidationEmail"
                component={ResendValidationEmail}
                options={{
                  title: 'Resend Validation Email',
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="ExpenseManager"
                component={ExpenseManager}
                options={{
                  title: 'Manage your expenses',
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
    </Root>
  );
};

export default App;
