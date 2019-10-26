import React from "react";
import { Link } from "react-router-dom";

export const LoggedInMenuRender = ({ username, logoutUser }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/projects" className="navbar-item">
            Projects
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">Welcome, {username}</div>
        <div className="navbar-item">
          <button className="button is-small" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
