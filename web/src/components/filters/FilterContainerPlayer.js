import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./FilterContainerPlayer.css";
import Popup from "reactjs-popup";
import ControllerPositions from "components/controllers/ControllerPositions.js";
import ControllerOverallScore from "components/controllers/ControllerOverallScore.js";
import ControllerAge from "components/controllers/ControllerAge.js";
import { positions } from "utils/player.js";
import { convertDictToUrlParams } from "utils/url.js";


interface FilterContainerPlayerProps {
  trigger: Object;
  filters: dict;
  onChange: func;
  onClose ? : func;
  onApply ? : func;
  showPositions ? : boolean;
  showOverallScore ? : boolean;
  showAge ? : boolean;
  deactivateNavigate ? : boolean;
}

const FilterContainerPlayer: React.FC < FilterContainerPlayerProps > = ({ trigger, filters, onChange, onClose, onApply, showPositions, showOverallScore, showAge, deactivateNavigate }) => {
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
        if (filters.minOvr || filters.maxOvr) {
          let text = [];

          text.push( < > {
              filters.minOvr || < > -<i className="bi bi-infinity"></i> < />}</ > ); text.push(<i className="bi bi-arrow-right small mx-1"></i>); text.push( < > { filters.maxOvr || <i className="bi bi-infinity"></i> } < />);

              return text;
            }

            return "All";
          }

          const getAgeTextValue = () => {
            if (filters.minAge || filters.maxAge) {
              let text = [];

              text.push(<span>{filters.minAge || <>- <i className="bi bi-infinity"></i></>}</span>);
              text.push(<i className="bi bi-arrow-right small mx-2"></i>);
              text.push(<span>{filters.maxAge || <i className="bi bi-infinity"></i>}</span>);

              return text;
            }

            return "All";
          }

          const onPopupClose = () => {
            if (!deactivateNavigate) {
              navigate({ search: '?' + convertDictToUrlParams(filters) });
            }

            if (onClose) {
              onClose();
            }
          }

          const onPopupApply = (close) => {
            if (!deactivateNavigate) {
              navigate({ search: '?' + convertDictToUrlParams(filters) });
            }

            if (onApply) {
              onApply();
            }

            close();
          }

          useEffect(() => {
            if (!deactivateNavigate) {
              navigate({ search: '?' + convertDictToUrlParams(filters) });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);

          return (
            <div className="FilterContainerPlayer">
    	<Popup
				trigger={trigger}
				modal
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
				    			minOvr={filters.minOvr}
				    			maxOvr={filters.maxOvr}
									onChange={(min, max) => onChange({
										...filters,
										minOvr: min,
										maxOvr: max,
									})}
								/>}
			    		</div>

			    		<div className="col-md-12 mb-4">
				    		{showAge && <ControllerAge
				    			minAge={filters.minAge}
				    			maxAge={filters.maxAge}
									onChange={(min, max) => onChange({
										...filters,
										minAge: min,
										maxAge: max,
									})}
								/>}
			    		</div>
			    	</div>

			    	<div className="row">
							<div className="col-md-12">
								<div className="float-end">
									<button
										className="btn btn-info text-white"
										onClick={() => onPopupApply(close)}
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