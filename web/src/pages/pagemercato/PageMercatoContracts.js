import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NotificationManager as nm } from "react-notifications";
import FilterContainerPlayer from "components/filters/FilterContainerPlayer.js";
import LoadingBar from "components/loading/LoadingBar.js";
import Count from "components/counts/Count.js";
import CountContracts from "components/counts/CountContracts.js";
import CountContractRevenueShare from "components/counts/CountContractRevenueShare.js";
import ChartScatterPlayerContracts from "components/charts/ChartScatterPlayerContracts.js";
import TablePlayerContractLinearRegression from "components/tables/TablePlayerContractLinearRegression.js";
import BoxWarning from "components/box/BoxWarning.js";
import { getUnderContractPlayers } from "services/api-mfl.js";

interface PageMercatoSalesProps {}

const PageMercatoSales: React.FC<PageMercatoSalesProps> = ({ initialValue }) => {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState(null);
  const [playerCount, setPlayerCount] = useState(null);
  const [filters, setFilters] = useState({
    positions: searchParams.get("positions") ? searchParams.get("positions").split(",") : [],
    overallMin: searchParams.get("overallMin") ? searchParams.get("overallMin") : 85,
    overallMax: searchParams.get("overallMax") ? searchParams.get("overallMax") : 98,
  });

  const resetData = () => {
    setPlayers(null);
    setPlayerCount(null);
  }

  const getData = (pursue, beforePlayerId) => {
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

  useEffect(() => {
    if (!players && !playerCount) {
      setIsLoading(true);
      getData();
    }

    if (players && playerCount) {
      if (players.length < playerCount) {
        if (players.length >= 2000) {
          nm.warning("Only " + players.length + " contracts out of " + playerCount + " has been loaded");
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
    <div id="PageMercatoSales" className="position-relative">
      <LoadingBar
        display={isLoading}
        value={players?.length}
        total={Math.min(playerCount, 2000)}
      />

      <div className="container px-4 py-5">
        <div className="row">
          <div className="col-6">
            {!isLoading && players && playerCount && players.length !== playerCount
              && <BoxWarning
                className={"h2 my-3"}
                content={<>
                  Only {players.length} contracts out of {playerCount} has been loaded
                </>}
              />
            }
          </div>

          <div className="col-6 mb-3">
            <div className="float-end">
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

          <div className="col-12">
            <div className="row mt-md-2 mb-5">
              <div className="offset-lg-2 col-lg-2 col-sm-4">
                <Count
                  label={"Contracts"}
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

          <div className="col-12 mb-md-4">
            <h4>Running contracts per division</h4>

            <ChartScatterPlayerContracts
              players={players}
            />
          </div>

          <div className="col-12 mb-md-4">
            <h4>Estimation of revenue share</h4>

            <TablePlayerContractLinearRegression
              players={players}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageMercatoSales;