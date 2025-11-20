import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../../Screen/Welcome';
import Login from '../../Screen/Login';
import Signup from '../../Screen/Signup';
import Home from '../../Screen/Home';
import Record from '../../Screen/Record';
import Profile from '../../Screen/Profile';
import Tab_Navigation from './Tab_Navigation';
import Bookvisit from '../../Screen/Bookvisit';
import Confirm from '../../Screen/Confirm';
import FAQScreen from '../../Screen/FAQScreen';
import Appointments from '../../Screen/Appointments';

const Stack = createStackNavigator();

export default function App_Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="Tabs" component={Tab_Navigation} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="Record" component={Record} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Bookvisit" component={Bookvisit} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
    </Stack.Navigator>
  );
}