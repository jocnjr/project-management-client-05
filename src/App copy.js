import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import AuthService from "./components/auth/auth-service";
import ProtectedRoute from "./components/auth/protected-route";

// components
import ProjectList from "./components/projects/ProjectList";
import ProjectDetails from "./components/projects/ProjectDetails-useEffect";
import TaskDetails from "./components/tasks/TaskDetails";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import UserContext from "./context/UserContext";
import Home from "./components/Home";
import Route404 from "./components/Route404";

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
    return (
      <UserContext.Provider value={this.state.loggedInUser}>
        <div className="App">
          <Navbar getUser={this.getTheUser} />
          <Switch>
            {this.state.loggedInUser ? (
              <>
                <ProtectedRoute
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
                  render={props => (
                    <Signup getUser={this.getTheUser} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Login getUser={this.getTheUser} {...props} />
                  )}
                />
                <ProtectedRoute
                  exact
                  path="/projects/:id"
                  component={ProjectDetails}
                />
                <ProtectedRoute
                  exact
                  path="/projects"
                  component={ProjectList}
                />
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
  }
}

export default App;
