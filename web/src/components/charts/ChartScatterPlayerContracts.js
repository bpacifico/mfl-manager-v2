import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { divisions, getDivisionColor } from "utils/division.js";
import LoadingSquare from "components/loading/LoadingSquare";
import { computeLinearRegression } from "utils/chart.js";

interface Player {
  id: number;
}

interface ChartScatterPlayerContractsProps {
  players: Player[];
}

const ChartScatterPlayerContracts: React.FC<ChartScatterPlayerContractsProps> = ({ players }) => {
  const [displayLinearRegression, setDisplayLinearRegression] = useState(false);

  const computeData = () => {
    const data = [];

    for (let i = 0; i < players.length; i++) {
      data.push({
        x: players[i].metadata?.overall,
        y: players[i].activeContract?.revenueShare / 100,
      });
    }

    return data;
  }

  const computeBackgroundColor = () => {
    const data = [];

    for (let i = 0; i < players.length; i++) {
      data.push(getDivisionColor(players[i].activeContract?.club?.division));
    }

    return data;
  }

  const buildDivisionLegend = (chart, id) => {
    const legendContainer = document.getElementById("ChartScatterPlayerContracts-legend");
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
      divisions.map((d) => {
        listContainer = document.createElement('ul');
        listContainer.style.display = 'flex';
        listContainer.style.flexDirection = 'row';
        listContainer.style.margin = 0;
        listContainer.style.padding = 0;

        legendContainer.appendChild(listContainer);

        return "";
      });
    }

    return listContainer;
  };

  const computeLinearRegressionDataset = () => {
    let data = [];

    if (!displayLinearRegression) {
      return data;
    }

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
          type: "line",
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
    <div className="mb-4 py-2 px-1 px-md-3">
      <div className="text-end px-3">
        <small>
          Display LR
          <input
            type="checkbox"
            className="ms-1"
            value={displayLinearRegression}
            onChange={() => setDisplayLinearRegression(!displayLinearRegression)}
          />
        </small>
      </div>

      <div className="ratio ratio-16x9 w-100">
        {!players
          ? <LoadingSquare />
          : <>
            <Chart
              data={{
                datasets: [
                  {
                    type: "scatter",
                    data: computeData(),
                    pointBackgroundColor: computeBackgroundColor(),
                    pointBorderWidth : 0,
                  },
                ].concat(computeLinearRegressionDataset()),
              }}
              options={{
                scales: {
                  x: {
                    ticks: {
                      color: "#AAA",
                      stepSize: 1
                    },
                    type: 'linear',
                    position: 'bottom',
                    title: {
                      display: true,
                      text: 'Player overall score',
                    },
                    grid: {
                      color: '#333',
                    },
                  },
                  y: {
                    ticks: {
                      color: "#AAA",
                    },
                    type: 'linear',
                    position: 'left',
                    title: {
                      display: true,
                      text: 'Revenue share (%)',
                    },
                    grid: {
                      color: '#333',
                    },
                  },
                },
                plugins: {
                  htmlLegend: {
                    containerID: 'ChartScatterPlayerContracts-legend',
                  },
                  legend: {
                    display: false,
                  }
                }
              }}
              plugins={[buildDivisionLegend]}
            />
          </>
        }
      </div>
  	</div>
  );
};

export default ChartScatterPlayerContracts;