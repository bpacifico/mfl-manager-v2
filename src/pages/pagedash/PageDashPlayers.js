import React, { useEffect, useState } from 'react';
import Count from "components/counts/Count.js";
import FilterContainerPlayer from "components/filters/FilterContainerPlayer.js";
import ChartDoughnutPlayerScarcities from "components/charts/ChartDoughnutPlayerScarcities.js";
import ChartDoughnutPlayerAvailability from "components/charts/ChartDoughnutPlayerAvailability.js";
import { getPlayerCount } from "services/api-mfl.js";
import { scarcity } from "utils/player.js";

interface PageDashPlayersProps {}

const PageDashPlayers: React.FC<PageDashPlayersProps> = () => {
  const [filters, setFilters] = useState({});
  const [playerCount, setPlayerCount] = useState(null);
  const [freeAgentCount, setFreeAgentCount] = useState(null);
  const [scarcityCount, setScarcityCount] = useState(null);

  const resetData = () => {
    setPlayerCount(null);
    setFreeAgentCount(null);
    setScarcityCount(null);
  }

  useEffect(() => {
    getPlayerCount(
      (v) => setPlayerCount(v.count),
      (e) => console.log(e),
      {
        ...filters,
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCount]);

  useEffect(() => {
    getPlayerCount(
      (v) => setFreeAgentCount(v.count),
      (e) => console.log(e),
      {
        ...filters,
        isFreeAgent: true,
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freeAgentCount]);

  useEffect(() => {
    const promises = scarcity.map((s) =>
      new Promise((resolve, reject) =>
        getPlayerCount(
          (v) => resolve(v.count),
          (e) => console.log(e),
          { 
            ...filters,
            overallMin: s.overallMin,
            overallMax: s.overallMax,
          }
        ),
      )
    );

    Promise.all(promises).then((values) => {
      setScarcityCount(
        Object.fromEntries(
          scarcity.map((s, i) =>
            [s.name, values[i]]
          ),
        ),
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scarcityCount]);

  return (
    <div id="PageDashClubs" className="position-relative">
      <FilterContainerPlayer
        filters={filters}
        onChange={(f) => setFilters(f)}
        onClose={() => resetData()}
        showPositions={true}
        showOverallScore={true}
      />

      <div className="container px-4 py-5">
        <div className="row mb-5">
          <div className="col">
            <div className="row mt-md-2 mb-5">
              <div className="offset-lg-2 col-lg-2 col-sm-4">
                <Count
                  label="Players"
                  count={playerCount}
                />
              </div>
              <div className="offset-lg-1 col-lg-2 col-sm-4">
                <Count
                  label="Scarcities"
                  count={scarcity.length}
                />
              </div>
              <div className="offset-lg-1 col-lg-2 col-sm-4">
                <Count
                  label="Legendaries"
                  count={scarcityCount?.Legendary}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <h4 className="pb-3">Number of players per scarcity</h4>

                <ChartDoughnutPlayerScarcities
                  scarcityCount={scarcityCount}
                />
              </div>

              <div className="col-md-6">
                <h4 className="pb-3">Number of players under contract</h4>

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