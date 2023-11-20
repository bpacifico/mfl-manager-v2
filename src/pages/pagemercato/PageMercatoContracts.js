import React, { useState, useEffect } from 'react';
import { NotificationManager as nm } from "react-notifications";
import FilterContainerPlayer from "components/filters/FilterContainerPlayer.js";
import Count from "components/counts/Count.js";
import CountContracts from "components/counts/CountContracts.js";
import CountContractRevenueShare from "components/counts/CountContractRevenueShare.js";
import ChartScatterPlayerContracts from "components/charts/ChartScatterPlayerContracts.js";
import ChartLinePlayerContractLinearRegression from "components/charts/ChartLinePlayerContractLinearRegression.js";
import TablePlayerContractLinearRegression from "components/tables/TablePlayerContractLinearRegression.js";
import { getUnderContractPlayers } from "services/api-mfl.js";

interface PageMercatoContractsProps {}

const PageMercatoContracts: React.FC<PageMercatoContractsProps> = ({ initialValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState(null);
  const [playerCount, setPlayerCount] = useState(null);
  const [filters, setFilters] = useState({
    positions: ["GK"],
    overallMin: 72,
    overallMax: 90,
  });

  const resetData = () => {
    setPlayers(null);
    setPlayerCount(null);
  }

  const getData = (pursue, beforePlayerId) => {
    console.log(pursue, isLoading, beforePlayerId);
    if (!pursue && isLoading) {
      return;
    }

    getUnderContractPlayers(
      (v) => {
        const p = players
          ? players.concat(v.items)
          : v.items;
        
        setPlayers(p);

        if (!playerCount) {
          setPlayerCount(v.count);
        }
      },
      (e) => console.log(e),
      {
        ...filters,
        beforePlayerId,
      },
    );
  }

  const getLoadingProgress = () => {
    if (!players || !playerCount) {
      return 5;
    }

    return players.length / Math.min(playerCount, 2000) * 100;
  }

  useEffect(() => {
    if (!players && !playerCount) {
      setIsLoading(true);
      getData();
    }

    if (players && playerCount) {
      if (players.length < playerCount) {
        if (players.length >= 2000) {
          nm.warning("Stopped loading at " + players.length + " players out of " + playerCount);
          setIsLoading(false);
        } else {
          getData(true, players.slice(-1)[0].id);
        }
      } else {
        setIsLoading(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, playerCount]);

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <div className="float-end">
          <FilterContainerPlayer
            filters={filters}
            onChange={(f) => setFilters(f)}
            onClose={() => resetData()}
            showPositions={true}
            showOverallScore={true}
          />
        </div>
      </div>

      {isLoading
        && <div className="col-12">
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped bg-info progress-bar-animated"
              role="progressbar"
              style={{ width: getLoadingProgress() + "%" }}
              aria-valuenow={getLoadingProgress()}
              aria-valuemin="0"
              aria-valuemax="100"
              >
              {players && playerCount
                ? players.length + " / " + Math.min(playerCount, 2000)
                : "? / ?"
              }
            </div>
          </div>
        </div>
      }
      

      <div className="col-12">
        <div className="row mt-md-2 mb-md-5">
          <div className="offset-lg-2 col-lg-2 col-sm-4">
            <Count
              label={"Total contract"}
              count={playerCount}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <CountContracts
              players={players}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <CountContractRevenueShare
              players={players}
            />
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 mb-md-5">
        <h4>Contract rate vs. overall score</h4>

        <ChartScatterPlayerContracts
          players={players}
        />
      </div>

      <div className="col-12 col-md-6 mb-md-5">
        <h4>Linear regression</h4>

        <ChartLinePlayerContractLinearRegression
          players={players}
        />
      </div>

      <div className="col-12 mb-md-5">
        <h4>Average rate: Division vs. overall score</h4>

        <TablePlayerContractLinearRegression
          players={players}
        />
      </div>
    </div>
  );
};

export default PageMercatoContracts;