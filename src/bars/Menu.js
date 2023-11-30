import React from 'react';
import "./Menu.css";
import { Link, useLocation } from 'react-router-dom';

interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
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
    <nav id="Menu" className="navbar h-100 justify-content-center px-3 px-md-4 py-2">
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
        <li className="nav-item">
          <Link
            to="/dash"
            className={"nav-link" + (location.pathname.startsWith("/dash") ? " active" : "")}
          >
            {location.pathname.startsWith("/dash")
              && getMenuLabel("MFL Dash", "d-none d-md-inline")
            }
            <div className="px-2 px-md-0">
              {location.pathname.startsWith("/dash")
                ? <i className="bi bi-clipboard-data-fill"></i>
                : <i className="bi bi-clipboard-data"></i>
              }
            </div>
            {location.pathname.startsWith("/dash")
              && getMenuLabel("MFL Dash", "d-inline d-md-none")
            }
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/mercato"
            className={"nav-link" + (location.pathname.startsWith("/mercato") ? " active" : "")}
          >
            {location.pathname.startsWith("/mercato")
              && getMenuLabel("Mercato", "d-none d-md-inline")
            }
            <div className="px-2 px-md-0">
              {location.pathname.startsWith("/mercato")
                ? <i className="bi bi-person-vcard-fill"></i>
                : <i className="bi bi-person-vcard"></i>
              }
            </div>
            {location.pathname.startsWith("/mercato")
              && getMenuLabel("Mercato", "d-inline d-md-none")
            }
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/map"
            className={"nav-link" + (location.pathname.startsWith("/map") ? " active" : "")}
          >
            {location.pathname.startsWith("/map")
              && getMenuLabel("Map", "d-none d-md-inline")
            }
            <div className="px-2 px-md-0">
              {location.pathname.startsWith("/map")
                ? <i className="bi bi-globe-europe-africa"></i>
                : <i className="bi bi-globe-americas"></i>
              }
            </div>
            {location.pathname.startsWith("/map")
              && getMenuLabel("Map", "d-inline d-md-none")
            }
          </Link>
        </li>
      </ul>
    </nav>
  );
}



export default Menu;
