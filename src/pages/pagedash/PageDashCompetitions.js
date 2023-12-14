import React, { useState, useEffect } from "react";
import CountCompetitions from "components/counts/CountCompetitions.js";
import CountParticipations from "components/counts/CountParticipations.js";
import ChartBarCompetitionParticipations from "components/charts/ChartBarCompetitionParticipations.js";
import ChartBarCompetitions from "components/charts/ChartBarCompetitions.js";
import ChartGanttCompetitions from "components/charts/ChartGanttCompetitions.js";
import { getPastCompetitions, getUpcomingCompetitions } from "services/api-mfl.js";

interface PageDashCompetitionsProps {}

const PageDashCompetitions: React.FC<PageDashCompetitionsProps> = ({ initialValue }) => {
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
    <div id="PageDashCompetitions" className="position-relative">
      <div className="container px-4 py-5">
        <div className="row mb-5">
          <div className="col">
            <div className="row mt-md-2 mb-5">
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

            <div className="row mb-4">
              <div className="col-sm-6">
                <h4 className="pb-3">Number of competitions per month</h4>

                <ChartBarCompetitions
                  competitions={pastCompetitions && upcomingCompetitions
                    ? pastCompetitions?.concat(upcomingCompetitions)
                    : null
                  }
                />
              </div>

              <div className="col-sm-6">
                <h4 className="pb-3">Number of participants per month</h4>

                <ChartBarCompetitionParticipations
                  competitions={pastCompetitions && upcomingCompetitions
                    ? pastCompetitions?.concat(upcomingCompetitions)
                    : null
                  }
                />
              </div>
            </div>

            <div className="row mb-4">
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
      </div>
    </div>
  );
};

export default PageDashCompetitions;