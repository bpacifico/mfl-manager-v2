import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";
import { sortDataset, fillMonthlyDataset } from "utils/chart.js";
import { unixTimestampToMonthString } from "utils/date.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  ChartDataLabels
);

interface ChartBarClubsPerOwnerProps {
  data ? : object;
}

const ChartBarClubsPerOwner: React.FC < ChartBarClubsPerOwnerProps > = ({ data }) => {

  const getData = () => ({
    labels: data.sort((a, b) => a.key - b.key).map((d) => d.key),
    datasets: [{
      data: data.sort((a, b) => a.key - b.key).map((d) => d.count),
    }],
    backgroundColor: "#0dcaf0",
  });

  return (
    <div className="h-100 w-100">
      {!data
        ? <LoadingSquare />
        : <Bar
          data={getData()}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                anchor: 'end',
                align: 'end',
                color: 'rgb(173, 181, 189)',
                font: {
                  weight: 'bold',
                  size: 16,
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  beginAtZero: true,
                },
                title: {
                  display: false,
                },
                grid: {
                  display: false,
                },
              },
              y: {
                ticks: {
                  display: false,
                },
                title: {
                  display: false,
                  text: 'Competition',
                },
                grid: {
                  display: false,
                },
                border: {
                  color: '#333',
                },
              },
            },
            layout: {
              padding: {
                top: 30,
              }
            }
          }}
        />
      }
    </div>
  );
};

export default ChartBarClubsPerOwner;