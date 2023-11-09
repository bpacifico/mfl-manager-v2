import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

interface Trade {
  id: number;
}

interface ChartLinePlayerTradesProps {
  trades: Trade[];
}

const ChartLinePlayerTrades: React.FC<ChartLinePlayerTradesProps> = ({ trades }) => {
  
  const computeData = () => {
    const data = {};

    for (let i = 0; i < trades.length; i++) {
      let date = new Date(trades[i].purchaseDateTime);
      date = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDay() + 1).toString().padStart(2, '0')}`

      if (!data[date]) {
        data[date] = 1;
      } else {
        data[date] += 1;
      }
    }

    return data;
  }

  return (
    <div className="py-4 px-1 px-md-3">
      <div className="ratio ratio-16x9 w-100">
        <Line
          data={{
            labels: [],
            datasets: [
              {
                data: computeData(),
                fill: false,
                borderColor: "#03C988",
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
                  beginAtZero: true,
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
      </div>
  	</div>
  );
};

export default ChartLinePlayerTrades;