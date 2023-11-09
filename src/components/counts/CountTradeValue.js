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
    	label="Value traded"
    	count={"$"
    	  + trades?.map((t) => t.price)
    	    .reduce((a, b) => a + b, 0)}
    />
  );
};

export default CountTrades;