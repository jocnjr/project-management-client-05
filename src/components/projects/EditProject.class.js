import React, { Component } from "react";
import axios from "axios";
import Input from "../forms/Input";
import Textarea from "../forms/Textarea";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.theProject.title,
      description: this.props.theProject.description
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
  }

  handleFormSubmit(event) {
    const title = this.state.title;
    const description = this.state.description;

    event.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/projects/${this.props.theProject._id}`,
        {
          title,
          description
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getTheProject();
        // after submitting the form, redirect to '/projects'
        // this.props.history.push('/projects');
      })
      .catch(error => console.log(error));
  }

  handleChangeTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleChangeDesc(event) {
    this.setState({
      description: event.target.value
    });
  }

  render() {
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <Input
            name="title"
            value={this.state.title}
            handleChange={this.handleChangeTitle}
          />

          <Textarea
            name="description"
            value={this.state.description}
            handleChange={this.handleChangeDesc}
          />

          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditProject;
