import React from 'react';
import LoadingSquare from "components/loading/LoadingSquare";
import { divisions } from "utils/division.js";

interface Player {
  id: number;
}

interface TablePlayerContractLinearRegressionProps {
  players: Player[];
}

const TablePlayerContractLinearRegression: React.FC<TablePlayerContractLinearRegressionProps> = ({ players }) => {

  const data = [
    { id: 1, name: 'John', age: 25, city: 'New York' },
    { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Doe', age: 22, city: 'Chicago' },
  ];

  const renderTableHeader = () => {
    const minOverall = Math.min(...players.map((p) => (p.metadata?.overall)));
    const maxOverall = Math.max(...players.map((p) => (p.metadata?.overall)));

    return (
      <thead>
        <tr>
          <th key={"DIV"}>DIV</th>
          {[...Array(maxOverall - minOverall + 1).keys()].map((i) => (
            <th key={i + minOverall}>{i + minOverall}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    const minOverall = Math.min(...players.map((p) => (p.metadata?.overall)));
    const maxOverall = Math.max(...players.map((p) => (p.metadata?.overall)));

    return (
      <tbody>
        {divisions.map((d, index) => (
          <tr key={index}>
            <td key={"DIV"}>
              <div
                className="ratio ratio-1x1 rounded-circle h-auto w-auto"
                style={{backgroundColor: d.color}}
              />
            </td>
            {[...Array(maxOverall - minOverall + 1).keys()].map((cell, index) => (
              <td key={index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="py-4 px-1 px-md-3">
      <div className="ratio ratio-16x9 w-100">
        {!players
          ? <LoadingSquare />
          : <table className="table">
            {renderTableHeader()}
            {renderTableBody()}
          </table>
        }
      </div>
    </div>
  );
};

export default TablePlayerContractLinearRegression;