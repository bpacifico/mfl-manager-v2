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
    <nav id="Menu" className="navbar h-100 flex-md-column px-3 py-2">
      <div className="d-flex flex-grow-1 align-items-md-center">
        <ul className="navbar-nav flex-row flex-md-column h4">
          <li className="nav-item">
            <Link
              to="/"
              className={"nav-link" + (location.pathname === "/" ? " active" : "")}
            >
              {location.pathname === "/"
                && getMenuLabel("Home", "d-none d-md-inline")
              }
              <div className="px-2 px-md-0 order-2 order-md-1">
                {location.pathname === "/"
                  ? <i className="bi bi-house-fill"></i>
                  : <i className="bi bi-house"></i>
                }
              </div>
              {location.pathname === "/"
                && getMenuLabel("Home", "d-inline d-md-none")
              }
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;