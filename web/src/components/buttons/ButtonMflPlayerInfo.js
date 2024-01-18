import React from 'react';

interface ButtonMflPlayerInfoProps {
  playerId?: int;
}

const ButtonMflPlayerInfo: React.FC<ButtonMflPlayerInfoProps> = ({ playerId }) => {

  return (
    <button
      className="btn btn-info btn-xs text-white"
      onClick={() => window.open("https://mflplayer.info/player/" + playerId, "_blank")}
    >
      Player Info <i className="bi bi-box-arrow-in-right"></i>
    </button>
  );
};

export default ButtonMflPlayerInfo;