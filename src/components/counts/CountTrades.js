import React from 'react';
import Count from "./Count.js";

interface Trade {
  id: number;
}

interface CountTradesProps {
  trades: Trade[];
}

const CountTrades: React.FC<CountTradesProps> = ({ trades }) => {
  return (
    <Count
    	label="Trades"
    	count={trades?.length}
    />
  );
};

export default CountTrades;