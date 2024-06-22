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
import BoxSoonToCome from "components/box/BoxSoonToCome.js";
import Count from "components/counts/Count.js";
import { positions } from "utils/player.js";


interface PageToolsContractEvaluationProps {}

const PageToolsContractEvaluation: React.FC < PageToolsContractEvaluationProps > = ({ initialValue }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [overall, setOverall] = useState(null);
  const [position, setPosition] = useState(null);
  const [age, setAge] = useState(null);

  const [data, setData] = useState(null);
  const [timeUnit, setTimeUnit] = useState("d");

  const getData = (pursue, beforeListingId) => {
    setIsLoading(true);
    setData(null);

    /*getMarketplaceData({
      handleSuccess: (v) => {
        setData(v.data)
        setIsLoading(false);
      },
      params: {
        playerSaleTotalProperty: playerSaleTotalProperties[timeUnit]
      }
    });*/
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [timeUnit]);

  return (
    <div id="PageToolsContractEvaluation" className="h-100 w-100">
      <div className="container-xxl h-100 px-2 px-md-4 py-4">
        <div className="d-flex flex-column flex-md-row h-100 w-100 fade-in">
          <div className="d-flex flex-column flex-md-grow-0 flex-basis-300">
            <div className="card d-flex flex-column flex-md-grow-0 m-2 p-3 pt-2">
              <div className="d-flex flex-row flex-md-grow-1">
                <h4 className="flex-grow-1">Contract information</h4>
              </div>

              <div className="d-flex flex-fill flex-column">
                <input
                  type="number"
                  min="30"
                  max="100"
                  step="1"
                  className="form-control w-100 mb-1"
                  value={overall}
                  onChange={(v) => {setOverall(v.target.value)}}
                  placeholder={"OVR*"}
                  autoFocus
                />
                <select
                  className="form-select w-100 mb-1"
                  value={position}
                  onChange={(v) => setPosition(v.target.value)}
                  placeholder={"Position*"}
                >
                  <option value={""} key={null}/>
                  {positions
                    .map((p) => (
                    <option value={p.name} key={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  className="form-control w-100 mb-1"
                  value={age}
                  onChange={(v) => {setAge(v.target.value)}}
                  placeholder={"Contract rate"}
                />
                <button
                  className="btn btn-info text-white align-self-end"
                  disabled={!overall || !position}
                >
                  Evaluate
                </button>
              </div>
            </div>

            <div className="card d-flex flex-column flex-fill m-2 p-3 pt-2">
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1">Advised rates</h4>
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden">
                <BoxSoonToCome />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-column flex-md-grow-1">
            <div className="card d-flex flex-column flex-md-grow-1 flex-md-shrink-1 flex-md-basis-auto flex-basis-0 m-2 p-3 pt-2">
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1">Similar players under contract</h4>
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden">
                bbbb
              </div>
            </div>

            <div className="card d-flex flex-column flex-md-grow-1 flex-md-shrink-1 flex - basis - 400 m-2 p-3 pt-2">
              <div className="d-flex flex-row">
                <div className="d-flex">
                  <h4 className="flex-grow-1">Contract details</h4>
                </div>
              </div>

              <div className="d-flex flex-fill overflow-hidden">
                cccc
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageToolsContractEvaluation;