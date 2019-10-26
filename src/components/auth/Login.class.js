import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import Input from "../forms/Input";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service
      .login(username, password)
      .then(response => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response);
        this.props.history.push(
          this.props.location.prevPath
            ? this.props.location.prevPath
            : "/projects"
        );
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="section">
        <div className="container" style={{ width: "50vw" }}>
          <form onSubmit={this.handleFormSubmit}>
            <label>Username:</label>
            <Input
              type="text"
              name="username"
              value={this.state.username}
              handleChange={this.handleChange}
            />
            <label>Password:</label>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              handleChange={this.handleChange}
            />

            <input type="submit" value="Login" />
          </form>
          <p>
            Don't have account?
            <Link to={"/signup"}> Signup</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
