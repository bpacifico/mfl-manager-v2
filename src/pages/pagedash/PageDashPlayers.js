import React, { useEffect, useState } from 'react';
import Count from "components/counts/Count.js";
import ChartDoughnutPlayerScarcities from "components/charts/ChartDoughnutPlayerScarcities.js";
import ChartDoughnutPlayerAvailability from "components/charts/ChartDoughnutPlayerAvailability.js";
import { getPlayerCount } from "services/api-mfl.js";
import { scarcity } from "utils/player.js";

interface PageDashPlayersProps {}

const PageDashPlayers: React.FC<PageDashPlayersProps> = () => {
  const [playerCount, setPlayerCount] = useState(null);
  const [freeAgentCount, setFreeAgentCount] = useState(null);
  const [scarcityCount, setScarcityCount] = useState(null);

  useEffect(() => {
    getPlayerCount(
      (v) => setPlayerCount(v.count),
      (e) => console.log(e),
      {}
    );

    getPlayerCount(
      (v) => setFreeAgentCount(v.count),
      (e) => console.log(e),
      { isFreeAgent: true }
    );

    const promises = scarcity.map((s) =>
      new Promise((resolve, reject) =>
        getPlayerCount(
          (v) => resolve(v.count),
          (e) => console.log(e),
          { 
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
  }, []);

  return (
    <div className="row mb-5">
      <div className="col">
        <div className="row mt-md-2 mb-md-5">
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
          <div className="col-6">
            <h4 className="pb-3">Scarcity distribution</h4>

            <ChartDoughnutPlayerScarcities
              scarcityCount={scarcityCount}
            />
          </div>

          <div className="col-6">
            <h4 className="pb-3">Availability distribution</h4>

            <ChartDoughnutPlayerAvailability
              freeAgentCount={freeAgentCount}
              total={playerCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashPlayers;