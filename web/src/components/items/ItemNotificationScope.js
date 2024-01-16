import React from 'react';
import "./Item.css";
import PopupNotificationScope from "components/popups/PopupNotificationScope.js";
import { prettifyId } from "utils/graphql.js";

interface ItemNotificationScopeProps {
  item: Object;
  isSelected?: bool;
  onSelect?: funct;
}

const ItemNotificationScope: React.FC<ItemNotificationScopeProps> = ({ item, isSelected, onSelect }) => {
  const paramToIgnore = ["id", "type"];

  const getParamCount = () => {
    const c = Object.keys(item)
      .filter((k) => paramToIgnore.indexOf(k) < 0)
      .filter((k) => item[k])
      .length;

    return c + " parameter" + (c > 1 ? "s" : "");
  }

  return (
    <div
      className={
        "Item ItemNotificationScope d-flex flex-direction-row w-100 "
        + (isSelected ? "selected" : "")
      }
      onClick={() => onSelect(item)}
    >
      <div className="d-flex flex-grow-0 px-1">
        <i className="bi bi-square-fill"></i>
      </div>
      <div className="d-flex flex-grow-0 pe-1">{prettifyId(item.id)}</div>
      <div className="d-flex flex-grow-1 pe-1">{item.type}</div>
      <div className="d-flex flex-grow-1 pe-1">{getParamCount()}</div>
      <div className="d-flex flex-grow-0 pe-1 text-info">
        <PopupNotificationScope
          item={item}
          trigger={
            <i className="bi bi-plus-circle-dotted"></i>
          }
        />
      </div>
    </div>
  );
};

export default ItemNotificationScope;