import React, { useState, useCallback } from "react";
import { importanceFilter, completionFilter } from "../constants";
import Button from "./Button";
import OptionsList from "./OptionsList";
import "./FilterForm.css";

const FilterForm = ({ onFilter }) => {
  const [formInput, setFormInput] = useState({
    importanceInput: importanceFilter.ALL,
    dateInput: "",
    completionInput: completionFilter.ALL,
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormInput((prevFormInput) => ({ ...prevFormInput, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onFilter(
        formInput.importanceInput,
        formInput.dateInput,
        formInput.completionInput
      );
    },
    [onFilter, formInput]
  );

  const resetFilter = useCallback(
    (event) => {
      event.preventDefault();
      setFormInput({
        importanceInput: importanceFilter.ALL,
        dateInput: "",
        completionInput: completionFilter.ALL,
      });
      onFilter(importanceFilter.ALL, "", completionFilter.ALL);
    },
    [onFilter]
  );

  return (
    <div className="filterform">
      <h3>Filter Todos</h3>
      <form onSubmit={handleSubmit} className="filterform-form">
        <label htmlFor="filterform-form-title">Date Added</label>
        <input
          id="filterform-form__title"
          className="filterform-form-title"
          name="dateInput"
          type="date"
          value={formInput.dateInput}
          onChange={handleChange}
        />
        <OptionsList
          options={Object.values(importanceFilter)}
          value={formInput.importanceInput}
          onChange={handleChange}
          labelText="Todo Importance"
          name="importanceInput"
        />
        <OptionsList
          options={Object.values(completionFilter)}
          value={formInput.completionInput}
          onChange={handleChange}
          labelText="Completion Status"
          name="completionInput"
        />
        <Button onClick={handleSubmit}>Filter Todos</Button>
        <Button onClick={resetFilter}>Reset</Button>
      </form>
    </div>
  );
};

export default FilterForm;
