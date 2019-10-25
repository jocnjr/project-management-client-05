import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import AuthService from "./components/auth/auth-service";
import ProtectedRoute from "./components/auth/protected-route";

// components
import ProjectList from "./components/projects/ProjectList";
import ProjectDetails from "./components/projects/ProjectDetails";
import TaskDetails from "./components/tasks/TaskDetails";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import UserContext from "./context/UserContext";
import Home from "./components/Home";
import Route404 from "./components/Route404";

const App = () => {
  const [loggedInUser, setUser] = useState(null);

  useEffect(() => {
    if (!loggedInUser) fetchUser();
  });

  const fetchUser = async () => {
    const service = new AuthService();
    if (loggedInUser === null) {
      try {
        const response = await service.loggedin();
        setUser(response);
      } catch (error) {
        setUser(null);
      }
    }
  };

  const getTheUser = userObj => {
    setUser(userObj);
  };

  return (
    <UserContext.Provider value={loggedInUser}>
      <div className="App">
        <Navbar getUser={getTheUser} />
        <Switch>
          {loggedInUser ? (
            <>
              <ProtectedRoute exact path="/projects" component={ProjectList} />
              <ProtectedRoute
                exact
                path="/projects/:id/tasks/:taskId"
                component={TaskDetails}
              />
              <ProtectedRoute
                exact
                path="/projects/:id"
                component={ProjectDetails}
              />
              <ProtectedRoute exact path="/" component={Home} />
            </>
          ) : (
            <>
              <Route
                exact
                path="/signup"
                render={props => <Signup getUser={getTheUser} {...props} />}
              />
              <Route
                exact
                path="/"
                render={props => <Login getUser={getTheUser} {...props} />}
              />
              <ProtectedRoute
                exact
                path="/projects/:id"
                component={ProjectDetails}
              />
              <ProtectedRoute exact path="/projects" component={ProjectList} />
              <ProtectedRoute
                exact
                path="/projects/:id/tasks/:taskId"
                component={TaskDetails}
              />
            </>
          )}
          <Route component={Route404} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

export default App;
