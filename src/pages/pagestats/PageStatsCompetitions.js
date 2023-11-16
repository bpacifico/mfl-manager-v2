import React, { useState, useEffect } from "react";
import CountCompetitions from "components/counts/CountCompetitions.js";
import CountParticipations from "components/counts/CountParticipations.js";
import ChartLineCompetitionParticipations from "components/charts/ChartLineCompetitionParticipations.js";
import ChartLineCompetitions from "components/charts/ChartLineCompetitions.js";
import ChartGanttCompetitions from "components/charts/ChartGanttCompetitions.js";
import { getPastCompetitions, getUpcomingCompetitions } from "services/api-mfl.js";

interface PageStatsCompetitionsProps {}

const PageStatsCompetitions: React.FC<PageStatsCompetitionsProps> = ({ initialValue }) => {
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
    <div className="row">
      <div className="col">
        <div className="row mt-md-2 mb-md-5">
          <div className="offset-lg-2 col-lg-2 col-sm-4">
            <CountCompetitions
              competitions={pastCompetitions && upcomingCompetitions
                ? pastCompetitions?.concat(upcomingCompetitions)
                : null
              }
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <CountCompetitions
              label={"Upcoming"}
              competitions={upcomingCompetitions}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <CountParticipations
              competitions={pastCompetitions}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <h4 className="pb-3">Competitions vs. Time</h4>

            <ChartLineCompetitions
              competitions={pastCompetitions && upcomingCompetitions
                ? pastCompetitions?.concat(upcomingCompetitions)
                : null
              }
            />
          </div>

          <div className="col-sm-6">
            <h4 className="pb-3">Participants vs. Time</h4>

            <ChartLineCompetitionParticipations
              competitions={pastCompetitions && upcomingCompetitions
                ? pastCompetitions?.concat(upcomingCompetitions)
                : null
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <h4 className="pb-3">Calendar</h4>

            <ChartGanttCompetitions
              competitions={pastCompetitions && upcomingCompetitions
                ? pastCompetitions?.concat(upcomingCompetitions)
                : null
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageStatsCompetitions;