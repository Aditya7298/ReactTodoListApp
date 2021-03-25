import React from "react";
import { v4 as uuid } from "uuid";
import "./OptionsList.css";

export const OptionsList = React.memo(
  ({ options, value, onChange, labelText, name }) => {
    const handleChange = (event) => {
      onChange(event);
    };

    const labelId = `name-${uuid().slice(0, 5)}`;

    return (
      <>
        <label className="optionslist-label" htmlFor={labelId}>
          {labelText}
        </label>
        <select
          id={labelId}
          className="optionslist-select"
          value={value}
          onChange={handleChange}
          name={name}
        >
          {options.map((optionvalue) => (
            <option key={optionvalue} value={optionvalue}>
              {optionvalue}
            </option>
          ))}
        </select>
      </>
    );
  }
);
