import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";
import { sortDataset } from "utils/chart.js";
import { unixTimestampToDayString } from "utils/date.js";

interface Trade {
  id: number;
}

interface ChartLinePlayerTradesProps {
  trades: Trade[];
}

const ChartLinePlayerTrades: React.FC<ChartLinePlayerTradesProps> = ({ trades }) => {
  
  const computeData = () => {
    let data = {};

    for (let i = 0; i < trades.length; i++) {
      let day = unixTimestampToDayString(trades[i].purchaseDateTime);

      if (!data[day]) {
        data[day] = 1;
      } else {
        data[day] += 1;
      }
    }

    return sortDataset(data);
  }

  return (
    <div className="mb-4 py-2 px-1 px-md-3">
      <div className="ratio ratio-16x9 w-100">
        {!trades
          ? <LoadingSquare />
          : <Line
            data={{
              labels: [],
              datasets: [
                {
                  data: computeData(),
                  fill: false,
                  borderColor: "#0dcaf0",
                  lineTension: 0.3,
                },
              ],
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
                    text: 'Day',
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
                    text: 'Trade',
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

export default ChartLinePlayerTrades;