import React from 'react';
import "./PageStatsPlayers.css";

interface PageStatsPlayersProps {}

const PageStatsPlayers: React.FC<PageStatsPlayersProps> = ({ initialValue }) => {
  return (
    <div id="PageStatsPlayers" className="d-flex align-items-center justify-content-center w-100 h-100">
      <img src="/media/images/mower.svg" className="mower" alt="Mower"/>
      <span>Gardeners are working on it...</span>
    </div>
  );
};

export default PageStatsPlayers;