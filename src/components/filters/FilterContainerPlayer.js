import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./FilterContainerPlayer.css";
import Popup from "reactjs-popup";
import ControllerPositions from "components/controllers/ControllerPositions.js";
import ControllerOverallScore from "components/controllers/ControllerOverallScore.js";
import { positions } from "utils/player.js";
import { convertDictToUrlParams } from "utils/url.js";


interface FilterContainerPlayerProps {
	filters: dict;
	onChange: func;
	onClose?: func;
  showPositions?: boolean;
  showOverallScore?: boolean;
}

const FilterContainerPlayer: React.FC<FilterContainerPlayerProps> = ({ filters, onChange, onClose, showPositions, showOverallScore }) => {
	const navigate = useNavigate();

	const getPositionTextValue = () => {
		if (filters.positions) {
			const p = positions.filter((p) => filters.positions.indexOf(p.name) >= 0)

			if (p.length === positions.length) {
				return "All";
			}

			if (p.length > 0) {
				return p.map((p) => p.name).join(",");
			}

			return "All";
		}

		return "All";
	}

	const getOverallScoreTextValue = () => {
		if (filters.overallMin || filters.overallMax) {
			let text = [];

			text.push(<>{filters.overallMin || -<i className="bi bi-infinity"></i>}</>);
			text.push(<i className="bi bi-arrow-right small mx-1"></i>);
			text.push(<>{filters.overallMax || <i className="bi bi-infinity"></i>}</>);

			return text;
		}

		return "All";
	}

	const onPopupClose = () => {
		navigate({ search: '?' + convertDictToUrlParams(filters) });

		if (onClose) {
			onClose();
		}
	}

	useEffect(() => {
    navigate({ search: '?' + convertDictToUrlParams(filters) });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="FilterContainerPlayer">
    	<Popup
				trigger={
					<div className="big-filter-box flex-row bg-body d-flex border btn border-info border-3 text-white p-1 pe-2">
						<div className="d-flex align-items-center mx-3 my-2 h5">
							<i className="bi bi-filter-square-fill text-info"></i>
						</div>

						{showPositions && getPositionTextValue() !== "All"
							&& <div className="mx-2">
								<div className="text-white-50 lh-0">POS</div>
								<div>{getPositionTextValue()}</div>
							</div>
						}

						{showOverallScore && getOverallScoreTextValue() !== "All"
							&& <div className="mx-2">
								<div className="text-white-50">OVR</div>
								<div>{getOverallScoreTextValue()}</div>
							</div>
						}
					</div>
				}
				modal
				closeOnDocumentClick
				onClose={onPopupClose}
				className={"slide-in"}
			>
				{(close) => (
					<div className="FilterContainerPlayer-content container bg-dark border border-info border-3 rounded-3 p-4">
						<div className="row mb-4">
							<div className="col">
						  	<h2 className="text-white">FILTERS</h2>
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
							<div className="col-md-12 mb-4">
								{showPositions && <ControllerPositions
									positions={filters.positions}
									onChange={(p) => onChange({
										...filters,
										positions: p,
									})}
								/>}
							</div>

							<div className="col-md-12 mb-4">
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
										className="btn btn-info text-white"
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