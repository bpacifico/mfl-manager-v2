import React, { useState, useEffect } from 'react';
import { NotificationManager as nm } from "react-notifications";
import Popup from "reactjs-popup";
import { getPlayers, getPlayerNationalities } from "services/api-assistant.js";
import { prettifyId } from "utils/graphql.js";
import ItemRowPlayerAssist from "components/items/ItemRowPlayerAssist.js";
import BoxMessage from "components/box/BoxMessage.js";


interface PopupAddPlayersProps {
  trigger: Object;
  onClose: func;
  onConfirm: func;
}

const PopupAddPlayers: React.FC < PopupAddPlayersProps > = ({ trigger, onClose, onConfirm }) => {
  const [nationalities, setNationalities] = useState(null);
  const [selectedNationality, setSelectedNationality] = useState(null);

  const [players, setPlayers] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([])

  const confirm = (close) => {
    if (onConfirm) {
      onConfirm(selectedPlayers);
    }

    close();
  }

  const fetchPlayers = (page = 1) => {
    getPlayers({
      handleSuccess: (v) => {
        if (page === 1) {
          setPlayers(v.data.getPlayers);
        } else {
          setPlayers(players ? players.concat(v.data.getPlayers) : v.data.getPlayers);
        }
      },
      params: {
        nationalities: selectedNationality ? [selectedNationality] : null,
        limit: 20,
        skip: 20 * (page - 1),
      }
    });
  }

  const loadMore = () => {
    fetchPlayers(Math.round(players.length / 20) + 1);
  }

  const onPlayerSelection = (p) => {
    if (selectedPlayers.map(p => p.id).indexOf(p.id) >= 0) {
      setSelectedPlayers(selectedPlayers.filter(l => l.id !== p.id));
    } else {
      setSelectedPlayers(selectedPlayers.concat(p));
    }
  }

  useEffect(() => {
    getPlayerNationalities({
      handleSuccess: (v) => {
        setNationalities(v.data.getPlayerNationalities);
      }
    });
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [selectedNationality]);

  return (
    <div className="PopupAddPlayers">
    	<Popup
				trigger={trigger}
				modal
				closeOnDocumentClick
				onClose={onClose}
				className={"fade-in popup-xl"}
			>
				{(close) => (
					<div className="container bg-dark d-flex flex-column border border-info border-3 rounded-3 p-4">
						<div className="d-flex flex-row flex-grow-0 mb-3">
							<div className="flex-grow-1">
						  	<h2 className="text-white">
						  		Add players in the group
						  	</h2>
						  </div>
				      <div className="flex-grow-0">
				        <button
									className={"btn"}
									onClick={close}>
									<i className="bi bi-x-lg"></i>
								</button>
							</div>
						</div>

						<div className="d-flex flex-row flex-grow-0 mb-3">
							<select
                className="form-select w-100 mb-1"
                value={selectedNationality}
                onChange={(v) => setSelectedNationality(v.target.value)}
                placeholder={"Nationality"}
              >
                <option value={""} key={null}/>
                {nationalities && nationalities
                  .map((n) => (
                  <option value={n} key={n}>
                    {n}
                  </option>
                ))}
              </select>
						</div>

						<div className="d-flex flex-grow-1 flex-column mb-3 overflow-auto">
							{players
								? players.map((p) => <ItemRowPlayerAssist
										p={p}
										isSelected={selectedPlayers.map(p => p.id).indexOf(p.id) >= 0}
										onSelect={(p) => onPlayerSelection(p)}
									/>
								)
								: <BoxMessage content={"No player found"} />
							}

							<button
                className="btn btn-sm btn-link"
                onClick={() => loadMore()}
              >
                Load more
              </button>
						</div>

			      <div className="d-flex flex-grow-0 flex-row justify-content-end mt-3">
							<div>
								<button
										className="btn btn-info text-white"
										disabled={selectedPlayers.length <= 0}
										onClick={() => confirm(close)}
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

export default PopupAddPlayers;