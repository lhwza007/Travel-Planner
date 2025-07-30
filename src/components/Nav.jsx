import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

function Nav() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#495A3A", padding: "1.5rem 1.5rem" }}
    >
      <div className="container-md">
        <a className="navbar-brand" href="/">
        <img src={logo}  style={{ width: "100px", height: "auto" }} />
        </a>

        {/* ปุ่มย่อยุบ */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} text-white`
                }
                style={{ fontWeight: "bold" }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/plan"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} text-white`
                }
                style={{ fontWeight: "bold" }}
              >
                Plan
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/favorite"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} text-white`
                }
                style={{ fontWeight: "bold" }}
              >
                Favorite
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
