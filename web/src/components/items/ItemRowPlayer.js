import React from 'react';
import "./Item.css";
import ButtonMflPlayerInfo from "components/buttons/ButtonMflPlayerInfo.js";
import ButtonMflPlayer from "components/buttons/ButtonMflPlayer.js";

interface ItemRowPlayerProps {
  p: object;
}

const ItemRowPlayer: React.FC < ItemRowPlayerProps > = ({ p }) => {
  return (
    <div className="Item ItemRowPlayer d-flex flex-row flex-fill">
      <div className="d-flex flex-grow-1">
        {p.metadata.firstName} {p.metadata.lastName} - {p.metadata.nationalities.join("/")} - {p.metadata.overall}
      </div>

      <div className="d-flex flex-grow-0 ps-1">
        <ButtonMflPlayerInfo
          playerId={p.id}
        />
      </div>
      <div className="d-flex flex-grow-0 ps-1">
        <ButtonMflPlayer
          playerId={p.id}
        />
      </div>
    </div>
  );
};

export default ItemRowPlayer;