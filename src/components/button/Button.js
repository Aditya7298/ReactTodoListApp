import "./Button.css";

export const Button = ({ children, onClick }) => {
  const handleClick = (event) => {
    onClick(event);
  };

  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
};
