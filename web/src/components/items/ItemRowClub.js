import React from 'react';
import "./Item.css";
import ButtonMflClub from "components/buttons/ButtonMflClub.js";

interface ItemRowClubProps {
  c: object;
}

const ItemRowClub: React.FC < ItemRowClubProps > = ({ c }) => {
  return (
    <div className="Item ItemRowPlayer d-flex flex-row flex-fill">
      <div className="d-flex flex-grow-1">
        {c.name ? c.name : "Non-established club"}
      </div>

      <div className="d-flex flex-grow-0 px-1">
        <ButtonMflClub
          clubId={c.id}
        />
      </div>
    </div>
  );
};

export default ItemRowClub;