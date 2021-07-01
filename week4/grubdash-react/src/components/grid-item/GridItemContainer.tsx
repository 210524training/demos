import React from 'react';
import GridItem from './GridItem';

type Props = {
  src: string,
  alt: string,
  description: string,
}

const GridItemContainer: React.FC<Props> = (props) => {

  // Define an onClick function
  const onClick = () => {
    // Do something
    console.log('Clicked!');
  }

  return (
    <GridItem {...props} logic={onClick} />
  )
}

export default GridItemContainer;