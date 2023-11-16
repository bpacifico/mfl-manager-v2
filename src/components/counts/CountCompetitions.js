import React from 'react';
import Count from "./Count.js";

interface Competition {
  id: number;
}

interface CountCompetitionsProps {
  label?: string;
  competitions: Competition[];
}

const CountCompetitions: React.FC<CountCompetitionsProps> = ({ label, competitions }) => {
  return (
    <Count
    	label={label || "Competitions"}
    	count={competitions?.length}
    />
  );
};

export default CountCompetitions;