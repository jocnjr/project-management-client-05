import React, { useState } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import Input from "../forms/Input";

const Signup = ({ getUser, history }) => {
  const [username, handleUsername] = useState("");
  const [password, handlePassword] = useState("");
  const [message, handleMessage] = useState("");

  const handleFormSubmit = async event => {
    event.preventDefault();
    const service = new AuthService();

    try {
      const response = await service.signup(username, password);
      handleUsername("");
      handlePassword("");
      getUser(response);
      history.push("/projects");
    } catch (error) {
      handleMessage(error.message);
    }
  };
  return (
    <div className="section">
      <div className="container" style={{ width: "50vw" }}>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username"> Username: </label>
          <Input
            type="text"
            name="username"
            value={username}
            handleChange={e => handleUsername(e.target.value)}
          />
          <label htmlFor="password"> Password: </label>
          <Input
            type="password"
            name="password"
            value={password}
            handleChange={e => handlePassword(e.target.value)}
          />
          <button className="button" type="submit">
            Signup
          </button>
        </form>
        <br />
        {message && <p className="notification is-danger">{message}</p>}
        <p>
          Already have account ?<Link to={"/"}> Login </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
