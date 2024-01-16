import React from 'react';

interface ItemNotificationScopeProps {
}

const ItemNotificationScope: React.FC<ItemNotificationScopeProps> = (props) => {

	const getParamCount = () => {
		return "2 parameters";
	}

  return (
    <div className="ItemNotificationScope d-flex flex-direction-column">
      <div className="flew-grow-1">{props.id}</div>
      <div>{props.type}</div>
      <div>{getParamCount()}</div>
    </div>
  );
};

export default ItemNotificationScope;