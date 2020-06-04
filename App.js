import React from 'react';
import 'react-native-gesture-handler';
import Signup from './src/components/authentication/signup/Signup';
import DashBoard from './src/components/dashboard/dashBoard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Login from './src/components/authentication/login/Login';
import CreateCircle from './src/components/circle/createCircle/CreateCircle';
import InviteToCircle from './src/components/circle/inviteToCircle/InviteToCircle';
import TodoList from './src/components/todoList/TodoList';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Signup">
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
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
          {/* <Stack.Screen name="To-do list" component={TodoList} /> */}
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
