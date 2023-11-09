import React from 'react';
import Count from "./Count.js";

interface Competition {
  id: number;
}

interface CountCompetitionsProps {
  competitions: Competition[];
}

const CountCompetitions: React.FC<CountCompetitionsProps> = ({ competitions }) => {
  return (
    <Count
    	label="Competitions"
    	count={competitions?.length}
    />
  );
};

export default CountCompetitions;