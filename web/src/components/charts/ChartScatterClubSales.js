import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import { Scatter } from 'react-chartjs-2';
import LoadingSquare from "components/loading/LoadingSquare";
import { getDivisionColor } from "utils/division.js";
import { subtractDate } from "utils/date.js";

interface Sale {
  id: number;
}

interface ChartScatterClubSalesProps {
  sales: Sale[];
  unit: str;
}

const ChartScatterClubSales: React.FC < ChartScatterClubSalesProps > = ({ sales, unit }) => {

  const computeData = () => {
    const data = [];
    const minDate = subtractDate(new Date(), unit)

    for (let i = 0; i < sales.length; i++) {
      const saleDate = new Date(sales[i].executionDate);

      if (!minDate || minDate < saleDate) {
        data.push({
          x: saleDate,
          y: sales[i].price,
          color: getDivisionColor(sales[i].club ? sales[i].club.division : null)
        });
      }
    }

    return {
      data,
      pointBackgroundColor: data.map((d) => d.color),
    }
  }

  return (
    <div className="h-100 w-100">
      {!sales
        ? <LoadingSquare />
        : <Scatter
          data={{
            datasets: [
              {
                ...computeData(),
                pointBorderWidth: 0,
                pointRadius: 5,
                pointHoverRadius: 8,
              },
            ],
          }}
          options={{
            animation: {
              easing: "easeOutExpo"
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                },
                type: "time",
                time: {
                  unit: ["w", "m"].indexOf(unit) ? "day" : "month",
                },
                adapters: { 
                  date: {
                    locale: enUS, 
                  },
                }, 
                position: 'bottom',
                title: {
                  display: false,
                },
                grid: {
                  display: false,
                },
              },
              y:
                {
                ticks: {
                },
                type: 'linear',
                position: 'left',
                title: {
                  display: false,
                },
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                display: false,
              },
            }
          }}
        />
      }
    </div>
  );
};

export default ChartScatterClubSales;