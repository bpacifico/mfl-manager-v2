import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";
import { divisions } from "utils/division.js";
import { computeLinearRegression } from "utils/chart.js";

interface Player {
  id: number;
}

interface ChartLinePlayerContractLinearRegressionProps {
  players: Player[];
}

const ChartLinePlayerContractLinearRegression: React.FC<ChartLinePlayerContractLinearRegressionProps> = ({ players }) => {
  
  const computeDataset = () => {
    let data = [];

    for (let i = 0; i < divisions.length; i++) {
    	let divisionContracts = players.filter((p) => divisions[i].number === p.activeContract?.club?.division);

    	if (divisionContracts.length > 1) {
    		const points = divisionContracts.map((p) => (
  				{
  					x: p.metadata?.overall,
      			y: p.activeContract?.revenueShare / 100,
    			}
  			));

    		let line = computeLinearRegression(points);

    		const minX = Math.min(...points.map((p) => p.x));
    		const maxX = Math.max(...points.map((p) => p.x));

    		data.push({
    			data: {
    				[minX]: line.m * minX + line.b,
    				[maxX]: line.m * maxX + line.b,
    			},
    			fill: false,
          borderColor: divisions[i].color,
    		})
    	}
    }

    return data;
  }

  return (
    <div className="py-4 px-1 px-md-3">
      <div className="ratio ratio-16x9 w-100">
        {!players
          ? <LoadingSquare />
          : <Line
            data={{
              labels: [],
              datasets: computeDataset(),
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#AAA",
                  },
                  title: {
                    display: true,
                    text: 'Player overall score',
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    color: "#AAA",
                  },
                  title: {
                    display: true,
                    text: 'Contract rate (%)',
                  },
                  grid: {
                    color: '#333',
                  },
                },
              },
            }}
          />
        }
      </div>
  	</div>
  );
};

export default ChartLinePlayerContractLinearRegression;