import React from 'react';
import "./Item.css";
import { prettifyId } from "utils/graphql.js";
import { dateToTimezonedString } from "utils/date.js";

interface ItemNotificationProps {
  item: Object;
  isSelected?: bool;
  onSelect?: funct;
}

const ItemNotification: React.FC<ItemNotificationProps> = ({ item, isSelected, onSelect }) => {
  return (
    <div
      className={
        "Item ItemNotification d-flex flex-column flex-sm-row w-100 "
        + (isSelected ? "selected" : "")
      }
      onClick={() => onSelect(item)}
    >
      <div className="d-flex flex-grow-0 px-1" style={{ width: 150 }}>
        <i className="bi bi-alarm-fill pe-1"></i> {prettifyId(item.id)}
      </div>
      <div className="d-flex flex-grow-0 px-1" style={{ width: 150 }}>
        Scope: {prettifyId(item.notificationScope?.id)}
      </div>
      <div className="d-flex flex-grow-1 justify-content-md-center px-1">
        {item.playerIds.length + " player" + (item.playerIds.length > 1 ? "s" : "")}
      </div>
      <div className="d-flex flex-grow-0 justify-content-md-end px-1" style={{ width: 150 }}>
        {item.sendingDate ? dateToTimezonedString(item.sendingDate) : "Not sent"}
      </div>
    </div>
  );
};

export default ItemNotification;