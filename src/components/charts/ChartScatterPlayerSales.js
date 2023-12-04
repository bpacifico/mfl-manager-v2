import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";
import { getOverallColor } from "utils/player.js";

interface Sale {
  id: number;
}

interface ChartScatterPlayerSalesProps {
  sales: Sale[];
}

const ChartScatterPlayerSales: React.FC<ChartScatterPlayerSalesProps> = ({ sales }) => {
  
  const computeData = () => {
    const data = [];

    for (let i = 0; i < sales.length; i++) {
      data.push({
        x: sales[i].player?.metadata?.overall,
        y: sales[i].price,
      });
    }

    return data;
  }

  const computeBackgroundColor = () => {
    const data = [];

    for (let i = 0; i < sales.length; i++) {
      data.push(getOverallColor(sales[i].player?.metadata?.overall));
    }

    return data;
  }

  return (
    <div className="mb-4 py-2 px-1 px-md-3">
      <div className="ratio ratio-16x9 w-100">
        {!sales
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
                    text: 'Price',
                  },
                  grid: {
                    color: '#333',
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                }
              }
            }}
          />
        }
      </div>
  	</div>
  );
};

export default ChartScatterPlayerSales;