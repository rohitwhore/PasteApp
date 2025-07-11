import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // ✅ Import the CSS file

const Navbar = () => {
  return (
    <div className="navbar-container">
      {NavbarData.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.path}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          {link.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
