import "./Navbar.css";

const Navbar = () => {
  const currDate = new Date();
  const dateString = currDate.toDateString().slice(4);
  return (
    <div className="navbar">
      <span className="navbar-title">Todo-List App</span>
      <span className="navbar-date">{dateString}</span>
    </div>
  );
};

export default Navbar;
