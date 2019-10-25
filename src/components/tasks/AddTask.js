import React, { useState } from "react";
import axios from "axios";
import Input from "../forms/Input";
import Textarea from "../forms/Textarea";

const AddTask = ({ theProject, getTheProject }) => {
  const [title, handleTitle] = useState("");
  const [description, handleDescription] = useState("");
  const [isShowing, handleIsShowing] = useState(false);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const projectID = theProject._id;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks`,
        {
          title,
          description,
          projectID
        },
        { withCredentials: true }
      );
      getTheProject();
      handleTitle("");
      handleDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => {
    handleIsShowing(!isShowing);
  };

  const showAddTaskForm = () => {
    if (isShowing) {
      return (
        <div>
          <h3>Add Task</h3>
          <form onSubmit={handleFormSubmit}>
            <Input
              name="title"
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
    }
  };
  return (
    <div>
      <hr />
      <button onClick={toggleForm}> Add task </button>
      {showAddTaskForm()}
    </div>
  );
};

export default AddTask;
