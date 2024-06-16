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
        ? <div>
          {getCalculatedOverall(player)} {getDifferenceString()}
        </div>
        : player.overall
      }
    </div>
  );
};

export default MiscOverall;