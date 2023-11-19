import React, { useEffect, useState } from 'react';
import Count from "components/counts/Count.js";
import ChartPyramidPlayerScarcities from "components/charts/ChartPyramidPlayerScarcities.js";
import { getPlayerCount } from "services/api-mfl.js";
import { scarcity } from "utils/player.js";

interface PageStatsPlayersProps {}

const PageStatsPlayers: React.FC<PageStatsPlayersProps> = () => {

  const [playerCount, setPlayerCount] = useState(null);
  const [scarcityCount, setScarcityCount] = useState(null);

  useEffect(() => {
    getPlayerCount(
      (v) => setPlayerCount(v.count),
      (e) => console.log(e),
      {}
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
    <div className="row">
      <div className="col">
        <div className="row mt-md-2 mb-md-5">
          <div className="offset-0 offset-sm-2 col-lg-3 col-sm-4">
            <Count
              label="Players"
              count={playerCount}
            />
          </div>
          <div className="offset-0 offset-lg-2 col-lg-2 col-sm-4">
            <Count
              label="Scarcities"
              count={scarcity.length}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h4 className="pb-3">Scarcity distribution</h4>

            <ChartPyramidPlayerScarcities
              scarcityCount={scarcityCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageStatsPlayers;