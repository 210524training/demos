import React from 'react';

type Props = {

}

const HomePage: React.FC<Props> = (props) => {

  return (
<div style = {{borderColor: "red", borderStyle: "solid"}}>   
  <nav className="navbar bg-danger navbar-expand-sm justify-content-center">
    <div className="navbar-nav justify-content-center">
      <a className="nav-link text-white " aria-current="page" href="/#">Active</a>
      <a className="nav-link text-white" href="/#">Link</a>
      <a className="nav-link text-white" href="/#">Link</a>
      <a className="nav-link text-white" href="/#"  aria-disabled="true">Disabled</a>
    </div>

    
  </nav>
  <nav className="navbar container justify-content-center ">
    <a className="nav-link text-white justify-content-center" href="/#">Sign Up</a>
      <a className="nav-link text-white" href="/#">Login</a>
  </nav>
  <div className="text-center">
    <img className = "img-responsive" src="https://th.bing.com/th/id/OIP.wNv9b6dIA24T91gaDjMZPQHaEc?w=300&h=180&c=7&o=5&dpr=1.12&pid=1.7" alt=""></img>
  </div>
</div>
    
  );
};

export default HomePage;