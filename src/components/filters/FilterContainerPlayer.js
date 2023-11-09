import React from 'react';
import Popup from "reactjs-popup";
import ControllerPositions from "components/controllers/ControllerPositions.js";
import ControllerScarcity from "components/controllers/ControllerScarcity.js";
import { positions, scarcity } from "utils/player.js";

interface FilterContainerPlayerProps {
	filters: dict;
	onChange: func;
  showPositions?: boolean;
  showScarcity?: boolean;
}

const FilterContainerPlayer: React.FC<FilterContainerPlayerProps> = ({ filters, onChange, showPositions, showScarcity }) => {

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

	const getScarcityTextValue = () => {
		if (filters.overallMin || filters.overallMax) {
			const s = scarcity
				.filter((s) => filters.overallMin === undefined || s.overallMin >= filters.overallMin)
				.filter((s) => filters.overallMax === undefined || s.overallMax <= filters.overallMax)

			if (s.length === scarcity.length) {
				return "All";
			}

			if (s.length > 0) {
				return scarcity
					.map((p) => p.name)
					.join(", ");
			}

			return "None";
		}

		return "All";
	}

  return (
    <div>
    	<Popup
				trigger={
					<div className="row">
						<div className="col-12">
							FILTERS
						</div>

						{showPositions
							&& <div className="col-12">
								Positions: {getPositionTextValue()}
							</div>
						}

						{showScarcity
							&& <div className="col-12">
								Scarcity: {getScarcityTextValue()}
							</div>
						}
					</div>
				}
				modal
				closeOnDocumentClick
			>
				{(close) => (
					<div className="p-5 bg-dark border-white">
						<div className="row">
							<div className="col">
						  	<h2>Filters</h2>
						  </div>
				      <div className="col-auto">
				        <button
									className={"grey-background"}
									onClick={close}>
									<i class="bi bi-x-lg"></i>
								</button>
							</div>
						</div>

						<div className="row">
							<div className="col-12">
								{showPositions && <ControllerPositions
									positions={filters.positions}
									onChange={(p) => onChange({
										positions: p,
										...filters,
									})}
								/>}
				    		{showScarcity && <ControllerScarcity
				    			overallMin={filters.overallMin}
				    			overallMax={filters.overallMax}
									onChange={(min, max) => onChange({
										overallMin: min,
										overallMax: max,
										...filters,
									})}
								/>}
			    		</div>

			    		<div className="col-12">
			    			<button onClick={close}>
									Apply
								</button>
			    		</div>
			    	</div>
					</div>
				)}
			</Popup>
    </div>
  );
};

export default FilterContainerPlayer;