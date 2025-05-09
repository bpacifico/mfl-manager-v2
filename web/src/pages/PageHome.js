import React from 'react';
import "./PageHome.css";
import Search from 'components/Search.js'

const PageHome: React.FC < PageHomeProps > = ({ yScrollPosition }) => {
  return (
    <div id="PageHome">
    <div className="container py-4 d-flex flex-column justify-content-center align-items-center">
    <h1>MFL Manager</h1>
    <Search mode="home"/>
    </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button onClick={() => window.open("https://v1.mflmanager.fr/intro.html", "_blank")} className="btn btn-secondary">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/320px-Flag_of_France.svg.png"
          alt="French Flag"
          style={{ width: "20px", marginRight: "8px", verticalAlign: "middle" }}
        />
          Découvrir MFL
        </button>
      </div>

    <footer className="footer bg-black d-none d-md-block text-white text-center py-3 mt-auto">
       <div>Built by <a href="https://x.com/mflmanagerfr">@mflmanagerfr</a>.</div>
    </footer>

    </div>


  );
};


export default PageHome;