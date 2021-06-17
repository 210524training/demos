import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../components/pages/home-page/HomePage';
import AllRestaurantsPage from '../components/pages/all-restaurants-page/AllRestaurantsPage';
import RegisterPage from '../components/pages/register-page/RegisterPage';
import LoginPage from '../components/pages/login-page/LoginPage';

const AppRoutes: React.FC<unknown> = (props) => {

  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route exact path='/restaurants'>
        <AllRestaurantsPage />
      </Route>
      <Route path='/register'>
        <RegisterPage />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};

export default AppRoutes;