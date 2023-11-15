import React from 'react';
import Count from "./Count.js";

interface Player {
  id: number;
}

interface CountContractRevenueShareProps {
  players: Player[];
}

const CountContractRevenueShare: React.FC<CountContractRevenueShareProps> = ({ players }) => {
  return (
    <Count
    	label="Revenue share"
    	count={players
        ? players.map((t) => t.activeContract.revenueShare)
          .reduce((a, b) => a + b, 0) + "%"
        : undefined
      }
    />
  );
};

export default CountContractRevenueShare;