import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NotificationManager as nm } from "react-notifications";
import FilterContainerPlayer from "components/filters/FilterContainerPlayer.js";
import LoadingBar from "components/loading/LoadingBar.js";
import CountSales from "components/counts/CountSales.js";
import CountSaleValue from "components/counts/CountSaleValue.js";
import ChartBarPlayerSales from "components/charts/ChartBarPlayerSales.js";
import ChartBarPlayerSaleValue from "components/charts/ChartBarPlayerSaleValue.js";
import ChartScatterPlayerSales from "components/charts/ChartScatterPlayerSales.js";
import BoxWarning from "components/box/BoxWarning.js";
import { getPlayerSales } from "services/api-mfl.js";

interface PageMercatoSalesProps {}

const PageMercatoSales: React.FC<PageMercatoSalesProps> = ({ initialValue }) => {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(true);
  const [sales, setSales] = useState(null);
  const [filters, setFilters] = useState({
    positions: searchParams.get("positions") ? searchParams.get("positions").split(",") : [],
    overallMin: searchParams.get("overallMin") ? searchParams.get("overallMin") : undefined,
    overallMax: searchParams.get("overallMax") ? searchParams.get("overallMax") : undefined,
  });

  const resetData = () => {
    setSales(null);
  }

  const getData = (pursue, beforeListingId) => {
    if (!pursue && isLoading) {
      return;
    }

    getPlayerSales(
      (v) => {
        if (v.length > 0) {
          const p = sales
            ? sales.concat(v)
            : v;
          
          setSales(p);
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
    if (!sales) {
      setIsLoading(true);
      setIsComplete(true);
      getData();
    }

    if (sales) {
      if (sales.length >= 100) {
        nm.warning("Only the " + sales.length + " latest sales out of an undefined amount has been loaded");
        setIsLoading(false);
        setIsComplete(false);
      } else {
        getData(true, sales.slice(-1)[0].listingResourceId);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sales]);

  return (
    <div id="PageMercatoSales" className="position-relative">
      <LoadingBar
        display={isLoading}
        value={sales?.length}
      />

      <div className="container px-4 py-5">
        <div className="row">
          <div className="col-6">
            {!isComplete
              && <BoxWarning
                className={"h2 my-3"}
                content={<>
                  Only the 100 latest sales out of an undefined amount has been loaded
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
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <div className="row mt-md-2">
              <div className="position-relative offset-0 offset-sm-2 col-lg-3 col-sm-4">
                <CountSales
                  sales={sales}
                />
              </div>
              <div className="offset-0 offset-lg-2 col-lg-2 col-sm-4">
                <CountSaleValue
                  sales={sales}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12 col-lg-6">
            <h4>Number of sales per day</h4>

            <ChartBarPlayerSales
              sales={sales}
            />
          </div>

          <div className="col-12 col-lg-6">
            <h4>Value of sales per day</h4>

            <ChartBarPlayerSaleValue
              sales={sales}
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <h4>Sale prices per overall score</h4>

            <ChartScatterPlayerSales
              sales={sales}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageMercatoSales;