import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

function Nav() {
  return (
    // <nav
    //   className="navbar navbar-expand-lg"
    //   style={{ backgroundColor: "#495A3A", padding: "1.5rem 1.5rem" }}
    // >
    //   <div className="container-md">
    //     <a className="navbar-brand" href="/">
    //     <img src={logo}  style={{ width: "100px", height: "auto" }} />
    //     </a>

    //     {/* ปุ่มย่อยุบ */}
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNav"
    //       aria-controls="navbarNav"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     <div className="collapse navbar-collapse" id="navbarNav">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <NavLink
    //             to="/"
    //             className={({ isActive }) =>
    //               `nav-link ${isActive ? "active" : ""} text-white`
    //             }
    //             style={{ fontWeight: "bold" }}
    //           >
    //             Home
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink
    //             to="/plan"
    //             className={({ isActive }) =>
    //               `nav-link ${isActive ? "active" : ""} text-white`
    //             }
    //             style={{ fontWeight: "bold" }}
    //           >
    //             Plan
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink
    //             to="/favorite"
    //             className={({ isActive }) =>
    //               `nav-link ${isActive ? "active" : ""} text-white`
    //             }
    //             style={{ fontWeight: "bold" }}
    //           >
    //             Favorite
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>

    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Offcanvas navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              Offcanvas
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li></li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form class="d-flex mt-3" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
