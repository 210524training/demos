import React, { useRef } from 'react';

type Props = {
  counter: number;
  increment: () => void;
  decrement: () => void
  getRenders: () => void;
  spanCallback: (ref: React.RefObject<HTMLSpanElement>) => void;
}

const ClickerPresentation: React.FC<Props> = ({counter, increment, decrement, getRenders, spanCallback}) => {

  const spanRef = useRef<HTMLSpanElement>(null);
  spanCallback(spanRef);

  return (
    <div>
      <button onClick={decrement}>
        -
      </button>
      <span ref={spanRef}> Counter Value: {counter} </span>
      <button onClick={increment}>
        +
      </button>
      <span>Renders: {getRenders()}</span>
    </div>
  );
}

export default ClickerPresentation;