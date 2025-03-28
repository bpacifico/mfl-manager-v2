import React from 'react';
import "./Menu.css";
import { Link, useLocation } from 'react-router-dom';

interface MenuProps {}

const Menu: React.FC < MenuProps > = (props) => {
  const location = useLocation();

  const getMenuLabel = (text, cl) => {
    return <span
      className={
        "text-center text-capitalize w-100 " +
        "lh-1 py-0 py-md-3 pt-md-1 pb-md-2 px-1 px-md-0 "
        + cl
      }
    >
      {text}
    </span>
  }

return (
  <nav id="Menu" className="navbar px-3 py-2 w-100">
    <div className="d-flex flex-row align-items-center w-100">
      <ul className="d-flex navbar-nav h4 w-100 flex-row justify-content-between align-items-center">
        {/* Premier élément "Manager" aligné à gauche */}
        <li className="nav-item">
          <div className="d-flex align-items-center px-2 px-md-0">
            <Link
              to="/"
              className={"nav-link" + (location.pathname === "/" ? " active" : "")}
              style={{ lineHeight: "48px" }} 
            >
              <img
                src="/images/MFLFR.png"
                alt="Home"
                width="48"
                height="48"
                className="me-2"
              />
                <span className="d-none d-md-inline">
              {getMenuLabel("Manager", "d-md-inline")}
                </span>
            </Link>
          </div>
        </li>

        {/* Autres éléments comme "Club" alignés à droite */}
        {location.pathname !== "/club" && (
          <li className="nav-item">
            <Link
              to="/club"
              className={"nav-link px-5" + (location.pathname === "/club" ? " active" : "")}
            >
              <i className="bi bi-people-fill me-2"></i>
              {getMenuLabel("Club", "d-md-inline")}
            </Link>
          </li>
        )}
      </ul>
    </div>
  </nav>
);
}

export default Menu;