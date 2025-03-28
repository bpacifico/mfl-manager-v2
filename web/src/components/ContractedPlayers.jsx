import React from "react";

const PlayerTable = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.metadata.overall - a.metadata.overall);

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Overall</th>
          <th className="border border-gray-300 p-2">Position</th>
          <th className="border border-gray-300 p-2">Name</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
          <td className="border border-gray-300 p-2 text-center">{item.metadata.overall}</td>
            <td className="border border-gray-300 p-2">
              {Array.isArray(item.metadata.positions) ? item.metadata.positions.join(" / ") : item.metadata.positions}
            </td>
            <td className="border border-gray-300 p-2">
              <a
                href={`https://mflplayer.info/player/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {item.metadata.firstName} {item.metadata.lastName}
              </a>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlayerTable;
