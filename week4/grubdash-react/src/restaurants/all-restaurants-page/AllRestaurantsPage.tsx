import React from 'react';
import Banner from '../../home-page/Banner';
import RestaurantGrid from './RestaurantGrid';

type Props = {

}

const AllRestaurantsPage: React.FC<Props> = (props) => {

  return (
    <>
      <Banner />
      <RestaurantGrid />
    </>
  );
};

export default AllRestaurantsPage;