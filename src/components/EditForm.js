import { useState } from "react";
import { importance } from "../constants";
import "./EditForm.css";

const EditForm = ({
  todoId,
  todoTitle,
  todoImportance,
  onSubmit,
  hideEditForm,
}) => {
  const [formInput, setFormInput] = useState({
    title: todoTitle,
    importance: todoImportance,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    hideEditForm();
    onSubmit(todoId, formInput.title, formInput.importance);
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h4>Edit Todo</h4>
        <form className="modal-editform" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formInput.title}
            onChange={handleChange}
          ></input>
          <select
            name="importance"
            onChange={handleChange}
            value={formInput.importance}
          >
            <option value={importance.HIGH}>{importance.HIGH}</option>
            <option value={importance.MEDIUM}>{importance.MEDIUM}</option>
            <option value={importance.LOW}>{importance.LOW}</option>
            <option value={importance.NONE}>{importance.NONE}</option>
          </select>
          <button type="submit">Submit</button>
          <button onClick={() => hideEditForm()}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
