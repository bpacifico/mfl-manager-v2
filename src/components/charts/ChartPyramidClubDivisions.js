import React from 'react';
import { Bar } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";
import { divisions } from "utils/division.js";

interface Club {
  id: number;
}

interface ChartPyramidClubDivisionsProps {
  competitions: Club[];
}

const ChartPyramidClubDivisions: React.FC<ChartPyramidClubDivisionsProps> = ({ clubs }) => {

  const data = {
    labels: divisions.map((d) => d.name),
    datasets: [
      {
        label: 'Positive',
        stack: "Stack 0",
        backgroundColor: divisions.map((d) => d.color),
        data: divisions.map((d) => d.number * 3),
      },
      {
        label: 'Negative',
        stack: "Stack 0",
        backgroundColor: divisions.map((d) => d.color),
        data: divisions.map((d) => d.number * 3).map((k) => -k),
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
        {!clubs
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

export default ChartPyramidClubDivisions;