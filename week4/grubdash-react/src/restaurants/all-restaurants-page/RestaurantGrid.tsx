import React from 'react';
import GridItem from '../../home-page/GridItem';

type Props = {

}

const RestaurantGrid: React.FC<Props> = (props) => {

  return (
    <>
      <div className="container">
        <h1>Restaurants Near You</h1>
        <div className="row row-cols-2">
          <div className="col">  <GridItem src="http://www.geofffox.com/wp-content/uploads/2014/10/Plain-McDonalds-Logo.jpg" alt="mcdonalds" description="" /> </div>
          <div className="col"> <h1>McDonalds</h1> </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantGrid;