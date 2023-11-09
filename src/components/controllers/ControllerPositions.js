import React from 'react';
import { positions as playerPositions } from "utils/player.js";

interface ControllerPositionsProps {
  positions: string[];
  onChange: func;
}

const ControllerPositions: React.FC<ControllerPositionsProps> = ({ positions, onChange }) => {
  console.log(onChange)

  const onClick = (p) => {
    let newSelectedPositions = positions;

    if (newSelectedPositions.indexOf(p) >= 0) {
      newSelectedPositions = newSelectedPositions.filter((pos) => pos !== p);
    } else {
      newSelectedPositions = newSelectedPositions.concat([p]);
    }

    onChange(newSelectedPositions);
  };

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <h4>Position</h4>
      </div>
      <div className="col-12">
      	{playerPositions
          .map((p) => (
            <button
              className={positions.indexOf(p.name) >= 0 && "bg-info"}
              onClick={() => onClick(p.name)}>
              {p.name}
            </button>
        ))}
      </div>
    </div>
  );
};

export default ControllerPositions;