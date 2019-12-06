import React from "react";
import UserContext from "../context/UserContext";

const Home = () => {
  return (
    <UserContext.Consumer>
      {user => <h1 className="title is-2">welcome, {user.username}</h1>}
    </UserContext.Consumer>
  );
};
export default Home;
