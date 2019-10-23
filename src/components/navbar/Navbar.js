import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/auth-service";
import UserContext from "../../context/UserContext";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userInSession !== prevProps.userInSession) {
      this.setState({ loggedInUser: this.props.userInSession });
    }
  }

  logoutUser() {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <UserContext.Consumer>
          {context => {
            console.log("this is the context: ", context);
            return (
              <nav className="navbar">
                <ul>
                  <li>Welcome, {context.username}</li>
                  <li>
                    <Link to="/projects" style={{ textDecoration: "none" }}>
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <button onClick={this.logoutUser}>Logout</button>
                    </Link>
                  </li>
                </ul>
              </nav>
            );
          }}
        </UserContext.Consumer>
      );
    } else {
      return (
        <div>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Signup
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Navbar;
