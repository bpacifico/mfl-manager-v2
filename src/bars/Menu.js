import React from 'react';
import "./Menu.css";
import { Link, useLocation } from 'react-router-dom';

interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
  const location = useLocation();

  return (
    <nav id="Menu" className="navbar h-100 px-3 px-md-4 py-3">
      <ul className="navbar-nav flex-column h4">
        <li className="nav-item">
          <Link
            to="/"
            className={"nav-link" + (location.pathname === "/" ? " active" : "")}
          >
            {location.pathname === "/"
              && <span
                className="text-center text-capitalize w-100 lh-1 pt-1 pb-2"
              >
                Home
              </span>
            }
            <div>
              {location.pathname === "/"
                ? <i className="bi bi-house-fill"></i>
                : <i className="bi bi-house"></i>
              }
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/dash"
            className={"nav-link" + (location.pathname.startsWith("/dash") ? " active" : "")}
          >
            {location.pathname.startsWith("/dash")
              && <span
                className="text-center text-capitalize w-100 lh-1 pt-1 pb-2"
              >
                MFL Dash
              </span>
            }
            <div>
              {location.pathname.startsWith("/dash")
                ? <i className="bi bi-clipboard-data-fill"></i>
                : <i className="bi bi-clipboard-data"></i>
              }
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/mercato"
            className={"nav-link" + (location.pathname.startsWith("/mercato") ? " active" : "")}
          >
            {location.pathname.startsWith("/mercato")
              && <span
                className="text-center text-capitalize w-100 lh-1 pt-1 pb-2"
              >
                Mercato
              </span>
            }
            <div>
              {location.pathname.startsWith("/mercato")
                ? <i className="bi bi-person-vcard-fill"></i>
                : <i className="bi bi-person-vcard"></i>
              }
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/map"
            className={"nav-link" + (location.pathname.startsWith("/map") ? " active" : "")}
          >
            {location.pathname.startsWith("/map")
              && <span
                className="text-center text-capitalize w-100 lh-1 pt-1 pb-2"
              >
                Map
              </span>
            }
            <div>
              {location.pathname.startsWith("/map")
                ? <i className="bi bi-globe-europe-africa"></i>
                : <i className="bi bi-globe-americas"></i>
              }
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}



export default Menu;
