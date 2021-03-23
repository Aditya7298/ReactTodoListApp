import { useState } from "react";
import { importance } from "../constants";
import "./FilterForm.css";

const FilterForm = ({ onFilter }) => {
  const [formInput, setFormInput] = useState({
    importanceInput: "",
    dateInput: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput((prevFormInput) => ({ ...prevFormInput, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter(formInput.importanceInput, formInput.dateInput);
  };

  const resetFilter = (event) => {
    event.preventDefault();
    setFormInput({ importanceInput: "", dateInput: "" });
    onFilter("", "");
  };

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
        <label htmlFor="filterform-form-importance">Filter by importance</label>
        <select
          id="filterform-form-importance"
          className="filterform-form-importance"
          name="importanceInput"
          value={formInput.importanceInput}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value={importance.HIGH}>{importance.HIGH}</option>
          <option value={importance.MEDIUM}>{importance.MEDIUM}</option>
          <option value={importance.LOW}>{importance.LOW}</option>
          <option value={importance.NONE}>{importance.NONE}</option>
        </select>
        <button className="filterform-form-button" type="submit">
          Filter Todos
        </button>
        <button
          className="filterform-form-button"
          type="reset"
          onClick={resetFilter}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
