import React from 'react';
// All Components must import React from 'react' at the top of their module.
import logo from './grublogo.jpg';
// import './App.css';
// import Clicker from './clicker/ClickerClass';
import HomePage from './home-page/HomePage';
import AllRestaurantsPage from './restaurants/all-restaurants-page/AllRestaurantsPage';

// There are 2 different kinds of Components: Class & Function
// This Component here is a Function Component
// For Function Components, you can structure them as regular functions or arrow functions
// Note that in TypeScript, the return type is not the same as the variable type of an arrow Function
const App: React.FC = (): JSX.Element => {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload. We changed the component!
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>

    //     <Clicker amount={50} />
    //     <Clicker amount={10} />
    //   </header>
    // </div>
    // <HomePage />
    <AllRestaurantsPage />
  );
}

export default App;
