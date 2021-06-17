import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
}

const Navbar: React.FC<Props> = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <div id="nav" className="container-fluid">
        <NavLink className="navbar-brand" to="/">GrubDash</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/restaurants">Restaurants</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;