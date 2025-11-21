import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Home from '../../Screen/Home';
import Profile from '../../Screen/Profile';
import Appointments from '../../Screen/Appointments';
import Record from '../../Screen/Record';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../utils/theme';

const HomeIcon = ({ color }) => <AntDesign color={color} name="home" size={24} />;
const AppointmentsIcon = ({ color }) => <Feather color={color} name="calendar" size={24} />;
const RecordIcon = ({ color }) => <Feather color={color} name="file-text" size={24} />;
const ProfileIcon = ({ color }) => <Ionicons color={color} name="people-outline" size={24} />;

const Tab = createBottomTabNavigator();

export default function Tab_Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          borderTopWidth: 1,
          borderTopColor: colors.glass.border,
          backgroundColor: colors.background.secondary,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          position: 'absolute',
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 0,
          shadowColor: 'transparent',
        },
        tabBarActiveTintColor: colors.accent.cyan,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarIcon: AppointmentsIcon,
        }}
      />
      <Tab.Screen
        name="Record"
        component={Record}
        options={{
          tabBarIcon: RecordIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}
