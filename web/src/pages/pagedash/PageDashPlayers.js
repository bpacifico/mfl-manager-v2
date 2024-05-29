import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Count from "components/counts/Count.js";
import BoxSoonToCome from "components/box/BoxSoonToCome.js";
import FilterContainerPlayer from "components/filters/FilterContainerPlayer.js";
import ChartDoughnutPlayerScarcities from "components/charts/ChartDoughnutPlayerScarcities.js";
import ChartDoughnutPlayerAvailability from "components/charts/ChartDoughnutPlayerAvailability.js";
import { getPlayerCount } from "services/api-mfl.js";
import { scarcity } from "utils/player.js";

interface PageDashPlayersProps {}

const PageDashPlayers: React.FC < PageDashPlayersProps > = () => {
  const [searchParams] = useSearchParams();

  const [playerCount, setPlayerCount] = useState(null);
  const [freeAgentCount, setFreeAgentCount] = useState(null);
  const [scarcityCount, setScarcityCount] = useState(null);
  const [filters, setFilters] = useState({
    positions: searchParams.get("positions") ? searchParams.get("positions").split(",") : [],
    overallMin: searchParams.get("overallMin") ? searchParams.get("overallMin") : undefined,
    overallMax: searchParams.get("overallMax") ? searchParams.get("overallMax") : undefined,
  });

  const resetData = () => {
    setPlayerCount(null);
    setFreeAgentCount(null);
    setScarcityCount(null);
  }

  useEffect(() => {
    if (playerCount === null) {
      getPlayerCount(
        (v) => setPlayerCount(v.count),
        (e) => console.log(e), {
          ...filters,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCount]);

  useEffect(() => {
    if (freeAgentCount === null) {
      getPlayerCount(
        (v) => setFreeAgentCount(v.count),
        (e) => console.log(e), {
          ...filters,
          isFreeAgent: true,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freeAgentCount]);

  useEffect(() => {
    if (scarcityCount === null) {
      const promises = scarcity.map((s) =>
        new Promise((resolve, reject) =>
          getPlayerCount(
            (v) => resolve(v.count),
            (e) => console.log(e), {
              ...filters,
              overallMin: filters.overallMin ? Math.max(filters.overallMin, s.overallMin) : s.overallMin,
              overallMax: filters.overallMax ? Math.min(filters.overallMax, s.overallMax) : s.overallMax,
            }
          ),
        )
      );

      Promise.all(promises).then((values) => {
        setScarcityCount(
          Object.fromEntries(
            scarcity.map((s, i) => [s.name, values[i]]),
          ),
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scarcityCount]);

  return (
    <div id="PageDashPlayers" className="h-100 w-100">
      <div className="container container-xl h-100 w-100 px-2 px-md-4 py-4">
        <div className="d-flex flex-column h-100 w-100 fade-in">
          <div className="d-flex flex-column flex-md-row flex-md-grow-0 flex-basis-300">
            <div className="card d-flex flex-column flex-md-grow-0 flex-basis-300 m-2 p-3 pt-2">
              <div className="d-flex flex-row flex-md-grow-1">
                <div className="d-flex flex-column flex-grow-1 flex-basis-0 align-items-center justify-content-center py-4 py-md-0">
                  <Count
                    label="Players"
                    count={playerCount}
                  />
                </div>
                <div className="d-flex flex-column flex-grow-1 flex-basis-0 align-items-center justify-content-center py-4 py-md-0">
                  <Count
                    label="Scarcities"
                    count={scarcity.length}
                  />
                </div>
              </div>
              <div className="d-flex flex-row flex-md-grow-1">
                <div className="d-flex flex-column flex-grow-1 flex-basis-0 align-items-center justify-content-center py-4 py-md-0">
                  <Count
                    label="Legendaries"
                    count={scarcityCount?.Legendary}
                  />
                </div>

                <div className="d-flex flex-column flex-grow-1 flex-basis-0 align-items-center justify-content-center py-4 py-md-0">
                  <FilterContainerPlayer
                    filters={filters}
                    onChange={(f) => setFilters(f)}
                    onClose={() => resetData()}
                    showPositions={true}
                    showOverallScore={true}
                    showAge={true}
                  />
                </div>
              </div>
            </div>

            <div className="card d-flex flex-column flex-md-grow-1 m-2 p-3 pt-2 max-height-md-300">
              <BoxSoonToCome />
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row flex-md-grow-1">
            <div className="card d-flex flex-md-grow-1 flex-md-shrink-1 flex-md-basis-0 m-2 p-3 pt-2">
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1">
                    Players per scarcity
                  </h4>
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden py-5 py-md-0">
                <ChartDoughnutPlayerScarcities
                  scarcityCount={scarcityCount}
                />
              </div>
            </div>

            <div className="card d-flex flex-md-grow-1 flex-md-shrink-1 flex-basis-400 m-2 p-3 pt-2">
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1">
                    Players under contract
                  </h4>
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden py-5 py-md-0">
                <ChartDoughnutPlayerAvailability
                  freeAgentCount={freeAgentCount}
                  total={playerCount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashPlayers;