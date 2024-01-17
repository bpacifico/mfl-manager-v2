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
        "Item ItemNotification d-flex flex-column flex-sm-row w-100 "
        + (isSelected ? "selected" : "")
      }
      onClick={() => onSelect(item)}
    >
      <div className="d-flex flex-grow-0 px-1">
        <i className="bi bi-alarm-fill pe-1"></i> {prettifyId(item.id)}
      </div>
      <div className="d-flex flex-grow-1 px-1">{item.type}</div>
      <div className="d-flex flex-grow-1 px-1">Scope: {prettifyId(item.notificationScope?.id)}</div>
      <div className="d-flex flex-grow-1 px-1">
        {item.playerIds.length + " player" + (item.playerIds.length > 1 ? "s" : "")}
      </div>
      <div className="d-flex flex-grow-0 px-1">{item.sending_date}</div>
    </div>
  );
};

export default ItemNotification;