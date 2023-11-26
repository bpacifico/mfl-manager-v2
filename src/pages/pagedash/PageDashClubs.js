import React, { useState, useEffect } from 'react';
import Count from "components/counts/Count.js";
import ChartPyramidClubDivisions from "components/charts/ChartPyramidClubDivisions.js";

interface PageDashClubsProps {}

const PageDashClubs: React.FC<PageDashClubsProps> = ({ initialValue }) => {
  const [clubs, setClubs] = useState(null);

  useEffect(() => {
    fetch('/data/mfl_clubs.json')
      .then(response => response.json())
      .then(data => setClubs(data));
  }, []);

  return (
    <div className="row mb-5">
      <div className="col">
        <div className="row mt-md-2 mb-md-5">
          <div className="col-12">
            <div className="alert alert-info" role="alert">
              The displayed data is for demonstration purposes only
            </div>
          </div>
          <div className="offset-lg-2 col-lg-2 col-sm-4">
            <Count
              label="Clubs"
              count={clubs?.length}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <Count
              label="Divisions"
              count={7}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <Count
              label="Owners"
              count={clubs
                ? [...new Set(clubs.map((c) => c.club_owner))].length
                : undefined
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <h4 className="pb-3">Division distribution</h4>

            <ChartPyramidClubDivisions
              clubs={clubs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashClubs;