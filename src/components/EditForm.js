import { useState, useCallback } from "react";
import { importance } from "../constants";
import Button from "./Button";
import OptionsList from "./OptionsList";
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

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormInput({ ...formInput, [name]: value });
    },
    [formInput]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      hideEditForm();
      onSubmit(todoId, formInput.title, formInput.importance);
    },
    [hideEditForm, onSubmit, formInput, todoId]
  );

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>Edit Todo</h3>
        <form className="modal-editform" onSubmit={handleSubmit}>
          <label htmlFor="editform-title">Edit Todo title</label>
          <input
            type="text"
            name="title"
            id="editform-title"
            value={formInput.title}
            onChange={handleChange}
          ></input>
          <OptionsList
            options={Object.values(importance)}
            value={formInput.importance}
            onChange={handleChange}
            labelText="Edit Todo importance"
            name="importance"
          />
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={hideEditForm}>Cancel</Button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
