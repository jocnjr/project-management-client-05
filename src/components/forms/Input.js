import React from "react";

const Input = ({ name, type, value, handleChange }) => (
  <div className="field">
    <div className="control">
      <input
        className="input is-small"
        type={type}
        placeholder={`enter ${name}`}
        name={name}
        value={value}
        onChange={e => handleChange(e)}
      />
    </div>
  </div>
);

export default Input;
