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
      <ul>
        <li> Welcome, {username} </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/">
            <button onClick={logoutUser}> Logout </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
