import React from "react";
import AuthService from "../auth/auth-service";
import UserContext from "../../context/UserContext";
import { PublicMenuRender } from "./PublicMenuRender";
import { LoggedInMenuRender } from "./LoggedInMenuRender";

const Navbar = ({ getUser }) => {
  const logoutUser = async () => {
    const service = new AuthService();

    try {
      await service.logout();
      getUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Consumer>
      {user =>
        user ? (
          <LoggedInMenuRender
            username={user.username}
            logoutUser={logoutUser}
          />
        ) : (
          <PublicMenuRender />
        )
      }
    </UserContext.Consumer>
  );
};

export default Navbar;
