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
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import Login from '../screens/Login';
import Restaurants from '../screens/Cuisines';
import { BottomTabParamList, CuisineParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="GrubDash"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, keyboardHidesTabBar: true }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home-outline" color={"#262633"} />,
        }}
      />
      <BottomTab.Screen
        name="Cuisine"
        component={RestaurantNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="pizza-outline" color={"#262633"} />,
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={"#262633"} />,
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
const TabOneStack = createStackNavigator<TabOneParamList>();

const headerStyle = {
  backgroundColor: "powderblue",
}

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'GrubDash', headerStyle: headerStyle }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: 'Login', headerStyle: headerStyle }}
      />
    </TabTwoStack.Navigator>
  );
}

const CuisineStack = createStackNavigator<CuisineParamList>();

function RestaurantNavigator() {
  return (
    <CuisineStack.Navigator>
      <CuisineStack.Screen
        name="Cuisine"
        component={Restaurants}
        options={{ headerTitle: 'Cuisine', headerStyle: headerStyle }}
      />
    </CuisineStack.Navigator>
  );
}
