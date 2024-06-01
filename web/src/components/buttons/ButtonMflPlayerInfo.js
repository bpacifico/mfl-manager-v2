import React from 'react';
import "./ButtonMflPlayerInfo.css";

interface ButtonMflPlayerInfoProps {
  playerId ? : int;
}

const ButtonMflPlayerInfo: React.FC < ButtonMflPlayerInfoProps > = ({ playerId }) => {

  return (
    <button
      className="btn background-mpi btn-xs text-white"
      onClick={() => window.open("https://mflplayer.info/player/" + playerId, "_blank")}
    >
      MPI<i className="bi bi-caret-right-fill"></i>
    </button>
  );
};

export default ButtonMflPlayerInfo;