import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../Screen/Home';
import Profile from '../../Screen/Profile';
import Appointments from '../../Screen/Appointments';
import Record from '../../Screen/Record';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Tab_Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // hide header globally for tabs
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 10,
        },
        tabBarActiveTintColor: '#0284c7',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <AntDesign color={color} name="home" size={25} />,
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarIcon: ({ color }) => <Feather color={color} name="calendar" size={25} />,
        }}
      />
      <Tab.Screen
        name="Record"
        component={Record}
        options={{
          tabBarIcon: ({ color }) => <Feather color={color} name="file-text" size={25} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <Ionicons color={color} name="people-outline" size={25} />,
        }}
      />
    </Tab.Navigator>
  );
}
