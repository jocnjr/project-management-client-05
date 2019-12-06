import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  console.log({ component: Component, ...rest });
  return (
    <UserContext.Consumer>
      {user => (
        <Route
          {...rest}
          render={props => {
            if (user) {
              return <Component {...props} loggedInUser={user} />;
            } else {
              return (
                <Redirect
                  to={{ pathname: "/", prevPath: props.location.pathname }}
                />
              );
            }
          }}
        />
      )}
    </UserContext.Consumer>
  );
};
export default ProtectedRoute;
