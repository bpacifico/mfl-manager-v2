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

    <footer className="footer bg-black d-none d-md-block text-white text-center py-3 mt-auto">
       <div>Built by <a href="https://x.com/mflmanagerfr">@mflmanagerfr</a>.</div>
    </footer>

    </div>


  );
};


export default PageHome;