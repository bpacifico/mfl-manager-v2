import React from 'react';
import "./FilterClub.css";
import Popup from "reactjs-popup";
import ControllerDivisions from "components/controllers/ControllerDivisions.js";
import { divisions } from "utils/division.js";

interface FilterClubProps {
	filters: dict;
	onChange: func;
	onClose?: func;
  showDivisions?: boolean;
}

const FilterClub: React.FC<FilterClubProps> = ({ filters, onChange, onClose, showDivisions }) => {

	const getDivisionTextValue = () => {
		if (filters.divisions) {
			const p = divisions.filter((p) => filters.divisions.indexOf(p.number) >= 0)

			if (p.length === divisions.length) {
				return "All";
			}

			if (p.length > 0) {
				return p.map((p) => <div key={p.id} className="lh-1 text-white">{p.name}</div>);
			}

			return "None";
		}

		return "All";
	}

  return (
    <div className="FilterClub">
    	<Popup
				trigger={
					<div>
						<div className="big-filter-box position-absolute bg-body d-none d-md-block border btn border-info border-3 text-white p-2">
							<div className="col-12 my-3 mb-4 h5">
								<i className="bi bi-filter-square-fill text-info"></i>
							</div>

							{showDivisions
								&& <div className="col-12 my-2 mb-4">
									<div className="text-white-50 my-1">DIV</div>
									{getDivisionTextValue()}
								</div>
							}
						</div>
						<div className="d-block d-md-none btn">
							<i className="bi bi-filter-square-fill text-info h3"></i>
						</div>
					</div>
				}
				modal
				closeOnDocumentClick
				onClose={onClose}
				className={"slide-in"}
			>
				{(close) => (
					<div className="FilterClub-content container bg-dark border border-info border-3 rounded-3 p-4">
						<div className="row mb-4">
							<div className="col">
						  	<h2 className="text-white">FILTERS</h2>
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
							<div className="col-md-12 mb-4">
								{showDivisions && <ControllerDivisions
									divisions={filters.divisions}
									onChange={(p) => onChange({
										...filters,
										divisions: p,
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

export default FilterClub;