import React from 'react';
import Popup from "reactjs-popup";
import ControllerPositions from "components/controllers/ControllerPositions.js";
import ControllerOverallScore from "components/controllers/ControllerOverallScore.js";
import { positions } from "utils/player.js";

interface FilterContainerPlayerProps {
	filters: dict;
	onChange: func;
  showPositions?: boolean;
  showOverallScore?: boolean;
}

const FilterContainerPlayer: React.FC<FilterContainerPlayerProps> = ({ filters, onChange, showPositions, showOverallScore }) => {
	console.log(filters);
	const getPositionTextValue = () => {
		if (filters.positions) {
			const p = positions.filter((p) => filters.positions.indexOf(p.name) >= 0)

			if (p.length === positions.length) {
				return "All";
			}

			if (p.length > 0) {
				return p
					.map((p) => p.name)
					.join(", ");
			}

			return "All";
		}

		return "All";
	}

	const getOverallScoreTextValue = () => {
		if (filters.overallMin || filters.overallMax) {
			let text = "";

			text += filters.overallMin || "-∞"
			text += " -> ";
			text += filters.overallMax || "∞"

			return text;
		}

		return "All";
	}

  return (
    <div>
    	<Popup
				trigger={
					<div>
						<div className="position-absolute d-none d-md-block border btn btn-outline-info border-info border-3 text-white p-2">
							<div className="col-12">
								FILTERS
							</div>

							{showPositions
								&& <div className="col-12">
									Positions: {getPositionTextValue()}
								</div>
							}

							{showOverallScore
								&& <div className="col-12">
									Overall: {getOverallScoreTextValue()}
								</div>
							}
						</div>
						<div className="d-block d-md-none">
							moobbb
						</div>
					</div>
				}
				modal
				closeOnDocumentClick
			>
				{(close) => (
					<div className="container w-100 bg-dark border border-white p-2 p-md-5">
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
							<div className="col-md-6">
								{showPositions && <ControllerPositions
									positions={filters.positions}
									onChange={(p) => onChange({
										...filters,
										positions: p,
									})}
								/>}
							</div>

							<div className="col-md-6">
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
					</div>
				)}
			</Popup>
    </div>
  );
};

export default FilterContainerPlayer;