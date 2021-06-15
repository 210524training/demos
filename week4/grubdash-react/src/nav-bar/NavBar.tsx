import React from 'react';

function navbar() {
  return (
      <>
  <nav className="navbar navbar-nav navbar-expand-md navbar-light bg-light">
      <div id="nav" className="container-fluid">
          <a className="navbar-brand" href="/">GrubDash</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                  <a className="nav-link" href="login">Login</a>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
  </>
)
}

export default navbar;
