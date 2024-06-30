import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Count from "components/counts/Count.js";
import BoxSoonToCome from "components/box/BoxSoonToCome.js";
import ControllerPlayerCriteria from "components/controllers/ControllerPlayerCriteria.js";
import FilterContainerPlayer from "components/filters/FilterContainerPlayer.js";
import ChartBarKeyCount from "components/charts/ChartBarKeyCount.js";
import { getPlayerDashboardData } from "services/api-assistant.js";
import { scarcity } from "utils/player.js";

interface PageDashPlayersProps {}

const PageDashPlayers: React.FC < PageDashPlayersProps > = () => {
    const [searchParams] = useSearchParams();

    const [data, setData] = useState(null);
    const [selectedCriteria, setSelectedCriteria] = useState("OVR");
    const [filters, setFilters] = useState({
      positions: searchParams.get("positions") ? searchParams.get("positions").split(",") : [],
      minAge: searchParams.get("minAge") ? searchParams.get("minAge").split(",") : undefined,
      maxAge: searchParams.get("maxAge") ? searchParams.get("maxAge").split(",") : undefined,
      minOvr: searchParams.get("minOvr") ? searchParams.get("minOvr") : undefined,
      maxOvr: searchParams.get("maxOvr") ? searchParams.get("maxOvr") : undefined,
    });

    const fetchData = () => {
      getPlayerDashboardData({
        handleSuccess: (v) => {
          setData(v.data)
        },
        params: {
          ...filters,
        }
      });
    };

    useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="PageDashPlayers" className="h-100 w-100">
      <div className="container container-xl h-100 w-100 px-2 px-md-4 py-4">
        <div className="d-flex flex-column h-100 w-100 fade-in">
          <div className="d-flex flex-column flex-md-row flex-md-grow-0 flex-basis-300">
            <div className="card d-flex flex-column flex-md-grow-0 flex-basis-300 m-2 p-3 pt-2">
              <div className="d-flex flex-column flex-md-grow-1">
                <div className="d-flex flex-row flex-grow-0 flex-basis-0 justify-content-end py-4 py-md-0">
                  {Object.keys(filters)
                    .filter((k) => Array.isArray(filters[k]) ? filters[k].length > 0 : filters[k])
                    .length > 0
                    && <button
                      className="btn btn-warning text-white align-self-end me-2"
                      onClick={() => setFilters({ positions: [] })}
                    >
                      <i className="bi bi-x-square-fill"/>
                    </button>
                  }

                  <FilterContainerPlayer
                    trigger={
                      <button className="btn btn-info text-white align-self-end">
                        <i className="bi bi-filter-square-fill"/>&nbsp;Filter players
                      </button>
                    }
                    filters={filters}
                    onChange={(f) => { console.log(f); setFilters(f)}}
                    showPositions={true}
                    showOverallScore={true}
                    showAge={true}
                  />
                </div>

                <div className="d-flex flex-column flex-grow-1 flex-basis-0 align-items-center justify-content-center py-4 py-md-0">
                  <Count
                    label="Players"
                    count={data ? data.getPlayerCount : null}
                  />
                </div>
              </div>
            </div>

            <div className="card d-flex flex-column flex-md-grow-1 m-2 p-3 pt-2 max-height-md-300">
              <div className="d-flex flex-column flex-lg-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1">
                    Players per criteria
                  </h4>
                </div>

                <div className="d-flex flex-fill overflow-auto justify-content-end align-items-end">
                  <ControllerPlayerCriteria
                    selectedCriteria={selectedCriteria}
                    onChange={(c) => setSelectedCriteria(c)}
                  />
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden py-5 py-md-0">
                <ChartBarKeyCount
                 data={data && data[selectedCriteria]}
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row flex-md-grow-1">
            <div className="card d-flex flex-md-grow-1 flex-md-shrink-1 flex-md-basis-0 m-2 p-3 pt-2">
              <div className="d-flex flex-fill overflow-hidden py-5 py-md-0">
                <BoxSoonToCome />
              </div>
            </div>

            <div className="card d-flex flex-md-grow-1 flex-md-shrink-1 m-2 p-3 pt-2">
              <div className="d-flex flex-fill overflow-hidden py-5 py-md-0">
                <BoxSoonToCome />
              </div>
            </div>
          </div>
        </div>
      </div> <
    /div>
  );
};

export default PageDashPlayers;