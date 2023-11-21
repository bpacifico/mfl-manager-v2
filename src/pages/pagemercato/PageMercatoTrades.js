import React, { useState, useEffect } from 'react';
import { NotificationManager as nm } from "react-notifications";
import FilterContainerPlayer from "components/filters/FilterContainerPlayer.js";
import LoadingBar from "components/loading/LoadingBar.js";
import CountTrades from "components/counts/CountTrades.js";
import CountTradeValue from "components/counts/CountTradeValue.js";
import ChartLinePlayerTrades from "components/charts/ChartLinePlayerTrades.js";
import ChartScatterPlayerTrades from "components/charts/ChartScatterPlayerTrades.js";
import { getPlayerTrades } from "services/api-mfl.js";

interface PageMercatoTradesProps {}

const PageMercatoTrades: React.FC<PageMercatoTradesProps> = ({ initialValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [trades, setTrades] = useState(null);
  const [filters, setFilters] = useState({
    positions: [],
  });

  const resetData = () => {
    setTrades(null);
  }

  const getData = (pursue, beforeListingId) => {
    if (!pursue && isLoading) {
      return;
    }

    getPlayerTrades(
      (v) => {
        if (v.length > 0) {
          const p = trades
            ? trades.concat(v)
            : v;
          
          setTrades(p);
        } else {
          setIsLoading(false);
        }
      },
      (e) => console.log(e),
      {
        ...filters,
        beforeListingId,
      },
    );
  }

  useEffect(() => {
    if (!trades) {
      setIsLoading(true);
      getData();
    }

    if (trades) {
      if (trades.length >= 100) {
        nm.warning("Stopped loading at " + trades.length + " players out of 100");
        setIsLoading(false);
      } else {
        getData(true, trades.slice(-1)[0].listingResourceId);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trades]);

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

      <div className="col-12">
        <LoadingBar
          display={isLoading}
          value={trades?.length}
        />
      </div>

      <div className="col-12">
        <div className="row mt-md-2 mb-md-5">
          <div className="offset-0 offset-sm-2 col-lg-3 col-sm-4">
            <CountTrades
              trades={trades}
            />
          </div>
          <div className="offset-0 offset-lg-2 col-lg-2 col-sm-4">
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