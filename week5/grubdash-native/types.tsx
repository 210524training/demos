/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  ItemView: undefined;
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
  RestaurantsScreen: undefined;
};

export type ProfileParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
}