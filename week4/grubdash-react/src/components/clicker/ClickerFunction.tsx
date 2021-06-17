import React, { useEffect, useRef, useState } from 'react';

// Function components have a parameter called props that we can pass in
// The default typing is to pass in this component's nested children as a prop
// It's optional, because this Component might not have children
// If you want to specify a type for the incoming props, we do so
// by providing a generic to the React.FC type

type Props = {
  amount?: number;
}

const ClickerFunction: React.FC<Props> = ({ amount = 1}) => {
  // The idea for this Clicker Function is to see a display of the current clicker amount
  // And have + and - buttons that can be clicked to increment or decrement the Clicker value

  // This is going to require internal state of this Component that is persistent across renders
  // Since normal Functions lose their data when their scope ends, React has provided a feature called "Hooks"
  // to get around this
  
  // Hooks are also just functions, and their convention is that they begin with "use" in their name
  // useState
  // useEffect
  // useCallback
  // useRef
  // useContext
  // ...etc

  // The first, useState, will allow us to have a persistent reference to some data
  // This useState hook will provided the same memory location for the data every time the function is called
  // Which lets us persist and manipulate data over multiple calls to this Function Component

  // The FunctionComponent MUST return JSX

  // The useState hook returns an array of the state value and a setter function
  // We can use array destructuring to declare variables for that data
  // const [counter, setCounter] = useState<{ value: number }>({value: 0});
  // Why do we need a setter?
  // Why can I not just declare `counter.value += 1`?

  // React follows a principle of "immutability", which means cannot be changed
  // Props and State are immutable

  // If that's the case, how can I even have a setter?
  // The setter that they provide creates new, immutable, data of whatever is passed
  // I believe they use a library called "Immer" to accomplish it

  // The reason they do so, is it provides guarantees that the data will not change while the rest
  // of React is executing
  // It cannot change "unexpectedly"
  // This makes testing and a variety of analysis tools a lot easier
  // It also helps developers enforce best practices
  const [counter, setCounter] = useState<number>(0);

  const someData = useRef<number>(0);
  someData.current += 1;
  // useRef is kind of similar to useState in that it provides
  // some persistent data
  // It is called "useRef", because its most common use-case
  // is to provide a reference to an HTML element
  // But it has other use cases

  // There are 2 kinds of Refs, mutable and immutable
  // Generally, the immutable version is used in the above common scenario
  // of referencing an HTML element

  // The type declaration and the initial value work together for React
  // To decide whether it is mutable or immutable

  // Refs are objects with a .current property with the data that you want
  // If you have a mutable Ref, then you are able to modify the .current property
  // to your whim, but changing DOES NOT CAUSE AN UPDATE

  // A fun minor use-case I have seen people do is use this to track the number
  // of renders a component has gone through

  // setCounter( (value) => value + 1);
  // This will trigger infinite re-renders

  const spanRef = useRef<HTMLSpanElement>(null);
  console.log(spanRef);

  // The useEffect hook is primarily used to "hook into the component lifecycle", with an effect
  useEffect( () => {
    // For example, if I wanted to execute some logic when my Component is mounted
    // I would need to use this useEffect hook

    console.log("My useEffect hook was called");

    // The dependency array is used to re-trigger the useEffect callback
    // when certain "dependencies" are changed

    // This is IMPORTANT because of the way useEffect was implemented

    // It "snapshots" data
    // For example, the value of some state

    // This callback has a persistent reference, and it still has the value
    // of the old immutable state data

    // The provided ESLint configuration from Create-React-App has a rule
    // for identifying dependencies
    // You SHOULD NOT DISALBE THIS
    // It is helpful, even if it can sometimes be frustrating to fix/work with

    // If the counter is odd, it will be incremented to be even
    // It shouldn't create an infinite loop because it will only increment
    // every other value

    console.log(counter);

    if(counter % 2 === 1) {
      setCounter((value) => value + amount);
    }
  }, [counter, someData, amount]);
  // By specifying the dependency array, this callback will be re-triggered
  // when the dependency changes (the callback will have the new data, instead of referring to the old data)

  // If the dependency array is not declared at all, the callback will be triggered
  // on EVERY render

  // We can "sort of" emulate the functionality of componentDidMount
  // By declaring an empty dependency array
  // Note that if you have any dependencies and you specifically do not declare
  // them, ESLint will be mad at you, but it would work nonetheless

  // componentDidUpdate can be emulated by not declaring the dependency array at all
  // But most of the time, we don't actually want this
  // Because it is more organized to declare multiple useEffect hooks with isolated
  // tasks, instead of putting them all into a single useEffect hook

  // As such, not every task needs to be retriggered on every update
  // So we can use the dependency array to specify when the tasks do need to re-execute

  // componentWillUnmount can be emulated by returning a callback from the useEffect hook
  // Note, that is not exactly correct, as the returned callback will still be invoked on every
  // update, but it will be before the useEffect is retriggered and also before the component
  // unmounts

  // The returned callback is used to define "cleanup behavior"
  // Before the useEffect callback is invoked, it will first be cleaned up

  // The functionality of useEffect is NOT 1 to 1 with the class component lifecycle methods
  // But we can accomplish the same goals

  // JSX CANNOT return more than 1 element at the top-most level
  // To avoid having many divs throughout the UI, devs use React.Fragment
  // Which acts as an invisible parent element
  // Furthermor, React.Fragment has an alias of an empty tag
  return (
    <>
      {/* One of the differences between event listeners in HTML vs JSX
          is that we do not invoke the function that we pass in
          Instead, we provide a callback function, and React will invoke it */}
      <button onClick={() => setCounter(counter - amount)}>
        -
      </button>
      <span ref={spanRef}> Counter Value: {counter} </span>
      {/* The setter function from useState has an overloaded version that
          receives the current state value as a parameter, and you return
          a new value for the state to become
          This has an important implication for useEffect */}
      <button onClick={() => setCounter( (value) => value + amount)}>
        +
      </button>
      <span>Renders: {someData.current}</span>
      {/* Incrementing the above ref after displaying it will NOT cause a re-render 
          Which is important, because if it did, it would cause an infinite re-rendering loop

          It is VERY COMMON for people to forget the rules for updating and getting lost
          By their Component causing infinite re-renders

          Something weird is going on, causing 2 updates
      */}
      </>
  );
};

/*
  When either the Props OR the State changes, React will trigger a re-render,
  or as React calls it, an "update"
*/

export default ClickerFunction;