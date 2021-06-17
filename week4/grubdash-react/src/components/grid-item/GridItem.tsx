import React from 'react';

type Props = {
  src: string,
  alt: string,
  description: string,
}

const GridItem: React.FC<Props> = (props) => {

  return (
    <>
      <img className="img-thumbnail" src={props.src} alt={props.alt} />
      <h4> {props.description} </h4>
    </>
  );
};

export default GridItem;