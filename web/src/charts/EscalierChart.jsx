import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const EscalierChart = ({ elements, valueKey, division }) => {
  const sorted = [...elements].sort((a, b) => b[valueKey] - a[valueKey]);

  const data = {
    labels: sorted
      .map(() => ""), // pas de label sur l'axe X
    datasets: [
      {
        data: sorted.map((el) => el[valueKey]/100),
        backgroundColor: division.color,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false, // ❌ Masque la pastille colorée
        callbacks: {
          title: (context) => {
            const index = context[0].dataIndex;
            const original = sorted[index];
            return original.name; // 🟡 Ligne de titre = nom du club
          },
          label: (context) => {
            const index = context.dataIndex;
            const original = sorted[index];
            return `${valueKey}: ${original[valueKey]/100}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default EscalierChart;
