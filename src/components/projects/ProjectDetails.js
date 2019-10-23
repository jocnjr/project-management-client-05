import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import EditProject from "./EditProject";
import AddTask from "../tasks/AddTask";
import UserContext from "../../context/UserContext";
import Modal from "../Modal";

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getSingleProject = this.getSingleProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  componentDidMount() {
    this.getSingleProject();
  }

  getSingleProject() {
    const { params } = this.props.match;
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${params.id}`, {
        withCredentials: true
      })
      .then(responseFromApi => {
        const theProject = responseFromApi.data;
        this.setState(theProject);
      })
      .catch(err => {
        console.log(err);
      });
  }
  ownershipCheck(project) {
    if (
      this.props.loggedInUser &&
      project.owner == this.props.loggedInUser._id
    ) {
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button className="button" onClick={() => this.deleteProject()}>
            Delete project
          </button>
          <div>{this.renderAddTaskForm()} </div>
        </div>
      );
    }
  }

  renderEditForm() {
    if (!this.state.title) {
      this.getSingleProject();
    } else {
      return (
        <EditProject
          theProject={this.state}
          getTheProject={this.getSingleProject}
          {...this.props}
        />
      );
    }
  }

  renderAddTaskForm() {
    if (!this.state.title) {
      this.getSingleProject();
    } else {
      // pass the project and method getSingleProject() as a props down to AddTask component
      return (
        <AddTask
          theProject={this.state}
          getTheProject={this.getSingleProject}
        />
      );
    }
  }

  // DELETE PROJECT:
  deleteProject() {
    const { params } = this.props.match;
    axios
      .delete(`${process.env.REACT_APP_API_URL}/projects/${params.id}`)
      .then(() => {
        this.props.history.push("/projects"); // !!!
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <h1 className="title is-1">{this.state.title}</h1>
        <p>{this.state.description}</p>
        {this.state.imageUrl && (
          <img src={this.state.imageUrl} alt="my image" />
        )}
        <UserContext.Consumer>
          {context => (
            <p className="subtitle is-6">project by: {context.username}</p>
          )}
        </UserContext.Consumer>
        {/* show the task heading only if there are tasks */}
        {this.state.tasks && this.state.tasks.length > 0 && (
          <h3 className="subtitle is-5">Tasks </h3>
        )}
        {/* map through the array of tasks and... */}
        {this.state.tasks &&
          this.state.tasks.map((task, index) => {
            return (
              <div key={index}>
                {/* ... make each task's title a link that goes to the task details page */}
                <Link to={`/projects/${this.state._id}/tasks/${task._id}`}>
                  {task.title}
                </Link>
              </div>
            );
          })}
        <br />
        {this.ownershipCheck(this.state)}
        <br />
      </div>
    );
  }
}

export default ProjectDetails;
