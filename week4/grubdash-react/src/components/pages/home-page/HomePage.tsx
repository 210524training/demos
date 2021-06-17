import React from 'react';
import Features from '../../features/Features';
import './HomePage.css';
import scooter from '../../../assets/scooter.svg';
import iphone from '../../../assets/iphone.svg';
import storefront from '../../../assets/storefront.svg';
import User from '../../../models/user';
import { useAppSelector } from '../../../hooks';

type Props = {
}

const HomePage: React.FC<Props> = (props) => {
  const user = useAppSelector<User | null>((state) => state.user);

  return (
    <>
      <div className="banner">
        <div>
          <h1 className='whiteText'>GrubDash</h1><br/>
        </div>
        <br/>
        <h2 className='whiteText'>Restaurants and more, </h2>
        <h2 className='whiteText'>delivered to your door</h2>
        <br/>
        <input className="input1" placeholder="Your Address"/> <input value="Search" className="input2" type='submit'/>
        { user && <p>Greetings {user.username}</p>}
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            <div className='imgbox'>
              <img src={ scooter } alt='somthing' className="image1"/>
              <h3>Become a Dasher</h3>
            </div>
          </div>
          <div className="col-sm-4">
            <div className='imgbox'>
              <img src={ iphone } alt='somthing' className="image1"/>
              <h3>Try the app</h3>
            </div>
          </div>       
          <div className="col-sm-4">
            <div className='imgbox'>
              <img src={ storefront } alt='somthing' className="image1"/>
              <h3>View Restaurants</h3>
            </div>
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
