import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import { divisions, getDivisionColor } from "utils/division.js";
import LoadingSquare from "components/loading/LoadingSquare";

interface Player {
  id: number;
}

interface ChartScatterPlayerContractsProps {
  players: Player[];
}

const ChartScatterPlayerContracts: React.FC<ChartScatterPlayerContractsProps> = ({ players }) => {
  
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

  return (
    <div className="py-4 px-1 px-md-3">
      <div className="ratio ratio-16x9 w-100">
        {!players
          ? <LoadingSquare />
          : <Scatter
            data={{
              datasets: [
                {
                  data: computeData(),
                  pointBackgroundColor: computeBackgroundColor(),
                  pointBorderWidth : 0,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  ticks: {
                    color: "#AAA",
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
                    text: 'Contract rate (%)',
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
        }
      </div>
  	</div>
  );
};

export default ChartScatterPlayerContracts;