import React from "react";
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  getTheUser(userObj) {
    this.setState({
      loggedInUser: userObj
    });
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <UserContext.Provider value={this.state.loggedInUser}>
          <div className="App">
            <Navbar
              userInSession={this.state.loggedInUser}
              getUser={this.getTheUser}
            />
            <Switch>
              <ProtectedRoute
                user={this.state.loggedInUser}
                exact
                path="/projects"
                component={ProjectList}
              />
              <ProtectedRoute
                exact
                path="/projects/:id/tasks/:taskId"
                component={TaskDetails}
              />
              <ProtectedRoute
                user={this.state.loggedInUser}
                exact
                path="/projects/:id"
                component={ProjectDetails}
              />
            </Switch>
          </div>
        </UserContext.Provider>
      );
    } else {
      return (
        <UserContext.Provider value={this.state.loggedInUser}>
          <div className="App">
            <Navbar userInSession={this.state.loggedInUser} />
            <Switch>
              <Route
                exact
                path="/signup"
                render={props => (
                  <Signup getUser={this.getTheUser} {...props} />
                )}
              />
              <Route
                exact
                path="/"
                render={props => <Login getUser={this.getTheUser} {...props} />}
              />
              <ProtectedRoute
                user={this.state.loggedInUser}
                exact
                path="/projects/:id"
                component={ProjectDetails}
              />
              <ProtectedRoute
                user={this.state.loggedInUser}
                exact
                path="/projects"
                component={ProjectList}
              />
              <ProtectedRoute
                exact
                path="/projects/:id/tasks/:taskId"
                component={TaskDetails}
              />
            </Switch>
          </div>
        </UserContext.Provider>
      );
    }
  }
}

export default App;
