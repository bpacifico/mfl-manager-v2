import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import { divisions, getDivisionColor } from "utils/division.js";
import LoadingSquare from "components/loading/LoadingSquare";
import { computeLinearRegression } from "utils/chart.js";

interface Player {
  id: number;
}

interface ChartScatterPlayerContractsProps {
  contracts: Contract[];
}

const ChartScatterPlayerContracts: React.FC < ChartScatterPlayerContractsProps > = ({ contracts }) => {

  const computeData = () => {
    const data = [];

    for (let i = 0; i < contracts.length; i++) {
      console.log(contracts[i].club.division, contracts[i].revenueShare)
      if (contracts[i].club && contracts[i].club.division && contracts[i].revenueShare) {
        let point = data
          .filter((p) => p.x === contracts[i].revenueShare / 100)
          .filter((p) => p.y === contracts[i].club.division)
          .pop();

        if (point) {
          data.forEach((d) => {
            if (d.x === point.x && d.y === point.y) {
              d.count++;
            }
          })
        } else {
          data.push({
            x: contracts[i].revenueShare / 100,
            y: contracts[i].club.division,
            color: getDivisionColor(contracts[i].club.division),
            count: 1,
          });
        }
      }
    }

    return {
      data,
      pointBackgroundColor: data.map((d) => d.color),
      pointRadius: data.map((d) => mapValue(d.count)),
      pointHoverRadius: data.map((d) => mapValue(d.count) + 2),
    };
  }

  const mapValue = (x) => {
    if (x <= 0) throw new Error("x should be greater than 0");
    const minOutput = 2,
      maxOutput = 20;
    const logBase = 10;
    const scaledX = Math.log(x + 1) / Math.log(logBase);
    return minOutput + (scaledX * (maxOutput - minOutput) / scaledX);
  }


  return (
    <div className="h-100 w-100">
      {!contracts
        ? <LoadingSquare />
        : <Scatter
          data={{
            datasets: [
              {
                ...computeData(),
                pointBorderWidth: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  stepSize: 1
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
                reverse: true,
                ticks: {
                  stepSize: 1
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
          // plugins={[buildDivisionLegend]}
        />
      }
    </div>
  );
};

export default ChartScatterPlayerContracts;