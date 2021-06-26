/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import Restaurant from "./models/restaurant";
import { Cuisine } from "./screens/CuisineScreen";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  ItemView: {
    restaurant: Restaurant;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Cuisine: undefined;
  Profile: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type CuisineParamList = {
  CuisineScreen: undefined;
  RestaurantsScreen: {
    cuisine: Cuisine;
  };
};

export type ProfileParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
}