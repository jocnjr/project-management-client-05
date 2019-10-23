import React, { Component } from "react";
import axios from "axios";
import Input from "../forms/Input";
import Textarea from "../forms/Textarea";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", imageUrl: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { title, description, imageUrl } = this.state;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/projects`,
        { title, description, imageUrl },
        { withCredentials: true }
      )
      .then(response => {
        this.props.getData();
        console.log(response.data);
        this.setState({ title: "", description: "" });
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFileUpload(event) {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", event.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, uploadData, {
        withCredentials: true
      })
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.data.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  render() {
    return (
      <div className="section">
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
          <br />
          <div className="file is-small">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                onChange={this.handleFileUpload}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
            </label>
          </div>
          {this.state.imageUrl && (
            <img src={this.state.imageUrl} alt="my image" />
          )}
          <br />
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
