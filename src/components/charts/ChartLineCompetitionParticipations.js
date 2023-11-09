import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

interface Competition {
  id: number;
}

interface ChartLineCompetitionParticipationsProps {
  competitions: Competition[];
}

const ChartLineCompetitionParticipations: React.FC<ChartLineCompetitionParticipationsProps> = ({ competitions }) => {
  
  const computeData = () => {
    const data = {};

    for (let i = 0; i < competitions.length; i++) {
      let date = new Date(competitions[i].startingDate);
      date = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`

      if (!data[date]) {
        data[date] = competitions[i].nbParticipants;
      } else {
        data[date] += competitions[i].nbParticipants;
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
                  text: 'Participant',
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

export default ChartLineCompetitionParticipations;