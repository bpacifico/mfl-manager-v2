import React from 'react';
import { Bar } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";
import { scarcity } from "utils/player.js";

interface ChartPyramidPlayerScarcitiesProps {
  scarcityCount?: dict;
}

const ChartPyramidPlayerScarcities: React.FC<ChartPyramidPlayerScarcitiesProps> = ({ scarcityCount }) => {

  const getData = () => ({
    labels: Object.keys(scarcityCount).reverse(),
    datasets: [
      {
        stack: "Stack 0",
        backgroundColor: scarcity.map((d) => d.color).reverse(),
        data: Object.values(scarcityCount).reverse(),
      },
      {
        stack: "Stack 0",
        backgroundColor: scarcity.map((d) => d.color).reverse(),
        data: Object.values(scarcityCount).reverse().map((k) => -k),
      },
    ],
  });

  const getOptions = () => ({
  	indexAxis: 'y',
  	barPercentage: 1.0,
  	categoryPercentage: 1.0,
    scales: {
    	x: {
		    stacked: false,
		    ticks: {
		      beginAtZero: true,
		      display: false,
		      callback: (v) => {
		        return v < 0 ? -v : v;
		      },
		    },
		    grid: {
          display: false,
          drawBorder: false,
        },
        border: {
	      	display: false,
	      },
		  },
			y: {
		    stacked: true,
		    ticks: {
		    	color: "#AAA",
		      beginAtZero: true,
		    },
		    position: "left",
		    grid: {
	        display: false,
	        drawBorder: false,
	      },
	      border: {
	      	display: false,
	      },
		  },
		},
		plugins: {
      legend: {
        display: false
      },
    }
  });

  return (
    <div className="py-4 px-1 px-md-3">
      <div className="ratio ratio-16x9 w-100">
        {!scarcityCount
          ? <LoadingSquare />
      	  : <Bar
      	  	data={getData()}
      	  	options={getOptions()}
      	  />
      	}
      </div>
    </div>
  );
};

export default ChartPyramidPlayerScarcities;