import React from 'react';
import "./Footer.css";
import { Link } from 'react-router-dom';
import BoxSocials from "components/box/BoxSocials.js";

interface FooterProps {}

const Footer: React.FC < FooterProps > = (props) => {
  return (
    <div id="Footer" className="mt-5 p-5">
    	<div className="container py-5 px-3 px-md-5">
	      <div className="row">
	      	<div className="col-12 col-md-2 p-4 p-md-1">
	      		<div className="text-md-start">
		      		<div className="h6">
		      			<Link to="/">
		            	<i className="bi bi-house me-2"></i>Home
		          	</Link>
		          </div>

		          {/* <div className="h6">
		          	<Link to="/map">
		            	<i className="bi bi-globe-americas me-2"></i>Map
		          	</Link>
		          </div> */}

		          <div className="h6">
		          	<Link to="/notification">
		            	<i className="bi bi-alarm me-2"></i>Notif. center
		          	</Link>
		          </div>
	          </div>
	      	</div>

	      	<div className="col-6 col-md-2 p-4 p-md-1">
	      		<h5 className="text-white">Dashboard</h5>

	      		<div>
	          	<Link to="/dash/marketplace">
	            	Marketplace
	          	</Link>
	          </div>

	          <div>
	          	<Link to="/dash/clubs">
	            	Clubs
	          	</Link>
	          </div>

	          <div>
	      			<Link to="/dash/players">
	            	Players
	          	</Link>
	          </div>
	      	</div>

	      	<div className="col-6 col-md-2 p-4 p-md-1">
	      		<h5 className="text-white">Tools</h5>

	      		<div>
	      			<Link to="/tools/team-builder">
	            	Team builder
	          	</Link>
	          </div>
	      	</div>

	      	<div className="col-12 col-md-6 p-4 p-md-1">
	      		<div className="w-100 d-flex justify-content-center justify-content-md-end pt-4">
	      			<BoxSocials />
	      		</div>
	      	</div>
	      </div>
	    </div>
    </div>
  );
}

export default Footer;