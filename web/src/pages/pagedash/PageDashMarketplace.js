import React, { useState, useEffect } from 'react';
import Count from "components/counts/Count.js";
import { getMarketplaceData } from "services/api-assistant.js";
import ChartBarSaleVolume from "components/charts/ChartBarSaleVolume.js";
import BoxSoonToCome from "components/box/BoxSoonToCome.js";

interface PageDashMarketplaceProps {}

const PageDashMarketplace: React.FC < PageDashMarketplaceProps > = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [timeUnit, setTimeUnit] = useState("d");

  let playerSaleTotalProperties = {
    "h": "player_sale_total_per_hour",
    "d": "player_sale_total_per_day",
    "w": "player_sale_total_per_week",
    "m": "player_sale_total_per_month",
  }

  const getData = (pursue, beforeListingId) => {
    setIsLoading(true);
    setData(null);

    getMarketplaceData({
      handleSuccess: (v) => {
        setData(v.data)
        setIsLoading(false);
      },
      params: {
        playerSaleTotalProperty: playerSaleTotalProperties[timeUnit]
      }
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [timeUnit]);

  return (
    <div id="PageDashMarketplace" className="h-100 w-100">
      <div className="container container-xl h-100 w-100 px-2 px-md-4 py-4">
        <div className="d-flex flex-column h-100 w-100 fade-in">
          <div className="d-flex flex-column flex-md-row flex-md-grow-0 flex-basis-300">
            <div className="card d-flex flex-column flex-md-grow-0 flex-basis-300 m-2 p-3 pt-2">
              <div className="d-flex flex-row flex-md-grow-1">
                <div className="d-flex flex-column flex-grow-1 flex-basis-0 align-items-center justify-content-center py-4 py-md-0">
                  <Count
                    label="Total player volume"
                    count={data && data.getPlayerSaleTotal
                      ? data.getPlayerSaleTotal.reduce((acc, item) => acc + item.value, 0).toFixed(2)
                      : null
                    }
                  />
                </div>
              </div>
            </div>

            <div className="card d-flex flex-column flex-md-grow-1 m-2 p-3 pt-2 max-height-md-300">
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1"></h4>
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden py-5 py-md-0">
                <BoxSoonToCome />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row flex-md-grow-1">
            <div className="card d-flex flex-md-grow-1 flex-md-shrink-1 flex-md-basis-auto flex-basis-0 m-2 p-3 pt-2">
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1">Sale volume</h4>
                </div>

                <div className="d-flex flex-fill overflow-auto justify-content-end align-items-end">
                  <button
                    className={"btn btn-small" + (timeUnit === "h" ? " btn-info text-white" : " text-info")}
                    onClick={() => setTimeUnit("h")}
                  >
                    H
                  </button>
                  <button
                    className={"btn btn-small" + (timeUnit === "d" ? " btn-info text-white" : " text-info")}
                    onClick={() => setTimeUnit("d")}
                  >
                    D
                  </button>
                  <button
                    className={"btn btn-small" + (timeUnit === "m" ? " btn-info text-white" : " text-info")}
                    onClick={() => setTimeUnit("m")}
                  >
                    M
                  </button>
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden">
                <ChartBarSaleVolume
                  data={data?.getPlayerSaleTotal}
                />
              </div>
            </div>

            <div className="card d-flex flex-md-grow-1 flex-md-shrink-1 flex-basis-400 m-2 p-3 pt-2">
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1"></h4>
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden">
                <BoxSoonToCome />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashMarketplace;