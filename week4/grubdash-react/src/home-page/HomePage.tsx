import React from 'react';
import Features from '../features/Features';
import './HomePage.css';
import img1 from '../assets/scooter.svg';
import img2 from '../assets/iphone.svg';
import img3 from '../assets/storefront.svg';

type Props = {
}

const HomePage: React.FC<Props> = (props) => {
  return (
    <>
      <div className="banner">
        <div>
          <input className="topButton" value="Sign-Up" type='submit'/>
          <h1 className='whiteText'>GrubDash</h1><br/>
        </div>
        <br/>
        <h2 className='whiteText'>Restaurants and more, </h2>
        <h2 className='whiteText'>delivered to your door</h2>
        <br/>
        <input className="input1"/> <input value="Go" className="input2" type='submit'/>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <div className='imgbox'>
            <img src={ img1 } alt='somthing' className="image1"/>
            <h3>Become a Dasher</h3>
          </div>
        </div>
        <div className="col-sm-4">
          <div className='imgbox'>
            <img src={ img2 } alt='somthing' className="image1"/>
            <h3>Try the app</h3>
          </div>
        </div>       
        <div className="col-sm-4">
          <div className='imgbox'>
            <img src={ img3 } alt='somthing' className="image1"/>
            <h3>View Restuarants</h3>
          </div>
        </div>
      </div>
      <div>
        <Features />
      </div>
      <div className="footer">

      </div>
    </>
  );
};

export default HomePage;