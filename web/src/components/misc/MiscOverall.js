import React from 'react';
import { getCalculatedOverall, getOverallColor } from "utils/player.js";

interface MiscOverallProps {
  player: Object;
  actualPosition ? : string;
  calculatedOvr ? : boolean;
}

const MiscOverall: React.FC < MiscOverallProps > = ({ player, actualPosition, calculatedOvr }) => {

  const getDifferenceString = () => {
    if (getCalculatedOverall(player) - player.overall >= 0) {
      return `(+${getCalculatedOverall(player) - player.overall})`
    } else {
      return `(-${Math.abs(getCalculatedOverall(player) - player.overall)})`
    }
  }

  return (
    <div>
      {calculatedOvr
        ? <div className="d-flex flex-row">
          <div style={{ color: getOverallColor(getCalculatedOverall(player)) }}>
            {getCalculatedOverall(player)}
          </div>
          <div className={"small mt-auto " + (getDifferenceString() ? "text-info" : "text-danger")}>
            {getDifferenceString()}
          </div>
        </div>
        : <div style={{ color: getOverallColor(player.overall) }}>
          {player.overall}
        </div>
      }
    </div>
  );
};

export default MiscOverall;