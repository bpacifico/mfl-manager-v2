import React from 'react';
import Count from "components/counts/Count.js";
import ChartPyramidPlayerScarcities from "components/charts/ChartPyramidPlayerScarcities.js";

interface PageStatsPlayersProps {}

const PageStatsPlayers: React.FC<PageStatsPlayersProps> = ({ initialValue }) => {
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
              label="Players"
              count={"XX"}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <Count
              label="Player owners"
              count={"XX"}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <Count
              label="Scarcities"
              count={4}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <h4 className="pb-3">Scarcity distribution</h4>

            <ChartPyramidPlayerScarcities
              players={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageStatsPlayers;