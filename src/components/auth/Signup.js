import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import Input from "../forms/Input";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.service = new AuthService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .signup(username, password)
      .then(response => {
        console.log(response);
        this.setState({
          username: "",
          password: ""
        });
        this.props.getUser(response);
        this.props.history.push("/projects");
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="section">
        <div className="container" style={{ width: "50vw" }}>
          <form onSubmit={this.handleFormSubmit}>
            <label> Username: </label>
            <Input
              type="text"
              name="username"
              value={this.state.username}
              handleChange={this.handleChange}
            />
            <label> Password: </label>

            <Input
              type="password"
              name="password"
              value={this.state.password}
              handleChange={e => this.handleChange(e)}
            />
            <input type="submit" value="Signup" />
          </form>

          <p>
            Already have account ?<Link to={"/"}> Login </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
