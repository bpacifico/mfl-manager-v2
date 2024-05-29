import React, { useState, useEffect } from "react";
import CountCompetitions from "components/counts/CountCompetitions.js";
import CountParticipations from "components/counts/CountParticipations.js";
import BoxSoonToCome from "components/box/BoxSoonToCome.js";
import ChartBarCompetitionParticipations from "components/charts/ChartBarCompetitionParticipations.js";
import ChartBarCompetitions from "components/charts/ChartBarCompetitions.js";
import ChartGanttCompetitions from "components/charts/ChartGanttCompetitions.js";
import { getPastCompetitions, getUpcomingCompetitions } from "services/api-mfl.js";

interface PageDashCompetitionsProps {}

const PageDashCompetitions: React.FC < PageDashCompetitionsProps > = ({ initialValue }) => {
  const [pastCompetitions, setPastCompetitions] = useState(null);
  const [upcomingCompetitions, setUpcomingCompetitions] = useState(null);

  useEffect(() => {
    getPastCompetitions(
      (v) => setPastCompetitions(v),
      (e) => console.log(e),
    );
    getUpcomingCompetitions(
      (v) => setUpcomingCompetitions(v),
      (e) => console.log(e),
    );
  }, []);

  return (
    <div id="PageDashCompetitions" className="h-100 w-100">
      <div className="container container-xl h-100 w-100 px-2 px-md-4 py-4">
        <div className="d-flex flex-column h-100 w-100 fade-in">
          <div className="d-flex flex-column flex-md-row flex-md-grow-0 flex-basis-300">
            <div className="card d-flex flex-column flex-md-grow-0 flex-basis-300 m-2 p-3 pt-2">
              <div className="d-flex flex-row flex-md-grow-1">
                <div className="d-flex flex-column flex-grow-1 flex-basis-0 align-items-center justify-content-center py-4 py-md-0">
                  <CountCompetitions
                    competitions={pastCompetitions && upcomingCompetitions
                      ? pastCompetitions?.concat(upcomingCompetitions)
                      : null
                    }
                  />
                </div>
                <div className="d-flex flex-column flex-grow-1 flex-basis-0 align-items-center justify-content-center py-4 py-md-0">
                  <CountCompetitions
                    label={"Upcoming"}
                    competitions={upcomingCompetitions}
                  />
                </div>
              </div>
              <div className="d-flex flex-row flex-md-grow-1">
                <div className="d-flex flex-column flex-grow-1 flex-basis-0 align-items-center justify-content-center py-4 py-md-0">
                  <CountParticipations
                    competitions={pastCompetitions}
                  />
                </div>
              </div>
            </div>

            <div className="card d-flex flex-column flex-md-grow-1 m-2 p-3 pt-2 max-height-md-300">
              <BoxSoonToCome />
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row flex-md-grow-1">
            <div className="card d-flex flex-md-grow-1 flex-md-shrink-1 flex-md-basis-auto flex-basis-0 m-2 p-3 pt-2">
              <BoxSoonToCome />
            </div>

            <div className="card d-flex flex-md-grow-1 flex-md-shrink-1 flex-md-basis-auto m-2 p-3 pt-2">
              <BoxSoonToCome />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashCompetitions;