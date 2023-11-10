import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";

interface Competition {
  id: number;
}

interface ChartLineCompetitionsProps {
  competitions: Competition[];
}

const ChartLineCompetitions: React.FC<ChartLineCompetitionsProps> = ({ competitions }) => {
  
  const computeData = () => {
    const data = {};

    for (let i = 0; i < competitions.length; i++) {
      let date = new Date(competitions[i].startingDate);
      date = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`

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
        {!competitions
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
                    beginAtZero: true,
                  },
                  title: {
                    display: true,
                    text: 'Month',
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
                    text: 'Competition',
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

export default ChartLineCompetitions;