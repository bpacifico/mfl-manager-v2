import React from 'react';
import "./FilterContainerPlayer.css";
import Popup from "reactjs-popup";
import ControllerPositions from "components/controllers/ControllerPositions.js";
import ControllerOverallScore from "components/controllers/ControllerOverallScore.js";
import { positions } from "utils/player.js";

interface FilterContainerPlayerProps {
	filters: dict;
	onChange: func;
	onClose?: func;
  showPositions?: boolean;
  showOverallScore?: boolean;
}

const FilterContainerPlayer: React.FC<FilterContainerPlayerProps> = ({ filters, onChange, onClose, showPositions, showOverallScore }) => {

	const getPositionTextValue = () => {
		if (filters.positions) {
			const p = positions.filter((p) => filters.positions.indexOf(p.name) >= 0)

			if (p.length === positions.length) {
				return "All";
			}

			if (p.length > 0) {
				return p.map((p) => <div key={p.id} className="lh-1 text-white">{p.name}</div>);
			}

			return "All";
		}

		return "All";
	}

	const getOverallScoreTextValue = () => {
		if (filters.overallMin || filters.overallMax) {
			let text = [];

			text.push(<div>{filters.overallMin || -<i className="bi bi-infinity"></i>}</div>);
			text.push(<i className="bi bi-arrow-down small"></i>);
			text.push(<div>{filters.overallMax || <i className="bi bi-infinity"></i>}</div>);

			return text;
		}

		return "All";
	}

  return (
    <div className="FilterContainerPlayer">
    	<Popup
				trigger={
					<div>
						<div className="big-filter-box position-absolute bg-body d-none d-md-block border btn border-info border-3 text-white p-2">
							<div className="col-12 my-3 mb-4 h5">
								<i className="bi bi-filter-square-fill"></i>
							</div>

							{showPositions
								&& <div className="col-12 my-2 mb-4">
									<div className="text-white-50 my-1">POS</div>
									{getPositionTextValue()}
								</div>
							}

							{showOverallScore
								&& <div className="col-12 my-2">
									<div className="text-white-50 my-1">OVR</div>
									{getOverallScoreTextValue()}
								</div>
							}
						</div>
						<div className="d-block d-md-none btn mb-3">
							<i className="bi bi-filter-square-fill text-info h3"></i>
						</div>
					</div>
				}
				modal
				closeOnDocumentClick
				onClose={onClose}
			>
				{(close) => (
					<div className="container w-100 bg-dark border border-white border-3 rounded-3 p-3 p-md-5">
						<div className="row mb-4">
							<div className="col">
						  	<h2>FILTERS</h2>
						  </div>
				      <div className="col-auto">
				        <button
									className={"grey-background"}
									onClick={close}>
									<i className="bi bi-x-lg"></i>
								</button>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 mb-4">
								{showPositions && <ControllerPositions
									positions={filters.positions}
									onChange={(p) => onChange({
										...filters,
										positions: p,
									})}
								/>}
							</div>

							<div className="col-md-6 mb-4">
				    		{showOverallScore && <ControllerOverallScore
				    			overallMin={filters.overallMin}
				    			overallMax={filters.overallMax}
									onChange={(min, max) => onChange({
										...filters,
										overallMin: min,
										overallMax: max,
									})}
								/>}
			    		</div>
			    	</div>

			    	<div className="row">
							<div className="col-md-12">
								<div className="float-end">
									<button
										className="bg-info"
										onClick={close}
									>
										Apply
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

export default FilterContainerPlayer;