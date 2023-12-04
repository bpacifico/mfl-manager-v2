import React from 'react';
import "./BoxSocials.css";

interface BoxSocialsProps {
}

const BoxSocials: React.FC<BoxSocialsProps> = () => {
  return (
    <div
      className="BoxSocials"
      style={{ zIndex: 1000 }}
    >
      <div className="border border-2 border-body rounded-3 px-5 py-2">
      	<div className="social-title text-body small">
      		Contact <i className="bi bi-emoji-smile-fill"></i>
      	</div>

        <a className="h4 me-3" href="https://discord.com/users/_alexisp.">
          <i className="bi bi-discord text-info"></i>
        </a>

        <a className="text-white h5" href="https://twitter.com/AlexisPrunier_">
          <i className="bi bi-twitter-x text-info"></i>
        </a>
      </div>
    </div>
  );
};

export default BoxSocials;