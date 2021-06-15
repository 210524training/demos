import React from 'react';
import InputAddress from './InputAddress';


type Props = {

}

const styles: React.CSSProperties = {
  backgroundColor: 'lightblue',
  // backgroundImage: 'http://www.berryglobal.com/images/default-source/Berry-Page-Headers/fresh-food-banner.jpg',
  // backgroundImage: 'https://cdn.nanalyze.com/uploads/2017/05/Burger-Future-Teaser.jpg',

}

const Banner: React.FC<Props> = (props) => {

  return (
    <>
      <div className="container-fluid" style={styles}>
        <br />
        <h1 className="row justify-content-center" text-align="center">GrubDash</h1>
        <br />
        <InputAddress />
        <br />
      </div>
    </>
  );
};

export default Banner;