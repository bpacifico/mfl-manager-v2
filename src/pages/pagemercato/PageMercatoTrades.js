import React, { useState, useEffect } from 'react';
import CountTrades from "components/counts/CountTrades.js";
import CountTradeValue from "components/counts/CountTradeValue.js";
import ChartLinePlayerTrades from "components/charts/ChartLinePlayerTrades.js";
import ChartScatterPlayerTrades from "components/charts/ChartScatterPlayerTrades.js";
import { getPlayerTrades } from "services/api-mfl.js";

interface PageMercatoTradesProps {}

const PageMercatoTrades: React.FC<PageMercatoTradesProps> = ({ initialValue }) => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    getPlayerTrades(
      (v) => setTrades(v),
      (e) => console.log(e),
    );
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="row mt-md-2 mb-md-5">
          <div className="offset-lg-2 col-lg-3 col-sm-4">
            <CountTrades
              trades={trades}
            />
          </div>
          <div className="offset-lg-2 col-lg-2 col-sm-4">
            <CountTradeValue
              trades={trades}
            />
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-6">
        <h4>Player trade vs. Time</h4>

        <ChartLinePlayerTrades
          trades={trades}
        />
      </div>

      <div className="col-12 col-xl-6">
        <h4>Player trade vs. Price</h4>

        <ChartScatterPlayerTrades
          trades={trades}
        />
      </div>
    </div>
  );
};

export default PageMercatoTrades;