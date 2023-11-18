import React from 'react';
import Count from "components/counts/Count.js";
import ChartPyramidClubDivisions from "components/charts/ChartPyramidClubDivisions.js";

interface PageStatsClubsProps {}

const PageStatsClubs: React.FC<PageStatsClubsProps> = ({ initialValue }) => {
  return (
    <div className="row">
      <div className="col">
        <div className="row mt-md-2 mb-md-5">
          <div className="col-12">
            <div class="alert alert-info" role="alert">
              The displayed data is for demonstration purposes only
            </div>
          </div>
          <div className="offset-lg-2 col-lg-2 col-sm-4">
            <Count
              label="Clubs"
              count={"XX"}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <Count
              label="Club owners"
              count={"XX"}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <Count
              label="Divisions"
              count={7}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <h4 className="pb-3">Division distribution</h4>

            <ChartPyramidClubDivisions
              clubs={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageStatsClubs;