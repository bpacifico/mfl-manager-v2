import React from 'react';
import { Link } from 'react-router-dom';
import * as fcl from "@onflow/fcl";
import { shortenHex } from "utils/address.js";

interface ButtonLoginProps {
  className?: string;
  user: object;
}

const ButtonLogin: React.FC<ButtonLoginProps> = (props) => {

  const logIn = () => {
    fcl.authenticate();
  };

  const logOut = () => {
    fcl.unauthenticate();
  };

  return (
    <Link
	    className={props.className}
	    onClick={props.user?.loggedIn ? logOut : logIn}
	  >
	    <div className="ps-3 pe-1 py-md-2 px-md-0">
	      {props.user?.loggedIn
	        ? <div
	          className="Menu-logout d-inline-block align-items-center text-center"
	          title="Logout"
	        >
	          <div className="text-center">
	            <i className="bi bi-person-fill lh-1 px-1"></i>
	            <div className="d-block w-100 lh-1">{shortenHex(props.user.addr)}</div>
	          </div>
	        </div>
	        : <div
	          className="Menu-login d-inline-block align-items-center text-center"
	          title="Login"
	        >
	          <div className="text-center">
	            <i className="bi bi-person-fill-check lh-1 px-1"></i>
	            <div className="d-block w-100 lh-1">LOGIN</div>
	          </div>
	        </div>
	      }
	    </div>
	  </Link>
  );
};

export default ButtonLogin;