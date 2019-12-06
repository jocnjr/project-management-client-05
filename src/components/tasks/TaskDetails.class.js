import React, { Component } from "react";
import axios from "axios";

class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
  }

  componentDidMount() {
    this.getTheTask();
  }

  getTheTask() {
    const { params } = this.props.match;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects/${params.id}/tasks/${params.taskId}`,
        { withCredentials: true }
      )
      .then(responseFromApi => {
        const theTask = responseFromApi.data;
        this.setState(theTask);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
      </div>
    );
  }
}

export default TaskDetails;
