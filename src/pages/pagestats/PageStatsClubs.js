import React from 'react';
import "./PageStatsClubs.css";

interface PageStatsClubsProps {}

const PageStatsClubs: React.FC<PageStatsClubsProps> = ({ initialValue }) => {
  return (
    <div id="PageStatsClubs" className="d-flex align-items-center justify-content-center w-100 h-100">
      <img src="/media/images/mower.svg" className="mower" alt="Mower"/>
      <span>Gardeners are working on it...</span>
    </div>
  );
};

export default PageStatsClubs;