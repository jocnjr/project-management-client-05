import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProject from "./EditProject";
import AddTask from "../tasks/AddTask";
import UserContext from "../../context/UserContext";

const ProjectDetails = ({ loggedInUser, history, ...props }) => {
  const [project, handleProject] = useState("");

  useEffect(() => {
    if (!project) getSingleProject();
  });

  const getSingleProject = () => {
    const { params } = props.match;
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${params.id}`, {
        withCredentials: true
      })
      .then(responseFromApi => {
        const theProject = responseFromApi.data;
        console.log(theProject, project);
        handleProject(theProject);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const ownershipCheck = project => {
    if (loggedInUser && project.owner === loggedInUser._id) {
      return (
        <div>
          <div>{renderEditForm()} </div>
          <button className="button" onClick={() => deleteProject()}>
            Delete project
          </button>
          <div>{renderAddTaskForm()} </div>
        </div>
      );
    }
  };

  const renderEditForm = () => {
    if (!project.title) {
      getSingleProject();
    } else {
      return (
        <EditProject
          theProject={project}
          getTheProject={getSingleProject}
          {...props}
        />
      );
    }
  };

  const renderAddTaskForm = () => {
    if (!project.title) {
      getSingleProject();
    } else {
      return <AddTask theProject={project} getTheProject={getSingleProject} />;
    }
  };

  // DELETE PROJECT:
  const deleteProject = () => {
    const { params } = props.match;
    axios
      .delete(`${process.env.REACT_APP_API_URL}/projects/${params.id}`)
      .then(() => {
        history.push("/projects"); // !!!
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <h1 className="title">{project.title}</h1>
      <p>{project.description}</p>
      {project.imageUrl && <img src={project.imageUrl} alt={project.title} />}
      <UserContext.Consumer>
        {context => (
          <p className="title is-6">
            loggedInUser by context: {context.username}
          </p>
        )}
      </UserContext.Consumer>
      {project.tasks && project.tasks.length > 0 && (
        <h3 className="subtitle is-5">Tasks </h3>
      )}
      {project.tasks &&
        project.tasks.map((task, index) => {
          return (
            <div key={index}>
              <Link to={`/projects/${project._id}/tasks/${task._id}`}>
                {task.title}
              </Link>
            </div>
          );
        })}
      <br />
      {ownershipCheck(project)}
      <br />
    </div>
  );
};

export default ProjectDetails;
