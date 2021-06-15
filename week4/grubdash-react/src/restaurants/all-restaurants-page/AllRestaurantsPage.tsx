import React from 'react';
import logo from './grublogo.jpg';

type Props = {

}

const AllRestaurantsPage: React.FC<Props> = (props) => {

  return (
    <>
    <div className="banner2">
      <header className="banner2">
        Grubdash
      </header>
      <input className="input" type="text" placeholder ="Burgers? Thai? You name it!"></input>
    </div>
    

      <img src={logo} className="logo" alt="logo" />

    <h4 className="banner3">Restaurants we think you'll love</h4>
    
    <br></br>
    <div className='banner3'>
      <button type="button" className="btn btn-danger">Chick-fil-A</button>
      <div className="divider"/>
      <button type="button" className="btn btn-warning">Micky Dee's</button>
      <div className="divider"/>
      <button type="button" className="btn btn-success">Sweet Green's</button>
    </div>
    
    </>
  );
};

export default AllRestaurantsPage;