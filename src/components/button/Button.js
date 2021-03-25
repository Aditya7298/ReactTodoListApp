import React from "react";
import "./Button.css";

export const Button = React.memo(({ children, onClick }) => {
  const handleClick = (event) => {
    onClick(event);
  };

  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
});
