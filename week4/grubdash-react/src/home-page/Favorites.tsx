import React from 'react';
import GridItem from './GridItem';

type Props = {

}

const Favorites: React.FC<Props> = (props) => {

  return (
    <>
      <div className="container">
        <h1>Favorite Items</h1>
        <div className="row row-cols-3">
          <div className="col"> <GridItem src="https://cdn.nanalyze.com/uploads/2017/05/Burger-Future-Teaser.jpg" alt="hamburger" description="Hamburger"/> </div>
          <div className="col"> <GridItem src="https://cdn.nanalyze.com/uploads/2017/05/Burger-Future-Teaser.jpg" alt="hamburger" description="Hamburger"/> </div>
          <div className="col"> <GridItem src="https://cdn.nanalyze.com/uploads/2017/05/Burger-Future-Teaser.jpg" alt="hamburger" description="Hamburger"/> </div>
          <div className="col"> <GridItem src="https://cdn.nanalyze.com/uploads/2017/05/Burger-Future-Teaser.jpg" alt="hamburger" description="Hamburger"/> </div>
          <div className="col"> <GridItem src="https://cdn.nanalyze.com/uploads/2017/05/Burger-Future-Teaser.jpg" alt="hamburger" description="Hamburger"/> </div>
          <div className="col"> <GridItem src="https://cdn.nanalyze.com/uploads/2017/05/Burger-Future-Teaser.jpg" alt="hamburger" description="Hamburger"/> </div>

        </div>
      </div>
    </>
  );
};

export default Favorites;