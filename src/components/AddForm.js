import { useState, useCallback } from "react";
import { importance } from "../constants";
import Button from "./Button";
import OptionsList from "./OptionsList";
import "./AddForm.css";

const AddForm = ({ onAdd }) => {
  const [newTodoInfo, setNewTodoInfo] = useState({
    titleInput: "",
    importanceInput: importance.HIGH,
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setNewTodoInfo((prevNewTodoInfo) => ({
      ...prevNewTodoInfo,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onAdd({
        title: newTodoInfo.titleInput,
        importance: newTodoInfo.importanceInput,
      });
      setNewTodoInfo({ titleInput: "", importanceInput: importance.HIGH });
    },
    [onAdd, newTodoInfo]
  );

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
        <OptionsList
          options={Object.values(importance)}
          value={newTodoInfo.importanceInput}
          onChange={handleChange}
          labelText="Select Todo importance"
          name="importanceInput"
        />
        <Button onClick={handleSubmit}>Add todo</Button>
      </form>
    </div>
  );
};

export default AddForm;
