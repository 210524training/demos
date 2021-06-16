import React from 'react';
// All Components must import React from 'react' at the top of their module.
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import AppRoutes from './router/AppRoutes';

// There are 2 different kinds of Components: Class & Function
// This Component here is a Function Component
// For Function Components, you can structure them as regular functions or arrow functions
// Note that in TypeScript, the return type is not the same as the variable type of an arrow Function
const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
