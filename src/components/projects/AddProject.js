import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../forms/Input";
import Textarea from "../forms/Textarea";

const AddProject = ({ getData }) => {
  const [title, handleTitle] = useState("");
  const [description, handleDescription] = useState("");
  const [imageUrl, handleImageUrl] = useState("");

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/projects`,
        { title, description, imageUrl },
        { withCredentials: true }
      );
      getData();
      handleTitle("");
      handleDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async event => {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    // FormData is a webAPI feature
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        uploadData,
        {
          withCredentials: true
        }
      );

      handleImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error while uploading the file: ", error);
    }
  };

  return (
    <div className="section">
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
        <br />
        <div className="file is-small">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              onChange={handleFileUpload}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
          </label>
        </div>
        {imageUrl && <img src={imageUrl} alt="{title}" />}
        <br />
        <input className="button" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddProject;
