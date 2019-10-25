import React, { useState } from "react";
import axios from "axios";
import Input from "../forms/Input";
import Textarea from "../forms/Textarea";

const EditProject = ({ theProject, getTheProject }) => {
  const [title, handleTitle] = useState(theProject.title);
  const [description, handleDescription] = useState(theProject.description);

  const handleFormSubmit = event => {
    event.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/projects/${theProject._id}`,
        {
          title,
          description
        },
        { withCredentials: true }
      )
      .then(() => {
        getTheProject();
        // after submitting the form, redirect to '/projects'
        // history.push("/projects");
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <hr />
      <h3>Edit form</h3>
      <form onSubmit={handleFormSubmit}>
        <Input
          name="title"
          type="text"
          value={title}
          handleChange={e => handleTitle(e.target.value)}
        />
        <Textarea
          name="description"
          value={description}
          handleChange={e => handleDescription(e.target.value)}
        />

        <input className="button" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditProject;
