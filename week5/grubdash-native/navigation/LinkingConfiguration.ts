/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const config: LinkingOptions = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Cuisine: {
            screens: {
              CuisineScreen: 'cuisine',
              RestaurantsScreen: 'restaurants',
            },
          },
          Profile: {
            screens: {
              LoginScreen: 'login',
              RegisterScreen: 'register'
            },
          },
        },
      },
      ItemView: {
        screens: {
          ItemView: 'item',
        },
      },
      NotFound: '*',
    },
  },
};

export default config;