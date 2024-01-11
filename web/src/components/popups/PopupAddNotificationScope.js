import React from 'react';
import { NotificationManager as nm } from "react-notifications";
import Popup from "reactjs-popup";
import { addNotificationScope } from "services/api-assistant.js";

interface PopupAddNotificationScopeProps {
	trigger: Object;
	onClose?: func;
}

const PopupAddNotificationScope: React.FC<PopupAddNotificationScopeProps> = ({ trigger, onClose }) => {

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