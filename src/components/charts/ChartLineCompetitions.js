import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";
import { sortDataset, fillMonthlyDataset } from "utils/chart.js";
import { unixTimestampToMonthString } from "utils/date.js";

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
      let month = unixTimestampToMonthString(competitions[i].startingDate);

      if (!data[month]) {
        data[month] = 1;
      } else {
        data[month] += 1;
      }
    }

    return sortDataset(fillMonthlyDataset(data));
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
                  time: {
                    unit: 'month'
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