import React, { createRef } from 'react';
import ContainerWrapper from '../container-wrapper/ContainerWrapper';

type Props = {
  amount?: number;
}

type State = {
  counter: number;
}

class ClickerClass extends React.Component<Props, State> {
  // We MUST implement the render() method at minimum
  public spanRef: React.RefObject<HTMLSpanElement> | undefined;
  // public someData: React.RefObject<number>;

  constructor(props: Props) {
    super(props);

    this.state = {
      counter: 0,
    };

    this.spanRef = createRef<HTMLSpanElement>();
    // this.someData = createRef<number>();
  }

  render(): JSX.Element {
    console.log(this.spanRef);
    return (
      <div>
        <button onClick={() => this.setState({...this.state, counter: this.state.counter - 1})}>
          {/* It is VERY Important to remember to spread the state when you assign it with setState
              As if you don't, you will overwrite the state variable with only new data, and lose any
              other fields that you don't explicitly set */}
          -
        </button>
        <span ref={this.spanRef}> Counter Value: {this.state.counter} </span>
        {/* The setter function from useState has an overloaded version that
            receives the current state value as a parameter, and you return
            a new value for the state to become
            This has an important implication for useEffect */}
        <button onClick={() => this.setState({...this.state, counter: this.state.counter + 1})}>
          +
        </button>
        {/* <span>Renders: {this.someData.current}</span> */}
      </div>
    );
  }

  componentDidUpdate() {
    console.log(this.state.counter);

    if(this.state.counter % 2 === 1) {
      this.setState({...this.state, counter: this.state.counter + 1});
    }
  }
}

export default ContainerWrapper(ClickerClass);