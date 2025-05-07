import React from 'react';
import "./PageHome.css";
import Search from 'components/Search.js'

const PageHome: React.FC < PageHomeProps > = ({ yScrollPosition }) => {
  return (
    <div id="PageHome">
    <Search mode="home"/>


    <footer className="footer bg-black d-none d-md-block text-white text-center py-3 mt-auto">
       <div>Built by <a href="https://x.com/mflmanagerfr">@mflmanagerfr</a>.</div>
    </footer>

    </div>


  );
};


export default PageHome;