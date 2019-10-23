import React from "react";

const Textarea = ({ name, value, handleChange }) => (
  <textarea
    className="textarea"
    name={name}
    placeholder={`enter ${name}`}
    value={value}
    onChange={e => handleChange(e)}
  ></textarea>
);

export default Textarea;
