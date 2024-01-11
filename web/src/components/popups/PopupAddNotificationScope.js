import React, { useState } from 'react';
import { NotificationManager as nm } from "react-notifications";
import Popup from "reactjs-popup";
import { addNotificationScope } from "services/api-assistant.js";

interface PopupAddNotificationScopeProps {
	trigger: Object;
	onClose?: func;
}

const PopupAddNotificationScope: React.FC<PopupAddNotificationScopeProps> = ({ trigger, onClose }) => {
	const [showAttributeDetail, setShowAttributeDetail] = useState(false);

	const [minPrice, setMinPrice] = useState(null);
	const [maxPrice, setMaxPrice] = useState(null);
	const [minOvr, setMinOvr] = useState(null);
	const [maxOvr, setMaxOvr] = useState(null);

	const confirm = () => {
		addNotificationScope(
      (v) => {
      	nm.info("The notification scope has been added");
      	if (onClose) onClose();
      },
      (e) => console.log(e),
      {}
    );
	}

	const getField = (value, setValue) => {
		return <input
			className="form-control w-auto flex-grow-0"
			value={value}
			onChange={(v) => setValue(v)}
			type="number"
			name="min_price"
			min="1"
			max="99"
			step="1"
		/>
	}

  return (
    <div className="PopupAddNotificationScope">
    	<Popup
				trigger={trigger}
				modal
				closeOnDocumentClick
				onClose={onClose}
				className={"fade-in"}
			>
				{(close) => (
					<div className="container bg-dark border border-info border-3 rounded-3 p-4">
						<div className="row mb-4">
							<div className="col">
						  	<h2 className="text-white">Add a new scope</h2>
						  </div>
				      <div className="col-auto">
				        <button
									className={"btn"}
									onClick={close}>
									<i className="bi bi-x-lg"></i>
								</button>
							</div>
						</div>

						<div className="d-flex flex-direction-row mb-1">
							<div className="flex-grow-1">Price:</div>
							{getField(minPrice, setMinPrice)}
							{getField(maxPrice, setMaxPrice)}
						</div>

						<div className="d-flex flex-direction-row mb-1">
							<div className="flex-grow-1">Age:</div>
							{getField(minPrice, setMinPrice)}
							{getField(maxPrice, setMaxPrice)}
						</div>

						<div className="d-flex flex-direction-row mb-1">
							<div className="flex-grow-1">Overall:</div>
							{getField(minOvr, setMinOvr)}
							{getField(maxOvr, setMaxOvr)}
						</div>

						<div className="d-flex mb-1">
							<div className="float-end">
								<button
		              className="btn btn-sm text-info"
		              onClick={() => setShowAttributeDetail(!showAttributeDetail)}
		             >
		              {showAttributeDetail
		              	? <span><i className="bi bi-dash"></i> Hide attributes</span>
		              	: <span><i className="bi bi-plus"></i> Show attributes</span>
		              }
		            </button>
		          </div>
	          </div>

						{showAttributeDetail
							&& <div className="mb-1">
								<div className="d-flex flex-direction-row">
									<div className="flex-grow-1">Price:</div>
									{getField(minPrice, setMinPrice)}
									{getField(maxPrice, setMaxPrice)}
								</div>
								<div className="d-flex flex-direction-row">
									<div className="flex-grow-1">Price:</div>
									{getField(minPrice, setMinPrice)}
									{getField(maxPrice, setMaxPrice)}
								</div>
							</div>
						}

			      <div className="row">
							<div className="col-md-12">
								<div className="float-end">
									<button
										className="btn btn-info text-white"
										onClick={confirm}
									>
										Confirm
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</Popup>
    </div>
  );
};

export default PopupAddNotificationScope;