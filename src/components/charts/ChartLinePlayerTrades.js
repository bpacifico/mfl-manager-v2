import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";

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
      let date = new Date(trades[i].purchaseDateTime);
      date = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate() + 1).toString().padStart(2, '0')}`

      if (!data[date]) {
        data[date] = 1;
      } else {
        data[date] += 1;
      }
    }

    data = Object.keys(data)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = data[key];
        return accumulator;
      }, {});

    return data;
  }

  return (
    <div className="py-4 px-1 px-md-3">
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