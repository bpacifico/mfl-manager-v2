import React from 'react';
import { Bar } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";
import { scarcity } from "utils/player.js";

interface Player {
  id: number;
}

interface ChartPyramidPlayerScarcitiesProps {
  players: Player[];
}

const ChartPyramidPlayerScarcities: React.FC<ChartPyramidPlayerScarcitiesProps> = ({ players }) => {

  const data = {
    labels: scarcity.map((d) => d.name),
    datasets: [
      {
        label: 'Positive',
        stack: "Stack 0",
        backgroundColor: scarcity.reverse().map((d) => d.color),
        data: scarcity.reverse().map((_, i) => 1 + i * 3),
      },
      {
        label: 'Negative',
        stack: "Stack 0",
        backgroundColor: scarcity.reverse().map((d) => d.color),
        data: scarcity.reverse().map((_, i) => 1 + i * 3).map((k) => -k),
      },
    ],
  };

  const options = {
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
  };

  return (
    <div className="py-4 px-1 px-md-3">
      <div className="ratio ratio-16x9 w-100">
        {!players
          ? <LoadingSquare />
      	  : <Bar
      	  	data={data}
      	  	options={options}
      	  />
      	}
      </div>
    </div>
  );
};

export default ChartPyramidPlayerScarcities;