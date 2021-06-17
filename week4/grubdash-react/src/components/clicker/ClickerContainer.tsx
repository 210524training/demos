import React, { useRef, useState } from 'react';
import ClickerPresentation from './ClickerPresentation';
import PropTypes from 'prop-types';

type Props = {
  amount: number;
}

const ClickerContainer: React.FC<Props> = ({amount}) => {

  const [counter, setCounter] = useState<number>(0);

  const increment = () => {
    setCounter( (value) => value + Number(amount));
  }

  const decrement = () => {
    setCounter( (value) => value - Number(amount));
  }

  const logSpan = (ref: React.RefObject<HTMLSpanElement>) => console.log(ref.current);

  const renders = useRef<number>(1);

  const getRenders = (): number => {
    return renders.current++;
  }
  
  return (
    <ClickerPresentation
      counter={counter}
      increment={increment}
      decrement={decrement}
      spanCallback={logSpan}
      getRenders={getRenders} />
  );
};

ClickerContainer.propTypes = {
  amount: PropTypes.number.isRequired,
}

export default ClickerContainer;