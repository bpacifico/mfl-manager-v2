import React from 'react';
import "./Item.css";
import { prettifyId } from "utils/graphql.js";

interface ItemNotificationProps {
  item: Object;
  isSelected?: bool;
  onSelect?: funct;
}

const ItemNotification: React.FC<ItemNotificationProps> = ({ item, isSelected, onSelect }) => {
  return (
    <div
      className={
        "Item ItemNotification d-flex flex-direction-row w-100 "
        + (isSelected ? "selected" : "")
      }
      onClick={() => onSelect(item)}
    >
      <div className="d-flex flex-grow-0 px-1">
        <i className="bi bi-square-fill"></i>
      </div>
      <div className="d-flex flex-grow-0 pe-1">{prettifyId(item.id)}</div>
      <div className="d-flex flex-grow-1 pe-1">{item.type}</div>
      <div className="d-flex flex-grow-1 pe-1">Scope: {prettifyId(item.notificationScope?.id)}</div>
      <div className="d-flex flex-grow-1 pe-1">
        {item.playerIds.length + " player" + (item.playerIds.length > 1 ? "s" : "")}
      </div>
    </div>
  );
};

export default ItemNotification;