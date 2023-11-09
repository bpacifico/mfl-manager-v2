import React, { useState, useEffect } from 'react';
import FilterContainerPlayer from "components/filters/FilterContainerPlayer.js";
import CountContracts from "components/counts/CountContracts.js";
import ChartScatterPlayerContracts from "components/charts/ChartScatterPlayerContracts.js";
import { getUnderContractPlayers } from "services/api-mfl.js";

interface PageMercatoContractsProps {}

const PageMercatoContracts: React.FC<PageMercatoContractsProps> = ({ initialValue }) => {
  const [players, setPlayers] = useState([]);
  const [filters, setFilters] = useState({
    positions: ["GK", "CB"],
    overallMin: 80,
    overallMax: 100,
  });

  useEffect(() => {
    getUnderContractPlayers(
      (v) => setPlayers(v),
      (e) => console.log(e),
      filters,
    );
  }, [filters]);

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-content-end">
          <FilterContainerPlayer
            filters={filters}
            onChange={setFilters}
            showPositions={true}
            showScarcity={true}
          />
        </div>
      </div>

      <div className="col-12">
        <div className="row mt-md-2 mb-md-5">
          <div className="offset-lg-2 col-lg-3 col-sm-4">
            <CountContracts
              players={players}
            />
          </div>
          <div className="offset-lg-2 col-lg-2 col-sm-4">
            <CountContracts
              players={players}
            />
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-6">
        <h4>Contract rate vs. overall score</h4>

        <ChartScatterPlayerContracts
          players={players}
        />
      </div>
    </div>
  );
};

export default PageMercatoContracts;