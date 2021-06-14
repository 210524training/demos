import React from 'react';

type Prop = {
    amount?: number;
}
const ClickerFunction: React.FC<Prop> = ({ amount = 1 }) => (
  <div>

  </div>
);

export default ClickerFunction;
