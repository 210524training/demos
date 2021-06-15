import React from 'react';
import Banner from './Banner';
import Favorites from './Favorites';
import Features from './Features';
import Footer from './Footer';

type Props = {

}

const HomePage: React.FC<Props> = (props) => {

  return (
    <>
      <Banner />
      <br />
      <Favorites />
      <br />
      <br />
      <br />
      <Features />
      <Footer />
    </>
  );
};

export default HomePage;