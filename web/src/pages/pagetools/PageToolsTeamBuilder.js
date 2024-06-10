import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NotificationManager as nm } from "react-notifications";
import FilterContainerPlayer from "components/filters/FilterContainerPlayer.js";
import LoadingBar from "components/loading/LoadingBar.js";
import CountSales from "components/counts/CountSales.js";
import CountSaleValue from "components/counts/CountSaleValue.js";
import ChartBarPlayerSales from "components/charts/ChartBarPlayerSales.js";
import ChartBarPlayerSaleValue from "components/charts/ChartBarPlayerSaleValue.js";
import ChartScatterPlayerSales from "components/charts/ChartScatterPlayerSales.js";
import BoxWarning from "components/box/BoxWarning.js";
import { getTeams, getTeamMembers } from "services/api-assistant.js";
import BoxSoonToCome from "components/box/BoxSoonToCome.js";
import Count from "components/counts/Count.js";
import LoadingSquare from "components/loading/LoadingSquare.js"
import { positions } from "utils/player.js";
import PopupAddTeam from "components/popups/PopupAddTeam.js";
import ItemTeam from "components/items/ItemTeam.js";
import ItemRowPlayerAssist from "components/items/ItemRowPlayerAssist.js";


interface PageToolsTeamBuilderProps {}

const PageToolsTeamBuilder: React.FC < PageToolsTeamBuilderProps > = ({ props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);

  const getData = () => {
    setIsLoading(true);
    setTeams(null);

    getTeams({
      handleSuccess: (v) => {
        setTeams(v.data.getTeams)
        setIsLoading(false);
      }
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedTeam === null) {
      setTeamMembers(null);
    } else {
      getTeamMembers({
        handleSuccess: (v) => {
          setTeamMembers(v.data.getTeamMembers)
        },
        params: {
          team: selectedTeam,
        }
      });
    }
  }, [selectedTeam]);

  return (
    <div id="PageToolsTeamBuilder" className="h-100 w-100">
      <div className="container-xxl h-100 px-2 px-md-4 py-4">
        <div className="d-flex flex-column flex-md-row h-100 w-100 fade-in">
          <div className="d-flex flex-column flex-md-grow-0 flex-basis-300">
            <div className="card d-flex flex-column flex-md-grow-1 m-2 p-3 pt-2">
              <div className="d-flex flex-row flex-md-grow-0">
                <h4 className="flex-grow-1">My teams</h4>

                <PopupAddTeam
                  trigger={
                    <button className="btn btn-info btn-sm text-white">
                      <i className="bi bi-plus"></i>
                    </button>
                  }
                  onClose={getData}
                />
              </div>

              <div className="d-flex flex-fill flex-column">
                {isLoading || !teams
                  ? <LoadingSquare />
                  : teams.map((t) => <ItemTeam
                    team={t}
                    isSelected={t.id === selectedTeam}
                    onSelect={(t) => setSelectedTeam(selectedTeam === t.id ? null : t.id)}
                  />)
                }
              </div>
            </div>

            {/*<div className="card d-flex flex-column flex-fill m-2 p-3 pt-2">
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1">Pricing</h4>
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden">
                <BoxSoonToCome />
              </div>
            </div>*/}
          </div>

          <div className="d-flex flex-column flex-md-column flex-md-grow-1">
            <div className="card d-flex flex-column flex-md-grow-1 flex-md-shrink-1 flex-md-basis-auto flex-basis-0 m-2 p-3 pt-2">
              <div className="d-flex flex-row">
                <div className="d-flex flex-row flex-md-grow-0">
                  <h4 className="flex-grow-1">Player group</h4>

                  <PopupAddTeam
                    trigger={
                      <button className="btn btn-info btn-sm text-white">
                        <i className="bi bi-plus"></i>
                      </button>
                    }
                    onClose={getData}
                  />
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden">
                {!teamMembers
                  ? <LoadingSquare />
                  : teamMembers.map((p) => <ItemRowPlayerAssist player={p}/>)
                }
              </div>
            </div>

            <div className="card d-flex flex-column flex-md-grow-1 flex-md-shrink-1 flex - basis - 400 m-2 p-3 pt-2">
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1">Formation</h4>
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden">
                cccc
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageToolsTeamBuilder;