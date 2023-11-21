import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";
import { scarcity } from "utils/player.js";

interface ChartDoughnutPlayerAvailabilityProps {
  freeAgentCount?: number;
  total?: number;
}

const ChartDoughnutPlayerAvailability: React.FC<ChartDoughnutPlayerAvailabilityProps> = ({ freeAgentCount, total }) => {

  const getData = () => ({
    labels: ["Free agent", "Under contract"],
    datasets: [
      {
        backgroundColor: ["#0dcaf0", "#adb5bd"],
        data: [freeAgentCount, total - freeAgentCount]
      },
    ],
  });

  const getOptions = () => ({
  	responsive: true,
    maintainAspectRatio: false,
    plugins: {
	  legend: {
	    position: 'bottom',
	  }
	},
  });

  return (
    <div className="py-4 px-1 px-md-3">
      <div className="ratio ratio-16x9 w-100">
        {(!freeAgentCount || !total)
          ? <LoadingSquare />
      	  : <Doughnut
      	  	data={getData()}
      	  	options={getOptions()}
      	  />
      	}
      </div>
    </div>
  );
};

export default ChartDoughnutPlayerAvailability;