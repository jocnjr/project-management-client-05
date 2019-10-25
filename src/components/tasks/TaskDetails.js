import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskDetails = ({ match }) => {
  const [title, handleTitle] = useState("");
  const [description, handleDescription] = useState("");

  useEffect(() => {
    if (!title) getTheTask();
  });

  const getTheTask = async () => {
    const { params } = match;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/${params.id}/tasks/${params.taskId}`,
        { withCredentials: true }
      );
      handleTitle(response.data.title);
      handleDescription(response.data.description);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default TaskDetails;
