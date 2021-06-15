import React from 'react';
import GridItem from './GridItem';

type Props = {

}

const styles = {
  backgroundColor: 'lightgrey',
}

const Favorites: React.FC<Props> = (props) => {

  return (
    <>
      <div className="container-fluid" style={styles}>
        <br />
        <div className="row row-cols-3">
          <div className="col"> <GridItem src="https://cms.qz.com/wp-content/uploads/2018/07/JopwellCollection_image22-e1532346648801.jpg?quality=75&strip=all&w=1400" alt="order" description="Order on your computer!"/> </div>
          <div className="col"> <GridItem src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa3%2F5c%2F1d%2Fa35c1d87e59aba84f36c8b638f0bc951.jpg&f=1&nofb=1" alt="order" description="Order on your phone!"/> </div>
          <div className="col"> <GridItem src="https://www.freepngimg.com/thumb/cheese/67431-cheese-hamburger-restaurant-veggie-fatburger-burger-king.png" alt="order" description="Become a burger!"/> </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;