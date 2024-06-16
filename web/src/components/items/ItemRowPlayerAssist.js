import React from 'react';
import "./Item.css";
import ButtonMflPlayerInfo from "components/buttons/ButtonMflPlayerInfo.js";
import ButtonMflPlayer from "components/buttons/ButtonMflPlayer.js";
import MiscOverall from "components/misc/MiscOverall.js";

interface ItemRowPlayerAssistProps {
  p: object;
  isSelected: bool;
  onSelect: func;
}

const ItemRowPlayerAssist: React.FC < ItemRowPlayerAssistProps > = ({ p, isSelected, onSelect }) => {
  return (
    <div
      className={"Item ItemRowPlayerAssist " + (isSelected ? "selected" : "")}
      onClick={onSelect ? () => onSelect(p) : undefined}
    >
      <div className="d-flex flex-column flex-md-row flex-fill pb-1 pb-md-0">
        <div className="d-flex flex-row flex-basis-300">
          <i class="bi bi-person-badge-fill me-1"/>

          <div className="d-flex flex-fill">
            <span className="d-inline-block text-truncate">
              {p.firstName} {p.lastName}
            </span>
          </div>

          <div className="d-flex flex-basis-40">
            <MiscOverall
              player={p}
            />
          </div>

          <div className="d-flex flex-basis-80">
            {p.positions.join(", ")}
          </div>
        </div>

        <div className="d-flex flex-md-grow-1">
          <div className="d-flex flex-grow-1">
            {p.nationalities && p.nationalities[0]
              ? <img
                className="d-inline me-1 my-1 ms-md-1"
                style={{height: 14}}
                src={`https://app.playmfl.com/img/flags/${p.nationalities[0]}.svg`}
              />
              : ""
            }

            {p.nationalities && p.nationalities ? p.nationalities[0] : ""}
          </div>

          <div className="d-flex flex-row flex-grow-0 justify-content-end">
            <div className="me-1">
              <ButtonMflPlayerInfo
                playerId={p.id}
              />
            </div>
            <div>
              <ButtonMflPlayer
                playerId={p.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemRowPlayerAssist;