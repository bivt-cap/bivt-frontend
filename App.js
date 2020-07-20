// React and React Native
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';

// Redux
import {useSelector} from 'react-redux';

// React Navigation
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

// Native Splash Screen
import SplashScreen from 'react-native-splash-screen';

// Native Base
import {Root, Button, Icon, Text} from 'native-base';

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
import CalendarEvent from './src/components/plugins/calendarEvent/CalendarEvent';
import CalendarEventForm from './src/components/plugins/calendarEvent/CalendarEventForm';
import CalendarEventView from './src/components/plugins/calendarEvent/CalendarEventView';
import GroceryList from './src/components/plugins/groceryList/GroceryList';
import PollingList from './src/components/plugins/polling/PollingList';
import AddPolling from './src/components/plugins/polling/AddPolling';
import PollingDetail from './src/components/plugins/polling/PollingDetail';
import PollingGraph from './src/components/plugins/polling/PollingGraph';
import Settings from './src/components/dashboard/Settings/Settings';
import ProfileSetting from './src/components/dashboard/Settings/ProfileSetting';
import GroupSetting from './src/components/dashboard/Settings/GroupSetting';
import AddRemovePlugin from './src/components/managePlugin/addRemovePlugin/AddRemovePlugin';
import ExpenseManagerAnalytics from './src/components/plugins/expenseManager/ExpenseManagerAnalytics';

// Navigator
const Stack = createStackNavigator();

// Disable
console.disableYellowBox = true;

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
    <Root>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          dark: false,
          colors: {
            ...DefaultTheme.colors,
            primary: 'rgb(255,255,255)',
            background: 'rgb(165,59,186)',
            card: 'rgb(165,59,186)',
            text: 'rgb(255,255,255)',
            border: 'rgb(165,59,186)',
          },
        }}>
        <Stack.Navigator
          initialRouteName={bootstrapState.initialRouteName}
          screenOptions={{
            headerTitleStyle: {
              fontFamily: 'Roboto',
              fontSize: 24,
              marginTop: 5,
            },
            headerTitleAlign: 'center',
          }}>
          {bootstrapState.isSignedIn ? (
            <>
              <Stack.Screen
                name="CreateCircle"
                component={CreateCircle}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ChoosePlugins"
                component={ChoosePlugins}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AddRemovePlugin"
                component={AddRemovePlugin}
                options={{
                  title: 'Choose Plugins',
                }}
              />
              <Stack.Screen
                name="InviteToCircle"
                component={InviteToCircle}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="ApproveCircle" component={ApproveCircle} />
              <Stack.Screen
                name="DashBoard"
                component={DashBoard}
                options={{
                  title: 'DashBoard',
                  headerLeft: null,
                  headerRight: null,
                }}
              />
              <Stack.Screen
                name="Calendar"
                options={({navigation, route}) => ({
                  title: 'Calendar',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      onPress={() => navigation.navigate('DashBoard')}
                    />
                  ),
                  headerRight: null,
                })}
                component={CalendarEvent}
              />
              <Stack.Screen
                name="CalendarEventForm"
                options={{
                  title: 'Create an Event',
                }}
                component={CalendarEventForm}
              />
              <Stack.Screen
                name="CalendarEventView"
                options={{
                  title: 'Event View',
                }}
                component={CalendarEventView}
              />
              <Stack.Screen
                name="TodoList"
                options={{
                  title: 'To-do List',
                }}
                component={TodoList}
              />
              <Stack.Screen
                name="GroceryList"
                options={{
                  title: 'Grocery List',
                }}
                component={GroceryList}
              />
              <Stack.Screen
                name="TrackUser"
                component={TrackUser}
                options={{
                  title: 'Tracking',
                }}
              />
              <Stack.Screen
                name="Polling"
                component={PollingList}
                options={{
                  title: 'Polling Questions',
                }}
              />
              <Stack.Screen
                name="AddPolling"
                options={{
                  title: 'New Question',
                }}
                component={AddPolling}
              />
              <Stack.Screen
                name="PollingDetail"
                options={{
                  title: 'Answer',
                }}
                component={PollingDetail}
              />
              <Stack.Screen
                name="PollingGraph"
                options={{
                  title: 'Answer',
                  headerLeft: null,
                }}
                component={PollingGraph}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                  title: 'Messages',
                }}
              />
              <Stack.Screen
                name="ExpenseManager"
                component={ExpenseManager}
                options={{
                  title: 'Expenses',
                }}
              />
              <Stack.Screen
                name="Analytics"
                component={ExpenseManagerAnalytics}
                options={{
                  title: 'Budget Analytics',
                }}
              />
              <Stack.Screen
                name="Settings"
                options={{
                  title: 'Settings',
                }}
                component={Settings}
              />
              <Stack.Screen
                name="ProfileSetting"
                options={{
                  title: 'Profile',
                  headerRight: () => (
                    <Button transparent>
                      <Icon style={{color: '#fff'}} name="create" />
                    </Button>
                  ),
                }}
                component={ProfileSetting}
              />
              <Stack.Screen
                name="GroupSetting"
                component={GroupSetting}
                options={{
                  title: 'Group',
                  headerRight: () => (
                    <Button transparent>
                      <Icon style={{color: '#fff'}} name="create" />
                    </Button>
                  ),
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
