import React, { useState, useCallback } from "react";
import { filtervalues } from "../constants";
import Button from "./Button";
import OptionsList from "./OptionsList";
import "./FilterForm.css";

const FilterForm = ({ onFilter }) => {
  const [formInput, setFormInput] = useState({
    importanceInput: filtervalues.ALL,
    dateInput: "",
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormInput((prevFormInput) => ({ ...prevFormInput, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onFilter(formInput.importanceInput, formInput.dateInput);
    },
    [onFilter, formInput]
  );

  const resetFilter = useCallback(
    (event) => {
      event.preventDefault();
      setFormInput({ importanceInput: filtervalues.ALL, dateInput: "" });
      onFilter(filtervalues.ALL, "");
    },
    [onFilter]
  );

  return (
    <div className="filterform">
      <h3>Filter Todos</h3>
      <form onSubmit={handleSubmit} className="filterform-form">
        <label htmlFor="filterform-form-title">Filter by date</label>
        <input
          id="filterform-form__title"
          className="filterform-form-title"
          name="dateInput"
          type="date"
          value={formInput.dateInput}
          onChange={handleChange}
        />
        <OptionsList
          options={Object.values(filtervalues)}
          value={formInput.importanceInput}
          onChange={handleChange}
          labelText="Filter by Importance"
          name="importanceInput"
        />
        <Button onClick={handleSubmit}>Filter Todos</Button>
        <Button onClick={resetFilter}>Reset</Button>
      </form>
    </div>
  );
};

export default FilterForm;
