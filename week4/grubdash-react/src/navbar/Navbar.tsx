import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

type Props = {

}

const Navbar: React.FC<Props> = (props) => {
  return (
    <>
      <nav className="navbar navbar-nav navbar-expand-md navbar-light bg-light nav-float">
        <div id="nav" className="container-fluid">
            <NavLink className="navbar-brand" to="/">GrubDash</NavLink>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/restaurants">Restaurants</NavLink>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;