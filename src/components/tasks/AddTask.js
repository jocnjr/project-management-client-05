import React, { Component } from "react";
import axios from "axios";
import Input from "../forms/Input";
import Textarea from "../forms/Textarea";

class AddTask extends Component {
  constructor(props) {
    super(props); //             will help us to toggle add task form
    //                      |
    this.state = { title: "", description: "", isShowing: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.showAddTaskForm = this.showAddTaskForm.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const projectID = this.props.theProject._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
    // it has to be the 'id' because we are referencing project
    // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})

    // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route,
    // so the names have to match
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/tasks`,
        {
          title,
          description,
          projectID
        },
        { withCredentials: true }
      )
      .then(() => {
        // after submitting the form, retrieve project one more time so the new task is displayed as well
        //              |
        this.props.getTheProject();
        this.setState({ title: "", description: "" });
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  toggleForm() {
    this.setState({ isShowing: !this.state.isShowing });
  }

  showAddTaskForm() {
    if (this.state.isShowing) {
      return (
        <div>
          <h3>Add Task</h3>
          <form onSubmit={this.handleFormSubmit}>
            <Input
              name="title"
              value={this.state.title}
              handleChange={this.handleChange}
            />

            <Textarea
              name="description"
              value={this.state.description}
              handleChange={this.handleChange}
            />

            <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <hr />
        <button onClick={this.toggleForm}> Add task </button>
        {this.showAddTaskForm()}
      </div>
    );
  }
}

export default AddTask;
