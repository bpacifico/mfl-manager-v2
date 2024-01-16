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

	const [typeValues] = useState(["listing", "sale"]);
	const [type, setType] = useState(typeValues[0]);

	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [minAge, setMinAge] = useState("");
	const [maxAge, setMaxAge] = useState("");
	const [minOvr, setMinOvr] = useState("");
	const [maxOvr, setMaxOvr] = useState("");

	const [minPac, setMinPac] = useState("");
	const [maxPac, setMaxPac] = useState("");
	const [minDri, setMinDri] = useState("");
	const [maxDri, setMaxDri] = useState("");
	const [minPas, setMinPas] = useState("");
	const [maxPas, setMaxPas] = useState("");
	const [minSho, setMinSho] = useState("");
	const [maxSho, setMaxSho] = useState("");
	const [minDef, setMinDef] = useState("");
	const [maxDef, setMaxDef] = useState("");
	const [minPhy, setMinPhy] = useState("");
	const [maxPhy, setMaxPhy] = useState("");

	const confirm = () => {
		addNotificationScope(
      (v) => {
      	nm.info("The notification scope has been added");
      	if (onClose) onClose();
      },
      (e) => console.log(e),
      {
      	type,
      	minPrice,
      	maxPrice,
      }
    );
	}

	const getField = (value, setValue, placeholder="") => {
		return <input
			className="form-control w-auto flex-grow-0 me-1"
			value={value}
			placeholder={placeholder}
			onChange={(v) => setValue(parseInt(v.target.value, 10))}
			type="number"
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
				className={"fade-in popup-md"}
			>
				{(close) => (
					<div className="container bg-dark border border-info border-3 rounded-3 p-4">
						<div className="d-flex flex-direction-row mb-3">
							<div className="flex-grow-1">
						  	<h2 className="text-white">Add a new scope</h2>
						  </div>
				      <div className="flex-grow-0">
				        <button
									className={"btn"}
									onClick={close}>
									<i className="bi bi-x-lg"></i>
								</button>
							</div>
						</div>

						<div className="d-flex flex-direction-row m-1 mb-3">
							<div className="flex-grow-1 align-self-center">Type of notification:</div>
							<div className="flex-grow-1 me-1">
								<select
									className="form-select"
									onChange={(v) => setType(v.target.value)}
								>
									{typeValues
										.map((v) => (
										<option value={v} selected={v === type}>
											{v.charAt(0).toUpperCase() + v.slice(1)}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="d-flex flex-direction-row m-1">
							<div className="flex-grow-1 align-self-center">Price:</div>
							{getField(minPrice, setMinPrice, "min")}
							{getField(maxPrice, setMaxPrice, "max")}
						</div>

						<div className="d-flex flex-direction-row m-1">
							<div className="flex-grow-1 align-self-center">Age:</div>
							{getField(minAge, setMinAge, "min")}
							{getField(maxAge, setMaxAge, "max")}
						</div>

						<div className="d-flex flex-direction-row m-1">
							<div className="flex-grow-1 align-self-center">Overall:</div>
							{getField(minOvr, setMinOvr, "min")}
							{getField(maxOvr, setMaxOvr, "max")}
						</div>

						<div className="d-flex justify-content-end my-3">
							<div>
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
								<div className="d-flex flex-direction-row m-1">
									<div className="flex-grow-1 align-self-center">PAC:</div>
									{getField(minPac, setMinPac, "min")}
									{getField(maxPac, setMaxPac, "max")}
								</div>
								<div className="d-flex flex-direction-row m-1">
									<div className="flex-grow-1 align-self-center">DRI:</div>
									{getField(minDri, setMinDri, "min")}
									{getField(maxDri, setMaxDri, "max")}
								</div>
								<div className="d-flex flex-direction-row m-1">
									<div className="flex-grow-1 align-self-center">PAS:</div>
									{getField(minPas, setMinPas, "min")}
									{getField(maxPas, setMaxPas, "max")}
								</div>
								<div className="d-flex flex-direction-row m-1">
									<div className="flex-grow-1 align-self-center">SHO:</div>
									{getField(minSho, setMinSho, "min")}
									{getField(maxSho, setMaxSho, "max")}
								</div>
								<div className="d-flex flex-direction-row m-1">
									<div className="flex-grow-1 align-self-center">DEF:</div>
									{getField(minDef, setMinDef, "min")}
									{getField(maxDef, setMaxDef, "max")}
								</div>
								<div className="d-flex flex-direction-row m-1">
									<div className="flex-grow-1 align-self-center">PHY:</div>
									{getField(minPhy, setMinPhy, "min")}
									{getField(maxPhy, setMaxPhy, "max")}
								</div>
							</div>
						}

			      <div className="d-flex flex-direction-row justify-content-end mt-3">
							<div>
								<button
									className="btn btn-info text-white"
									onClick={confirm}
								>
									Confirm
								</button>
							</div>
						</div>
					</div>
				)}
			</Popup>
    </div>
  );
};

export default PopupAddNotificationScope;