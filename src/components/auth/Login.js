import React, { useState } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import Input from "../forms/Input";

const Login = ({ getUser, location, history }) => {
  const [username, handleUsername] = useState("");
  const [password, handlePassword] = useState("");

  const handleFormSubmit = async event => {
    const service = new AuthService();
    event.preventDefault();

    try {
      const response = await service.login(username, password);
      handleUsername("");
      handlePassword("");
      getUser(response);
      history.push(location.prevPath ? location.prevPath : "/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ width: "50vw" }}>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            name="username"
            value={username}
            handleChange={e => handleUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            name="password"
            value={password}
            handleChange={e => handlePassword(e.target.value)}
          />

          <button className="button">Login</button>
        </form>
        <p>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
