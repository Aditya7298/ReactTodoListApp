import { useState } from "react";
import { importance } from "../constants";
import "./AddForm.css";

const AddForm = ({ onAdd }) => {
  const [newTodoInfo, setNewTodoInfo] = useState({
    titleInput: "",
    importanceInput: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTodoInfo((prevNewTodoInfo) => ({
      ...prevNewTodoInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd({
      title: newTodoInfo.titleInput,
      importance: newTodoInfo.importanceInput,
    });
    setNewTodoInfo({ titleInput: "", importanceInput: "" });
  };

  return (
    <div className="addform">
      <h3>Add a new Todo</h3>
      <form onSubmit={handleSubmit} className="addform-form">
        <input
          className="addform-form-title"
          type="text"
          name="titleInput"
          value={newTodoInfo.titleInput}
          onChange={handleChange}
          placeholder="Add new todo title"
        ></input>
        <label htmlFor="addform-form-importance">Select Todo importance</label>
        <select
          id="addform-form-importance"
          className="addform-form-importance"
          name="importanceInput"
          onChange={handleChange}
          value={newTodoInfo.importance}
        >
          <option value={importance.HIGH}>{importance.HIGH}</option>
          <option value={importance.MEDIUM}>{importance.MEDIUM}</option>
          <option value={importance.LOW}>{importance.LOW}</option>
          <option value={importance.NONE}>{importance.NONE}</option>
        </select>
        <button className="addform-form-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddForm;
