import React from 'react';

type Props = {

}

const styles = {
  backgroundColor: 'blue',
  color: 'white',
}

const Favorites: React.FC<Props> = (props) => {

  return (
    <>
      <div className="container-fluid" style={styles}>
        <br />
        <div className="row row-cols-6">
          <div className="col">
            <h4 className="fw-bold">Get to Know Us</h4>
            <h6>About</h6>
            <h6>Contact Us</h6>
          </div>
          <div className="col">
            <h4 className="fw-bold">Your Profile</h4>
            <h6>Account Details</h6>
            <h6>Order History</h6>
          </div>
          <div className="col">
            <h4 className="fw-bold">Doing Business</h4>
            <h6>Become a Driver</h6>
            <h6>Be a Partner Restaurant</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;