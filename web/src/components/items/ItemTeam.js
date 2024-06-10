import React from 'react';
import "./Item.css";

interface ItemTeamProps {
  team: object;
  isSelected: boolean;
  onSelect: funct;
  onDelete: funct;
}

const ItemTeam: React.FC < ItemTeamProps > = ({ team, isSelected, onSelect, onDelete }) => {
  return (
    <div className={"Item ItemTeam " + (isSelected ? "selected" : "")}
      onClick={() => onSelect(team)}>
      <div className="d-flex flex-column flex-md-row flex-fill pb-1 pb-md-0">
        <div className="d-flex flex-row flex-basis-300">
          <i class="bi bi-clipboard2-check-fill me-1"/>

          <div className="d-flex fill">
            {team.name}
          </div>
        </div>

        <div className="d-flex flex-row flex-md-grow-0 justify-content-end">
        </div>
      </div>
    </div>
  );
};

export default ItemTeam;