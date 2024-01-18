import React from 'react';

interface ButtonMflPlayerProps {
  playerId?: int;
}

const ButtonMflPlayer: React.FC<ButtonMflPlayerProps> = ({ playerId }) => {

  return (
    <button
      className="btn btn-info btn-xs text-white"
      onClick={() => window.open("https://app.playmfl.com/players/" + playerId, "_blank")}
    >
      MFL <i className="bi bi-box-arrow-in-right"></i>
    </button>
  );
};

export default ButtonMflPlayer;