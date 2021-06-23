import React, { useRef } from 'react';
import ContainerWrapper from '../../container-wrapper/ContainerWrapper';

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

export default ContainerWrapper(ClickerPresentation);
// export default ClickerPresentation;