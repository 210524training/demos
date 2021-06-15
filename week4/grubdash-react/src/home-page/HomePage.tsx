import React from 'react';

type Props = {

}

const HomePage: React.FC<Props> = (props) => {

  return (
    <>
      <div id='homePageDiv'>
        <div className='row h-100 justify-content-center align-items-center'>
          <h1 className='bg-light w-auto row justify-content-center align-items-center'>Welcome to GrubDash!</h1>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Delivery Address" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <button className="btn-light w-100" id="basic-addon2">Places near me</button>
          </div>
        </div>
        
      </div>
      

    </>
  );
};

export default HomePage;