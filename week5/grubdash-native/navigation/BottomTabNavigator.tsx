/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, HomeParamList, CuisineParamList, ProfileParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Cuisine"
        component={CuisineNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="pizza-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

export const headerStyle = {
  backgroundColor: "powderblue",
}

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'GrubDash', headerStyle: headerStyle }}
      />
    </HomeStack.Navigator>
  );
}

const CuisineStack = createStackNavigator<CuisineParamList>();

function CuisineNavigator() {
  return (
    <CuisineStack.Navigator>
      <CuisineStack.Screen
        name="CuisineScreen"
        component={CuisineScreen}
        options={{ headerTitle: 'Cuisines' }}
      />
      <CuisineStack.Screen
        name="RestaurantsScreen"
        component={RestaurantsScreen}
        options={{ headerTitle: 'Restaurants' }}
      />
    </CuisineStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: 'Login' }}
      />
      <ProfileStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerTitle: 'Register' }}
      />
    </ProfileStack.Navigator>
  );
}
