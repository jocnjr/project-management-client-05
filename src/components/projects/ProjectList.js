import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddProject from "./AddProject";

const ProjectList = () => {
  const [listOfProjects, updateProjects] = useState(null);

  useEffect(() => {
    if (!listOfProjects) getAllProjects();
  });

  const getAllProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects`,
        {
          withCredentials: true
        }
      );
      updateProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div style={{ width: "60%", float: "left" }}>
        {listOfProjects &&
          listOfProjects.map(project => {
            return (
              <div key={project._id}>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                </Link>
                {/* 🥁 added so the tasks can be displayed:  🥁 */}
                <ul>
                  {project.tasks.map((task, index) => {
                    return <li key={index}>task: {task.title}</li>;
                  })}
                </ul>
                {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
              </div>
            );
          })}
      </div>
      <div style={{ width: "40%", float: "right" }}>
        <AddProject getData={getAllProjects} /> {/* <== !!! */}
      </div>
    </div>
  );
};

export default ProjectList;
