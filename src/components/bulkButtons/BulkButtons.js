import React from "react";
import "./BulkButtons.css";
import BulkDeleteIcon from "./icons/delete.png";
import BulkToggleIcon from "./icons/toggle.png";

export const BulkButtons = React.memo(({ onBulkDelete, onBulkToggle }) => {
  return (
    <div className="bulkbuttons">
      <span
        onClick={() => {
          onBulkDelete();
        }}
        className="bulkbuttons-delete"
      >
        <img
          alt="Delete Selected Todos"
          className="bulkbuttons-delete-icon"
          src={BulkDeleteIcon}
        ></img>
      </span>
      <span className="bulkbuttons-delete-text">
        Delete
        <br />
        selected
        <br />
        todos
      </span>
      <span
        onClick={() => {
          onBulkToggle();
        }}
        className="bulkbuttons-toggle"
      >
        <img
          alt="Toggle Selected Todos"
          className="bulkbuttons-toggle-icon"
          src={BulkToggleIcon}
        ></img>
      </span>
      <span className="bulkbuttons-toggle-text">
        Toggle
        <br />
        selected
        <br />
        todos
      </span>
    </div>
  );
});
