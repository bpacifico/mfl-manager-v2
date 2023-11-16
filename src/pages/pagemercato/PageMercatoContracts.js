import React, { useState, useEffect } from 'react';
import FilterContainerPlayer from "components/filters/FilterContainerPlayer.js";
import CountContracts from "components/counts/CountContracts.js";
import CountContractRevenueShare from "components/counts/CountContractRevenueShare.js";
import ChartScatterPlayerContracts from "components/charts/ChartScatterPlayerContracts.js";
import ChartLinePlayerContractLinearRegression from "components/charts/ChartLinePlayerContractLinearRegression.js";
import TablePlayerContractLinearRegression from "components/tables/TablePlayerContractLinearRegression.js";
import { getUnderContractPlayers } from "services/api-mfl.js";

interface PageMercatoContractsProps {}

const PageMercatoContracts: React.FC<PageMercatoContractsProps> = ({ initialValue }) => {
  const [players, setPlayers] = useState(null);
  const [filters, setFilters] = useState({
    positions: ["GK", "CB"],
    overallMax: 78,
    overallMin: 72,
  });

  const getData = () => {
    setPlayers(null);
    getUnderContractPlayers(
      (v) => setPlayers(v),
      (e) => console.log(e),
      filters,
    );
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <div className="float-end">
          <FilterContainerPlayer
            filters={filters}
            onChange={(f) => setFilters(f)}
            onClose={() => getData()}
            showPositions={true}
            showOverallScore={true}
          />
        </div>
      </div>

      <div className="col-12">
        <div className="row mt-md-2 mb-md-5">
          <div className="offset-0 offset-sm-2 col-lg-3 col-sm-4">
            <CountContracts
              players={players}
            />
          </div>
          <div className="offset-0 offset-lg-2 col-lg-2 col-sm-4">
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