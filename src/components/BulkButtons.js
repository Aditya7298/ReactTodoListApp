import "./BulkButtons.css";
import BulkDeleteIcon from "./Icons/delete.png";
import BulkToggleIcon from "./Icons/toggle.png";

const BulkButtons = ({ onBulkDelete, onBulkToggle }) => {
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
    </div>
  );
};

export default BulkButtons;
