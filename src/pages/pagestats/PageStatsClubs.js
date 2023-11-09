import React, { useState, useEffect } from 'react';
import { getApiEndpoint } from "utils/env.js";

interface PageStatsClubsProps {}

const PageStatsClubs: React.FC<PageStatsClubsProps> = ({ initialValue }) => {
  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await fetch(getApiEndpoint() + 'competitions?past=true');
      const jsonData = await response.json();
      setCompetitions(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="row">
      <div className="col">
      </div>
    </div>
  );
};

export default PageStatsClubs;