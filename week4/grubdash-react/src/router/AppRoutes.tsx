import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../home-page/HomePage';
import AllRestaurantsPage from '../restaurants/all-restaurants-page/AllRestaurantsPage';

const AppRoutes: React.FC<unknown> = (props) => {

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/restaurants'>
          <AllRestaurantsPage />
        </Route>
        <Route path='/'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </>
  );
};

export default AppRoutes;